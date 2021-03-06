import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Components/Modal/Modal';
import TOSModal from '../../Components/TOSModal/TOSModal';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import { Link } from 'react-router-dom';
import Video from '../../Components/Video/Video';
import IdleChecker from '../../Components/IdleChecker/IdleChecker';
import TosSummary from './tosSummary'
import Tos from './Tos'

import { withStyles } from '@material-ui/core/styles';
import './LoginPage.scss';

//window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // TMP: #138

const styles_landscape = {};

class LoginPage extends React.Component {

  constructor(props) {
    super(props, '/pledge');
    this.state = {
      height: props.height,
      emailErrorCount: 0,
      modalOpen: false,
      tosModalOpen: false,
      idleCheckerDone: false,
    };
    this.videoStarted = false;
    this.video = React.createRef();
    this.social = React.createRef();
    this.modalContent = '';
    this.modalTitle = '';
    this.tosModalSummary = '';
    this.tosModalContent = '';
    this.tosModalTitle = '';
  }


  componentDidMount() {
    UserSession.clear(this.context);
    this.setState({ height: window.innerHeight + 'px' });
  }

  goto = (page) => {
    if (this.context) {
      this.context.goto(this.props, page);
    }
    else {
      this.props.history.push(page);
    }
  }

  handleSubmit = (e, { name, email }) => {

    if (e) e.preventDefault();
    const user = this.context;
    if (!e) { // right-arrow key
      UserSession.validate(this.context, ['name', 'login'], { allowNoId: true });
      name = user.name;
      email = user.login;
      console.log("[STUB]", name, email);
    }

    if (!this.emailIsValid(email)) {
      if (this.state.emailErrorCount < 3) {
        this.modalTitle = 'Oops...';
        this.modalContent = 'That doesn\'t look like a valid email address, please try again';
        this.setState({ modalOpen: true, emailErrorCount: this.state.emailErrorCount + 1 });
      }
      else {
        this.goto('/login');
      }
    }
    else {
      user.name = name;
      user.login = email;
      this.social.setState({ name, email });
      this.setState({ modalOpen: false });
      this.saveUser(user);
    }
  }

  // save user then start video
  saveUser = async (user) => {
    user.logVisit();
    try {
      let result = await UserSession.create(user);
      if (result === 'EmailInUse') { // re-used email

        // HANDLE #465 HERE (use the modal to alert user they
        // are being taken to their previous location)

        /*
          // find the last page of the user
          user = await UserSession.lookup(this.context.login);
          if (!user.lastPage) this.goto('/login');
          let pages = user.lastPage.split(',');
          let next = pages.pop();
          console.log('[LOGIN] Returning user: ' + user.toString(), next);
        */

        /*
         * DIALOG:
         * Looks like you've visited before, want to continue?
         *  [no thanks]        [[sure!]]
         *  goto '/login'      goto 'next'
         */

        // too many errors, back to start page
        if (this.state.emailErrorCount > 2) this.goto('/');

        // alert user that email was used
        this.modalTitle = 'Email in use';
        this.modalContent = 'Sorry, this email was already registered';
        this.setState({ modalOpen: true, emailErrorCount: this.state.emailErrorCount+1 });
      }
      else if (typeof result === 'string') {
        throw Error(result); // unknown error
      }
      else {
        this.showVideo(); // save was ok, show video
      }
    }
    catch (e) {
      console.error('[LOGIN] Unexpected error: ', e, 'for', user);
      this.goto('/');
    }
  }

  closeModal = () => {
    this.setState({ modalOpen: false });
  }

  closeTosModal = () => {
    this.setState({ tosModalOpen: false });
  }

  showVideo = () => {
    if (this.video) {
      this.videoStarted = true;
      this.video.play();
      this.setState({ idleCheckerDone: true });
    }
    else {
      console.error("Unable to load video component");
      this.goto('/pledge');
    }
  }

  termsOfService = () => {
    this.tosModalTitle = 'We value your privacy.';
    this.tosModalSummary = TosSummary.text;
    this.tosModalContent = '';
    this.setState({ tosModalOpen: true });
  }

  onKeyPress = (e) => {
    if (e.key === 'ArrowRight') {
      if (this.videoStarted) { // next-page
        this.goto('/pledge');
      }
      else {
        this.handleSubmit(false, {}); // dev only: use mock data
      }
    }
    else if (e.key === 'ArrowLeft') {
      this.goto(this.videoStarted ? '/login' : '/');
    }
  }

  endVideo = () => { // to next page
    if (this.videoStarted) this.goto('/pledge');
  }

  emailIsValid = (addr) => {
    return addr && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(addr.toLowerCase());
  }

  render() {
    return (
      <div className={this.props.classes.root + ' LoginPage'}>
        <SpectreHeader colour="white" />
        <IdleChecker forceTerminate={this.state.idleCheckerDone} />
        <div className={this.props.classes.content + ' LoginPage-content content'}>
          <h1 className="login-title">Let's play!</h1>
          <Modal
            isOpen={this.state.modalOpen}
            title={this.modalTitle}
            content={this.modalContent}
            onClose={() => this.closeModal()}
          />
          <TOSModal
            isOpen={this.state.tosModalOpen}
            title={this.tosModalTitle}
            summary={this.tosModalSummary}
            content={<Tos />}
            onClose={() => this.closeTosModal()}
          />
          <Video
            ref={ele => { this.video = ele }}
            movie={`${UserSession.publicUrl}video/SpectreIntro.mp4`}
            onComplete={this.endVideo}
            onKeyUp={this.onKeyPress}
            autoPlay={false}
          />
          <SocialLogin
            ref={ele => { this.social = ele }}
            handleSubmit={this.handleSubmit} />
        </div>
        <div onClick={this.termsOfService}>
          <Link className='tos' to='#here'>Terms of Service</Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

LoginPage.defaultProps = {
  height: '500px'
};
LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  height: PropTypes.string
};
LoginPage.contextType = UserSession;

export default withStyles(styles_landscape)(LoginPage);
