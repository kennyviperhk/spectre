import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



class AvatarComponent extends React.Component {
    styles = {
        bigAvatar: {
            margin: 10,
            width: 60,
            height: 60,
        },
        targeted: {
            margin: 10,
            width: 60,
            height: 60,
            border: '5px solid #378685',
        },
        active: {
            margin: 10,
            width: 60,
            height: 60,
            border: '5px solid #4FAE50',
        },
        targeted_text: {
            color: '#378685',
        }
    };

    constructor(props) {
        super(props);
        this.state = { class: 'targeted' };
    };

    render() {
        return (
            <div >
                <Grid container justify="center" alignItems="center">
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" style={this.styles.targeted} />
                </Grid>
                <Typography style={this.state.class ? this.styles.targeted_text : null}>Remy Sharp</Typography>
            </div>
        );
    }
}
export default AvatarComponent;