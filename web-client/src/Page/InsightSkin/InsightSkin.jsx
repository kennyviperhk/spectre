import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "../../Components/IconButton/IconButton";
import SpectreHeader from "../../Components/SpectreHeader/SpectreHeader";
import FooterLogo from "../../Components/FooterLogo/FooterLogo";
import TextSliderText from "../../Components/TextSliderText/TextSliderText";
import AvatarComponent from "../../Components/AvatarComponent/AvatarComponent";
import UserSession from '../../Components/UserSession/UserSession';

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    color: "black"
  }
};

class InsightSkin extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SpectreHeader colour="white" progressActive={true} progressNumber="one" />
        <div className={classes.content + " content"}>
          <Typography component="h6" variant="h6">
            What is {this.context.targetName}'s likely skin colour?
          </Typography>
          <AvatarComponent target={{ image: '/targets/target0.png' }}/>
          <TextSliderText leftText="Light" rightText="Dark" />
          <Link to="/insight-financial">
            <IconButton icon="next" text="Next" />
          </Link>
        </div>
        <FooterLogo />
      </div>
    );
  }
}

InsightSkin.propTypes = {
  classes: PropTypes.object.isRequired
};
InsightSkin.contextType = UserSession;


export default withStyles(styles)(InsightSkin);
