import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import movie from "./Intro_to_Spectre_V1 .mp4"
const styles = {

};

function IntroVideo(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className="IntroVideo-content content">
                {/*<video width={window.innerWidth} autoplay controls>*/}
                <Typography component="h5" variant="h5">Meet Spectre</Typography>
                <video width={window.innerWidth} controls>
                    <source src={movie} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <Link to="/username"> <IconButton icon="next" text="Skip" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

IntroVideo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntroVideo);
