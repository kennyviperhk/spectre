import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import Video from '../../Components/Video/Video';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
    color: 'black',
  },
  clickToContinue: {
    margin: '20% 0',
  },
};

class Goodbye extends React.Component {
  constructor(props) {
    super(props);

    this.state = { movie: `/video/goodbye/Goodbye_${this.context.celeb}.mp4` };
  }

  render() {
    const { movie } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" />
        <Video ref={this.video} movie={movie} autoPlay onComplete="/" />
        <FooterLogo />
      </div>
    );
  }
}

Goodbye.propTypes = {
  classes: PropTypes.object.isRequired,
};
Goodbye.contextType = UserSession;

export default withStyles(styles)(Goodbye);
