import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import ThankYou from '../ThankYou/ThankYou';
import P5Wrapper from 'react-p5-wrapper';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

// NOTE: requires sym-link from ../../shared/user.js
import User from './user.js';

// NOTE: temporary
import './Game.css';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
  content: {
    paddingTop: "100px",
  },
  sketchBg: '#FFF',
  sketchText: '#929392',
  sketchStroke: '#929392',
  sketchStrokeWeight: 6,
  sketchStrokeMinWeight: 2,
};

/*
 * OCEAN Game sketch (temporarily) in p5js/canvas
 *
 * Ratings go from -.8 to .8 for each brand
 * Hit the space-bar or let the timer run out
 *   to compute the personality score and test
 *   the text-generation functions (if nothing
 *   is moved, brand ratings are randomized)
 */
function sketch(p) {

  let done, user;
  let numLines = 9;
  let seconds = 25;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight * .7);
    p.textAlign(p.CENTER, p.CENTER);
    p.imageMode(p.CENTER);

    shuffle(Brand.names);
    Brand.radius = p.height / (numLines + 1);
    for (let i = 0; i < Brand.names.length; i++) {
      new Brand(p, -i * (p.width / 6) + p.width / 2, p.height / 2, Brand.names[i]);
    }

    user = User.Create({ name: "Jane", gender: "female" });
  };

  p.draw = function () {

    p.background(styles.sketchBg);
    p.stroke(styles.sketchStroke);

    for (let i = 0; i < numLines; i++) {
      p.strokeWeight(i % 2 === 0 ? styles.sketchStrokeWeight : 0);
      p.line(0, Brand.radius * (i + 1), p.width, Brand.radius * (i + 1));
    }

    if (!done) Brand.updateAll();
    Brand.drawAll();

    let timer = seconds - Math.floor(p.millis() / 1000);
    if (timer < 0 && !done) finished();

    p.textSize(40);
    p.fill(styles.sketchText);
    p.text(Math.max(0, timer), p.width - 60, Brand.radius / 2);
    p.textSize(18);
    p.text('drag items then hit spacebar to compute scores', p.width / 2, p.height - 20);
  };

  p.keyReleased = function () {
    if (p.key === ' ') finished();
  };

  p.mouseReleased = function () {
    if (Brand.active) {
      let lineIdx = Math.floor(p.map(p.mouseY, 1, p.height - 1, 0, numLines));
      lineIdx = p.constrain(lineIdx, 0, numLines - 1); // ints from 0 to 8
      Brand.active.rating = p.map(lineIdx, 0, numLines - 1, 8, -8) / 10;
      Brand.active.snapTo((lineIdx + 1) / (numLines + 1) * p.height);
      Brand.active = false;
    }
  }

  p.mousePressed = function () {
    Brand.active = false;
    Brand.instances.forEach(b => {
      if (b.contains(p.mouseX, p.mouseY)) {
        Brand.active = b;
      }
    });
  }

  p.mouseDragged = function () {
    if (Brand.active) {
      Brand.active.y += p.mouseY - p.pmouseY;
    }
  }

  function finished() {
    done = true;
    checkData();
    let data = Brand.instances.map(b => ({ item: b.item, rating: b.rating }));
    user.predictFromBrands(data).forEach(p => user.traits[p.trait] = p.score);
    displayAsHtml(user);
  }

  function displayAsHtml(user) {
    let otr = '<tr><td>';
    let ctd = '</td><td>';
    let ctr = '</td></tr>'

    let rows = user.traitNames().length;
    let desc = '</td><td rowspan=' + rows +
      ' id="desc">' + user.generateDescription();
    let html = user.traitNames().reduce((acc, t, i) => {
      return acc + otr + t + ctd + user.traits[t] + (i ? '' : desc) + ctr;
    }, '');

    document.getElementById("content").style.display = 'inline-block';
    document.getElementById("tdata").innerHTML = html;
  }

  function randomizeData() {
    Brand.instances.forEach(b => {
      let idx = Math.floor(p.random(0, numLines));
      b.rating = p.map(idx, 0, numLines - 1, -8, 8) / 10;
      b.y = (idx + 1) / (numLines + 1) * p.height;
    });
  }

  function checkData() {
    let nodata = true;
    Brand.instances.forEach(b => {
      if (b.rating !== 0) nodata = false;
    });
    if (nodata) randomizeData();
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
};

class Brand {
  constructor(p, x, y, item, imgName) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.sy = y;
    this.ty = y;
    this.t = 1;
    this.item = item;
    this.rating = 0;
    this.strokeWeight = styles.sketchStrokeMinWeight;
    this.logo = this.p.loadImage(imgName || 'apple.png');
    Brand.instances.push(this);
  }
  draw() {
    if (this.x > -Brand.radius) this.render();
  }
  update() {
    this.x += Brand.speed;
    if (this.sy !== this.ty) {
      let ft = this.bounceOut(this.t);
      this.y = this.p.map(ft, 0, 1, this.sy, this.ty);
      this.t += 0.1;
      if (this.t > 1) {
        this.sy = this.ty;
      }
    }
  }
  snapTo(my) { // easing
    this.sy = this.y;
    this.ty = my;
    this.t = 0;
  }
  render() {
    this.p.fill(styles.sketchBg);
    this.p.stroke(styles.sketchStroke);
    this.p.strokeWeight(this === Brand.active ? styles.sketchStrokeWeight : styles.sketchStrokeMinWeight);
    this.p.ellipse(this.x, this.y, Brand.radius);

    this.p.image(this.logo, this.x, this.y, Brand.radius * .7, Brand.radius * .7);

    this.p.noStroke();
    this.p.fill(styles.sketchText);
    this.p.textSize(18);
    this.p.text(this.item, this.x, this.y + Brand.radius - this.textHeight());
  }
  textHeight(str) {
    return this.p.textAscent() + this.p.textDescent();
  }
  contains(mx, my) {
    return this.p.dist(mx, my, this.x, this.y) <= Brand.radius;
  }
  bounceOut(_x) { // from penner
    if (_x < 4 / 11.0) {
      return ((121 * _x * _x) / 16.0);
    } else if (_x < 8 / 11.0) {
      return ((363 / 40.0 * _x * _x) - (99 / 10.0 * _x) + 17 / 5.0);
    } else if (_x < 9 / 10.0) {
      return ((4356 / 361.0 * _x * _x) - (35442 / 1805.0 * _x) + 16061 / 1805.0);
    } else {
      return ((54 / 5.0 * _x * _x) - (513 / 25.0 * _x) + 268 / 25.0);
    }
  }
}

Brand.speed = 1;
Brand.radius = 100;
Brand.instances = [];
Brand.active = false;
Brand.names = ['cocacola', 'disney', 'converse', 'playstation', 'xbox', 'red bull', 'hello kitty', 'pepsi', 'h&m', 'ben & jerrys', 'old spice', 'burberry', 'adidas', 'marvel', 'nike', 'zara', 'vans', 'starbucks', 'topshop', 'lacoste', 'gap', 'sony', 'new look', 'calvin klein', 'rayban', 'next', 'swarovski', 'tommy hilfiger', 'asos', 'marks and spencer', 'vivienne westwood', 'chanel', 'nintendo64', 'lego'];
Brand.drawAll = function () { Brand.instances.forEach(b => b.draw()) };
Brand.updateAll = function () { Brand.instances.forEach(b => b.update()) };
///////////////////// End p5.js sketch ////////////////////////////

function Game(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <P5Wrapper sketch={sketch} />
                {/* temporary div for testing */}
                <div id="content">
                  <table>
                    <tbody>
                    <tr>
                      <th>Trait</th>
                      <th>Score</th>
                      <th>Description</th>
                    </tr>
                    </tbody>
                    <tbody id="tdata"></tbody>
                  </table>
                </div>
                <Link component={ThankYou} to="/thank-you">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div >
            <FooterLogo />
        </div >
  );
}

Game.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Game);
