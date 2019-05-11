import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import grey from '@material-ui/core/colors/grey';

import './SocialLogin.scss';

const styles = {
  textField: {
    width: 300,
    color: grey[50],
    '&:before': {
      borderColor: grey[50],
    },
  },
  cssLabel: {
    color: grey[50],
    '&$cssFocused': {
      color: grey[50],
    },
  },
  cssFocused: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  cssUnderline: {
    '&:after': {
      borderBottomColor: grey[50],
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: grey[50],
    },
  },

};

function SocialLogin(props) { // requires props.handleSubmit
  //const { handleSubmit, classes } = props;
  //console.log("PROPS",props);
  return (
    <div className={props.classes.root + " socialLogin"}>
        <div className={props.classes.content + " socialLogin-content"}>
          <form onSubmit = { props.handleSubmit }>
            <FormControl className={props.classes.margin}>
                <InputLabel
                classes={{
                    root: props.classes.cssLabel,
                    focused: props.classes.cssFocused
                }}
                >
                Login via social media or email
                </InputLabel>
                <Input
                id="custom-css-standard-input"
                classes={{
                    root: props.classes.textField,
                    underline: props.classes.cssUnderline
                }}
                />
                <Button disabled={!validateForm() } type="submit">
                Go
                </Button>
            </FormControl>
          </form>
        </div >
    </div>
  );
}

function validateForm(e) {
  console.log('validateForm');
  return true;
}

SocialLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SocialLogin);
