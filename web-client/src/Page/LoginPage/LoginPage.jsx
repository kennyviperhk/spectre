import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '../../Components/Modal/Modal';
import grey from '@material-ui/core/colors/grey';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import UserSession from '../../Components/UserSession/UserSession';
import { Link } from 'react-router-dom';
import './LoginPage.scss';
import Video from '../../Components/Video/Video';
import NavigationHack from '../NavigationHack';


window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true; // TMP: #138

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundSize: 'cover',
  },
  clickToContinue: {
    margin: '20% 0',
  },
  marginTop: {
    marginBottom: 75,
  },
  border: {
    borderBottomColor: 'white',
  },
  textField: {
    color: grey[50],
    '&:before': {
      borderColor: grey[50],
    },
  },
  cssLabel: {
    transform: 'translate(0,1.5rem)',
    color: grey[50],
    '&$cssFocused': {
      color: grey[50],
    },
  },
  cssFocused: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  cssOutlinedInput: {
    // TMP: removed to silence warning in console
    // '&$cssFocused $notchedOutline': {
    //   borderColor: grey[50],
    // }
  },
};


class LoginPage extends NavigationHack {

  static validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.length > 0 && re.test(email.toLowerCase());
  }
  static validName(name) {
    return name.length > 0;
  }

  constructor(props) {
    super(props, '/pledge');
    this.state = {
      emailErrorCount: 0,
      nameErrorCount: 0,
      modalOpen: false,
      clearEmail: true,
      idleTimer : 0,
      resetTimer : 5,
      isIdle : false
    };

    this.handleIdle = this.handleIdle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.termsOfService = this.termsOfService.bind(this);
    this.modalContent = '';
    this.modalTitle = '';
    this.intervall = '';

  }
  componentDidMount() {
    document.addEventListener('click', this.handleClick);
    this.intervall = setInterval(this.handleIdle, 1000);
  }

  componentWillMount() {
    console.log(this.context);
    UserSession.defaultUsers((users) => {
      this.context.similars = users;
      console.log('User:', this.context);
    });
    document.removeEventListener('click', this.handleClick);
    clearInterval(this.intervall);
  }


  handleIdle(){

    let timer = this.state.idleTimer;
    console.log(timer);
    if(timer > 10 ){
      this.state.isIdle = true;
    }else{
      if(this.video != null ){
        if(this.video.videoPlayer.current == null){
          this.state.idleTimer = this.state.idleTimer + 1;
        }
    }

    }
    if(this.state.isIdle){
      this.modalTitle = this.state.resetTimer + '';
      this.modalContent = 'Are you still here?';
      this.setState({ modalOpen: true });
      this.state.resetTimer -= 1;
    }
    if(this.state.resetTimer<=-1){
        window.open("/", "_self");
    }
  }

  handleClick(e) {
    if (e) {
      this.state.idleTimer = 0;
      this.state.isIdle = false;
      this.state.resetTimer = 5;
      if(this.modalContent.includes('Are you still here?') && this.state.modalOpen){
        this.closeModal();
      }
    }
  }

  handleSubmit(e, { name, email, clearEmail }) {
    e.preventDefault();
    const { emailErrorCount, nameErrorCount } = this.state;
    const emailValid = LoginPage.validEmail(email);
    const nameValid = LoginPage.validName(name);

    // get user from current context
    const user = this.context;
    user.lastPageVisit = { page: '/Login', time: Date.now() };


    if (nameValid && emailValid) {

      user.loginType = 'email'; // TMP:
      user.login = email;
      user.name = name.ucf();
      /*const handleSuccess = (json) => {
        Object.assign(user, json);
        this.showVideo();
      };

      const handleError = () => {

        if (e.error === 'EmailInUse') {
          this.modalTitle = 'Invalid email';
          this.modalContent = 'Email has already been used';
          this.setState({ modalOpen: true });
        } else {
          console.error(e);
          this.showVideo();
        }
      };*/
      console.log(user);
      this.showVideo();
      //UserSession.createUser(user, handleSuccess, handleError);

    } else if (!nameValid && nameErrorCount < 3) {

      this.modalTitle = 'Oops...';
      this.modalContent = 'You need to enter a name, please try again';
      this.setState({ modalOpen: true, nameErrorCount: nameErrorCount + 1 });

    } else if (!emailValid && emailErrorCount < 3) {

      this.modalTitle = 'Oops...';
      this.modalContent = 'That doesn\'t look like a valid email address, please try again';
      this.setState({ modalOpen: true, emailErrorCount: emailErrorCount + 1 });
      clearEmail();
    } else {

      // TMP: should reject without successful User creation
      this.context.login = email;
      this.context.name = name; // user-prop
      this.showVideo();
    }
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  showVideo() {
    this.video.play();
  }

  termsOfService(){
    console.log("click");
    this.modalTitle = 'Terms of Service';
    this.modalContent = 'Brungard told the court he -was drunk when the incident took placeBrungard told the court he -was drunk when the incident took placeBrungard told the court he -was drunk when the incident took placeBrungard told the court he -was drunk when the incident took placeBrungard told the court he -was drunk when the incident took placeBrungard told the court he -was drunk when the incident took place';
    this.setState({ modalOpen: true });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root + ' LoginPage'} id='View' onClick={this.handleClick}>
        <SpectreHeader />
        <div className={classes.content + ' LoginPage-content content'}>
          <Typography style={{ marginBottom: 70 }} component="h2" variant="h2">Let's Play!</Typography>
          <Modal
            isOpen={this.state.modalOpen}
            title={this.modalTitle}
            content={this.modalContent}
            onClose={() => this.closeModal()}
          />
          <Video
            ref={(el) => { this.video = el; }}
            movie="/video/SpectreIntro.mp4"
            autoPlay={false}
            onComplete={this.next}
          />
          <SocialLogin handleSubmit={this.handleSubmit} />
        </div>
          <div onClick={this.termsOfService}><Link className='tos' to='#here'>Terms of Service</Link></div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

LoginPage.contextType = UserSession;

export default withStyles(styles)(LoginPage);
