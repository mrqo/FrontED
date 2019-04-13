import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { CardActionArea, ListItemText } from '@material-ui/core';

import containerIcon from '../icons/container-icon.png';
import buttonIcon from '../icons/button-icon.png';

const styles = theme => ({
    tile: {
        maxWidth: 100,
        backgroundColor: theme.palette.background.paper,
    },

    inline: {
        display: 'inline'
    }
});

class ControlTile extends React.Component {
    state = {
        title: "",
        description: ""
    }


    render() {
        const { classes } = styles;

        return (
            <ListItem 
                button
                onClick={this.props.onClick}
                alignItems="flex-start"
                role={undefined}
                className={styles.tile}>
                <ListItemAvatar>
                    <Avatar 
                        alt="Control icon"
                        src={buttonIcon}/>
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.title}
                    secondary = {
                        <React.Fragment>
                            <Typography component="span" className={styles.inline} color="textPrimary">
                                {this.props.description}
                            </Typography>
                        </React.Fragment>
                    }
                />  
            </ListItem>
        );
    }
}

export default withStyles(styles)(ControlTile);