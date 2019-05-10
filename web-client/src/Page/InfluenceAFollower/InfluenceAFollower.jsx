import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SelectedAvatar from '../SelectedAvatar/SelectedAvatar'
import AvatarComponent from '../../Components/AvatarComponent/AvatarComponent';
import Grid from '@material-ui/core/Grid';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        
        color: 'black'
    },
    content: {
        paddingTop: "100px",
    },
    clickToContinue: {
        margin: "20% 0",
    },
    glow: {
        color: '#ffd700'
    }
};

function InfluenceAFollower(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">Influence a follower!</Typography>
                <Typography component="h4" variant="h4" >Spectre has a community of devout followers willing to help you.</Typography>
                <Typography component="h5" variant="h5" >Choose one to influence</Typography>
                <Grid container justify="center" alignItems="center">
                    <AvatarComponent class='active'></AvatarComponent>
                    <AvatarComponent></AvatarComponent>
                    <AvatarComponent></AvatarComponent>
                    <AvatarComponent class='active'></AvatarComponent>
                    <AvatarComponent></AvatarComponent>
                    <AvatarComponent></AvatarComponent>
                    <AvatarComponent class='active'></AvatarComponent>
                    <AvatarComponent class='active'></AvatarComponent>
                </Grid>
                <Link component={SelectedAvatar} to="/selected-avatar">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

InfluenceAFollower.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfluenceAFollower);
