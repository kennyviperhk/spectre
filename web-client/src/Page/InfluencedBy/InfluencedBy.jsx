import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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

class InfluencedBy extends React.Component {
  render() {
    let influences = this.context.influencedBy || ['Security or crime-related issues', 'Images of large crowds', 'Immigration issues'];
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <SpectreHeader colour="white" />
          <div className={classes.content + " content"}>
              <Typography component="h6" variant="h6">{this.props.selectedFollower.name}‘s OCEAN profile shows they are most likely influenced by:</Typography>
              <Typography component="h6" variant="h6">{influences.map((influence,i) => <p key={i}>&#10003;&nbsp;{influence}</p>)}</Typography>
              <Typography component="h6" variant="h6">Use our design tool to create a targeted Facebook ad to influence {this.props.selectedFollower.name}’s vote.</Typography>
              <Link to="/dark-ad">
                  <IconButton icon="next" text="Let's go" />
              </Link>
          </div>
          <FooterLogo />
      </div>
    );
  }
}

InfluencedBy.propTypes = {
  classes: PropTypes.object.isRequired,
};
InfluencedBy.contextType = UserSession;

export default withStyles(styles)(InfluencedBy);
