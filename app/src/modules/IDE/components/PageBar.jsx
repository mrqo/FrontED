import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Chip from '@material-ui/core/Chip';

import LoginDialog from './LoginDialog';

import * as SessionManager from '../../Domain/Managers/SessionManager';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: 0,
        marginRight: 0,
    },
    grow: {
        flexGrow: 1,
        marginLeft: -10,
    },
    menuButton: {
        marginRight: 20,
    },
    chip: {
        marginLeft: 10,
        marginRight: 10,
    }
});

class PageBar extends React.Component {
    state = {
        loginDialogOpen: false,
        menuOpen: false,
    }
    
    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                <Toolbar variant="dense">
                    <IconButton 
                        className={classes.menuButton} 
                        color="inherit"
                        aria-label="Menu"
                        onClick={this.handleMenuToggle}>
                        <MoreVertIcon/>
                    </IconButton>

                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        FrontED
                    </Typography>
                    <Chip
                        avatar={
                            <Avatar>MI</Avatar>
                        }
                        label="Hi, Marek!"
                        variant="outlined"
                        className={classes.chip}
                    />
                    
                    <button 
                        className="btn btn-outline-primary"
                        onClick={(e) => this.setState({loginDialogOpen: true})}>
                        Login
                    </button>
                </Toolbar>
                <LoginDialog 
                    open={this.state.loginDialogOpen}
                    handleClose={this.handleLoginDialogClose}
                    handleLogin={this.handleLogin}
                />

                
            </div>
        )
    }

    handleNewProject = (e) => {

    }

    handleSelectProject = (e) => {

    }

    handleSaveProject = (e) => {

    }

    handleMenuToggle = (e) => {
        //setAnchorEl(event.currentTarget);
        this.setState({menuOpen: true});
    }

    handleMenuClose = (e) => {
        this.setState({menuOpen: false});
    }

    handleLoginDialogClose = (e) => {
        this.setState({loginDialogOpen: false});
    }

    handleLogin = (e, username, password) => {
        const isLoggedIn = SessionManager.login(username, password);
        console.log("Is user logged in: ");
        console.log(isLoggedIn);
    }
}

export default withStyles(styles)(PageBar);
