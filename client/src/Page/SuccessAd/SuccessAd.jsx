import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import { ReactComponent as Trophy } from '../../Icons/trophy.svg';

import './SuccessAd.scss';
import QuickNav from '../QuickNav';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
};

class SuccessAd extends QuickNav {
  constructor(props) {
    super(props, '/influence-a-nation');
    this.state = { timeout: null };
  }

  componentDidMount() {
    const timeout = setTimeout(this.next, 6500);
    this.setState({ timeout });
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  render() {
    const { classes } = this.props;
    this.context.adIssue = this.context.adIssue || 'leave';
    this.context.target = this.context.target || UserSession.defaults[0];
    const tname = this.context.target.name;
    const issue = this.context.adIssue;
    return (
      <div className={`${classes.root} successAd`}>
        <SpectreHeader colour="white" progressActive progressNumber="two" />
        <div className={`${classes.content} content`}>
          <Fade in timeout={1000}>
            <div>
              <p className="copy bold">
                Your targeted ad was successful!
              </p>

              <p className="icon">
                <Trophy />
              </p>

              <p className="copy" component="h6" variant="h6">
                <strong>{tname}</strong> is now more likely to vote {issue} in the referendum.
              </p>
              {/* <Link to="/influence-a-nation">
                <IconButton icon="next" text="Next" />
              </Link> */}
            </div>
          </Fade>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

SuccessAd.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
SuccessAd.contextType = UserSession;
export default withStyles(styles)(SuccessAd);