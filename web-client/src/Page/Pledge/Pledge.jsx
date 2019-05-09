import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import SearchingFor from '../SearchingFor/SearchingFor';
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
    }
};

function Pledge(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
            
                <Typography component="h6" variant="h6">Spectre can help you in ways you don't expect. Spectre can see patterns you can't see.</Typography>
                <Typography component="h6" variant="h6">We can tell you things about yourself that you don't know.</Typography>
                <Typography component="h6" variant="h6">In order for you to know more, you must offer up something precious to you.</Typography>
                <Typography component="h6" variant="h5">Continue?</Typography>
                <Link component={SearchingFor} to="/searching-for">
                    <IconButton icon="next" text="Next" />
                </Link>

            </div >
            <FooterLogo />
        </div >
    );
}

Pledge.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pledge);
