import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import SpectreHeader from '../../Components/SpectreHeader/SpectreHeader';
import FooterLogo from '../../Components/FooterLogo/FooterLogo';
import UserSession from '../../Components/UserSession/UserSession';
import IconButton from '../../Components/IconButton/IconButton';

const styles = {
    root: {
        flexGrow: 1,
        width: "100%",
        color: 'black',
    },
    clickToContinue: {
        margin: "20% 0",
    }
};

class CustomerSurvey extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <SpectreHeader colour="white" />
                <div className={classes.content + " content"}>
                    <Typography component="h6" variant="h6">HOW DO YOU FEEL ABOUT OUR LATEST PRODUCTS?</Typography>
                    <Typography component="h6" variant="h6">DO YOU BELIEVE IN THE [POWER] THAT DATA CAN PROVIDE?</Typography>
                    <Typography component="h6" variant="h6">WOULD YOU RECOMMEND US TO A FRIEND?§</Typography>                    
                    <Link to="/outro-video">
                        <IconButton icon="tick" text="Next" />
                    </Link>
                </div >
                <FooterLogo />
            </div >
        );
    }
}

CustomerSurvey.propTypes = {
    classes: PropTypes.object.isRequired,
};
CustomerSurvey.contextType = UserSession;

export default withStyles(styles)(CustomerSurvey);
