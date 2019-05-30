import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: 'black'
  },
};

{/* Interstitial */}

class Campaign extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" progressActive={true} progressNumber="two" />
          <div className={classes.content + " content"}>
              <Fade in={true} style={{transitionDelay: '200ms'}}>
                <Typography component="h6" variant="h6">The {this.context.adIssue} campaign is in jeopardy.</Typography>
              </Fade>
              <Fade in={true} style={{transitionDelay: '600ms'}}>
                <Typography component="h6" variant="h6">Longer delays to Brexit increase the risk of it not happening.</Typography>
              </Fade>
              <Fade in={true} style={{transitionDelay: '1000ms'}}>
                <Typography component="h6" variant="h6">We’re going to run a ‘grassroots’ campaign to influence {this.context.targetName} to vote {this.context.adIssue} in the next referendum.</Typography>
              </Fade>
              <Link to="/dark-ad">
                  <IconButton icon="next" text="Ready" />
              </Link>
          </div>
          <FooterLogo />
      </div>
    );
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired,
};
Campaign.contextType = UserSession;
export default withStyles(styles)(Campaign);
