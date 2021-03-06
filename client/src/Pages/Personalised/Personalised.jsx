import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import Countdown from 'react-countdown';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

import { withStyles } from '@material-ui/core/styles';
import './Personalised.scss';

const styles = {};

class Personalised extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root + ' Personalised'}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <div>
            <Fade in>
              <h1>In order to create a&nbsp;<span>personalised experience</span></h1>
            </Fade>
            <Fade in style={{ transitionDelay: '1000ms' }}>
              <p className="normal">
                Tell us what you love and tell us what you hate.
            </p>
            </Fade>
          </div>
          <div className="hidden">
            <Countdown renderer={() => null}
              onComplete={() => this.context.goto(this.props, '/game')}
              date={Date.now() + 5000}
            />
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Personalised.propTypes = {
  classes: PropTypes.object.isRequired,
};

Personalised.contextType = UserSession;

export default withStyles(styles)(Personalised);
