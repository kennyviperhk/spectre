import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import image from './logo.svg';
import "./Logo.scss";
import ComponentsStyles from '../../App.module.css';

const styles_portrait = {
    Logo: {
        width: "200px",
        height: "200px",
    }
}

const styles_landscape = {
    Logo: {
        width: "100px",
        height: "100px",
    }
}

function Logo(props) {
  
    return (
        <div>
            <img className={ComponentsStyles.logo} alt="logo" src={image}></img>
        </div>
    );
}

Logo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(window.innerWidth === 1920 ? styles_landscape : styles_portrait)(Logo);
