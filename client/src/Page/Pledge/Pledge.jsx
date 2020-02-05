import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';


//import colours from '../../colors.scss';
import './Pledge.scss';

const styles = {
};

class Pledge extends React.Component {
  constructor(props) {
    super(props, '/searching');
    this.timeout = -1;
  }

  componentDidMount() {
    this.timeout = setTimeout(() =>
      this.props.history.push('/searching'), 7500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <div className={`${classes.content} content`}>
          <div className="pledge">
            <Fade in timeout={1000}>
              <h1>
                Welcome to the altar of <span>Dataism</span>.
              </h1>
            </Fade>
            <Fade in timeout={1000} style={{ transitionDelay: '2500ms' }}>
              <p className="copy">Our technologies can tell you things about yourself that you don’t know.</p>
            </Fade>
            <Fade in timeout={1000} style={{ transitionDelay: '4500ms' }}>
              <p className="copy">In order for us to do this, first we need to get to know you a little bit.</p>
            </Fade>
          </div>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

Pledge.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
Pledge.contextType = UserSession;

export default withStyles(styles)(Pledge);
