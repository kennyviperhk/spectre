import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import OceanProfile from '../../Components/OceanProfile/OceanProfile';
import UserSession from '../../Components/UserSession/UserSession';
import NavigationHack from '../NavigationHack';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  content: {
    paddingTop: '500px',
  },
  image: {
    width: '160px',
    height: '130px',
    margin: '25px',
  },
  button: {
    borderRadius: '28px',
    margin: '30px',
    border: 'solid 3px #929391',
    backgroundColor: '#ffffff',
    boxShadow: 'none',
    color: '#929391',
    width: '330px',
    height: '54px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    padding: 0,
    textTransform: 'initial',
    fontSize: '24px',
    '&:hover': {
      backgroundColor: '#21c0fc',
      color: '#ffffff',
    },
  },
  ad: {
    position: 'relative',
    margin: '0 auto',
    width: '800px',
    height: '570px',
  },
  adImage: {
    width: '800px',
    height: '570px',
  },
  campaignImage: {
    position: 'absolute',
    bottom: '10px',
    right: '0',
    width: '150px',
  },
  adText: {
    position: 'absolute',
    top: '43%',
    fontSize: '45px',
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'red',
  },
};

class DarkAd extends NavigationHack {
  constructor(props) {
    super(props, '/target-ad');
    this.state = {
      image: '/imgs/darkad-default.png',
      defaultImageSelected: true,
      text: '',
    };
  }

  render() {
    const { classes } = this.props;
    const campaignImage = this.context.adIssue === 'remain' ? 'imgs/vote-remain.png' : 'imgs/vote-leave.svg'

    this.context.adIssue = this.context.adIssue || 'leave';
    if (typeof this.context.target === 'undefined') {
      this.context.setTarget({ "id": "111111111111111111111111", "name": "Remy", "traits": { "openness": 0.5818180970605207, "conscientiousness": 0.07645862267650672, "extraversion": 0.2607193320319028, "agreeableness": 0.012588228025398163, "neuroticism": 0.16712815071948772 } });
    }
    if (!this.context.hasOceanTraits()) { // TMP
      this.context._randomizeTraits();
    }
    const slogans = this.context.targetAdSlogans();
    slogans.forEach(s => s = s.replace('/<br>/',''));
    const images = this.context.targetAdImages();
    images.push("imgs/darkadred.png");

    return (
      <div className={classes.root + " darkAd"}>
        <SpectreHeader colour="white" progressActive progressNumber="one" />
        <div className={`${classes.content} content`}>
          <Typography component="h6" variant="h6"><strong>Create Your Campaign</strong></Typography>
          <div className={classes.ad}>    { /* adIssue should never change after being selected '*/}
            <img className={classes.adImage} src={this.state.image} alt="leave"></img>
            <p className={classes.adText}>{this.state.text}</p>
            {!this.state.defaultImageSelected ? <img className={classes.campaignImage} src={campaignImage} alt="leave"></img> : ''}
          </div>
          <div>
            <img className={classes.image} src={images[0]} alt="leave" onClick={() => { this.setState({ image: images[0], defaultImageSelected: false }); }}></img>
            <img className={classes.image} src={images[1]} alt="leave" onClick={() => { this.setState({ image: images[1], defaultImageSelected: false }); }}></img>
            <img className={classes.image} src={images[2]} alt="leave" onClick={() => { this.setState({ image: images[2], defaultImageSelected: false }); }}></img>
            <img className={classes.image} src={images[3]} alt="leave" onClick={() => { this.setState({ image: images[3], defaultImageSelected: false }); }}></img>
          </div>
          <div>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.state.defaultImageSelected && this.setState({ image: images[4] }); this.setState({ text: slogans[0], defaultImageSelected: false }) }}>
              {slogans[0].split(' ').slice(0, 2).join(' ') + '...'}
            </Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.state.defaultImageSelected && this.setState({ image: images[4] }); this.setState({ text: slogans[1], defaultImageSelected: false }) }}>
              {slogans[1].split(' ').slice(0, 2).join(' ') + '...'}
            </Button>
            <div>
              <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.state.defaultImageSelected && this.setState({ image: images[4] }); this.setState({ text: slogans[2], defaultImageSelected: false }) }}>
                {slogans[2].split(' ').slice(0, 2).join(' ') + '...'}
              </Button>
              <Button className={classes.button} variant="contained" color="primary" onClick={() => { this.state.defaultImageSelected && this.setState({ image: images[4] }); this.setState({ text: slogans[3], defaultImageSelected: false }) }}>
                {slogans[3].split(' ').slice(0, 2).join(' ') + '...'}
              </Button>
            </div>
          </div>
          <Link to="/target-ad">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
      </div>
    );
  }
}

DarkAd.propTypes = {
  classes: PropTypes.object.isRequired,
};
DarkAd.contextType = UserSession;

export default withStyles(styles)(DarkAd);
