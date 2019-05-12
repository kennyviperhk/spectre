import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Steps from '../Steps/Steps';
import IconButton from '../../Components/IconButton/IconButton';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",

        color: 'black'
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

function getContent(virtue) {
    const content = {
        influence: 'To become more influencial',
        faith: 'To become more faithful',
        wealth: 'To become more wealthy',
        truth: 'To find more truth',
        power: 'To become more powerful',
    }
    return content[virtue]
}

function BelieveInDataism(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SpectreHeader colour="white" />
            <div className={classes.content + " content"}>
                <Typography component="h4" variant="h4">{getContent(props.virtue)} you need more data.</Typography>
                <Typography component="h4" variant="h4">We can help you believe in the {props.virtue} of dataism</Typography>
                <Link component={Steps} to="/steps">
                    <IconButton icon="next" text="Next" />
                </Link>
            </div>
            <FooterLogo />
        </div>
    );
}

BelieveInDataism.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BelieveInDataism);
