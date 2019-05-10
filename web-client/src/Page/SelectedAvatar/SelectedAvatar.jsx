import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import InsightHairColor from '../InsightHairColor/InsightHairColor';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        
        color: 'black'
    },
};

function SelectedAvatar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h3" variant="h3">SelectedAvatar</Typography>
                <Link component={InsightHairColor} to="/insight-hair">
                <IconButton icon="next" text="DIVE IN" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

SelectedAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedAvatar);
