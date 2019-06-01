import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import LoginDialog from './LoginDialog';

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

                    {

                    /*
                    <Popper 
                        open={this.state.menuOpen} 
                        anchorEl={anchorRef.current} 
                        transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: 'center bottom' }}
                            >
                            <Paper id="menu-list-grow">
                                <ClickAwayListener onClickAway={this.handleMenuClose}>
                                <MenuList>
                                    <MenuItem onClick={this.handleNewProject}>New</MenuItem>
                                    <MenuItem onClick={this.handleSaveProject}>Save</MenuItem>
                                    <MenuItem onClick={this.handleSelectProject}>Select project</MenuItem>
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                    </Popper>
                    */
                    }
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
                    handleClose={this.handleLoginClose}
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

    handleLoginClose = (e) => {
        this.setState({loginDialogOpen: false});
    }
}

export default withStyles(styles)(PageBar);