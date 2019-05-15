import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import SuccessAd from "../SuccessAd/SuccessAd";
import IconButton from "../../Components/IconButton/IconButton";
import SpectreHeader from "../../Components/SpectreHeader/SpectreHeader";
import FooterLogo from "../../Components/FooterLogo/FooterLogo";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",

    color: "black"
  }
};

function targetAd(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <SpectreHeader colour="white" />
      <div className={classes.content + " content"}>
        <Typography component="h4" variant="h4">
          Share your targetted ad with {props.selectedFollower.name}?
        </Typography>
        <Link component={SuccessAd} to="/success-ad">
          <Grid container justify="center">
          <Grid item>
          <IconButton icon="tick" text="Yes" />
          </Grid>
          <Grid item>
          <IconButton icon="next" text="No" />
          </Grid>
          </Grid>
        </Link>
      </div>
      <FooterLogo />
    </div>
  );
}

targetAd.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(targetAd);
