import React from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import PageViewIcon from '@material-ui/icons/Pageview';

import { withStyles, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';
import Chip from '@material-ui/core/Chip';
import Popover from '@material-ui/core/Popover';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

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
        isUserDataValid: false,
        firstName: "",
        lastName: "",
        menuAnchorEl: null,
    }
    
    constructor(props) {
        super(props);
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleNewProject = this.handleNewProject.bind(this);  // FIXME: Marek, literowka? [Marek]: poprawione:)
        this.handleSelectProject = this.handleSelectProject.bind(this);
        this.handleSaveProject = this.handleSaveProject.bind(this);
        this.handleGenerateProject = this.handleGenerateProject.bind(this);
        this.handleLoginDialogClose = this.handleLoginDialogClose.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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

                    {
                        !this.state.isUserDataValid
                            ? <button 
                                className="btn btn-outline-primary"
                                onClick={(e) => this.setState({loginDialogOpen: true})}>
                                Login
                            </button>
                            : <div>
                                <Chip
                                    avatar={
                                        <Avatar>{this.state.firstName[0] + this.state.lastName[0]}</Avatar>
                                    }
                                    label={"Logged in as " + this.state.firstName}
                                    variant="outlined"
                                    className={classes.chip}
                                />
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={this.handleLogout}>
                                    Log out
                                </button>
                            </div>
                    }
                </Toolbar>
                <LoginDialog 
                    open={this.state.loginDialogOpen}
                    handleClose={this.handleLoginDialogClose}
                    handleLogin={this.handleLogin}
                /> 

                <Popover 
                    id="simple-menu" 
                    anchorEl={this.state.menuAnchorEl} 
                    open={Boolean(this.state.menuAnchorEl)} 
                    onClose={this.handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                    <List
                        component="nav" 
                        subheader={<ListSubheader>Project</ListSubheader>}>
                        <ListItem button onClick={this.handleNewProject}>
                            <ListItemIcon>
                                <CreateIcon/>
                            </ListItemIcon>
                            <ListItemText primary="New"/>
                        </ListItem>
                        <ListItem button onClick={this.handleSelectProject}>
                            <ListItemIcon>
                                <CloudDownloadIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Load"/>
                        </ListItem>
                        <ListItem button onClick={this.handleSaveProject}>
                            <ListItemIcon>
                                <SaveIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Save"/>
                        </ListItem>
                        <ListItem button onClick={this.handlePreviewProject}>
                            <ListItemIcon>
                                <PageViewIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Preview"/>
                        </ListItem>
                    </List>
                </Popover>
            </div>
        )
    }

    componentDidMount() {
        this._fetchProfile();
    }

    _fetchProfile() {
        SessionManager.getProfile()
            .then(function (response) {
                if (response == false) {
                    this.setState({isUserDataValid: false});
                } else {
                    this.setState({
                        isUserDataValid: true,
                        firstName: response.first_name,
                        lastName: response.last_name
                    });
                }
            }.bind(this));
    }

    handleMenuToggle = (event) => {
        this.setState({menuAnchorEl: event.currentTarget});
    }

    handleMenuClose = () => {
        this.setState({menuAnchorEl: null});
    }

    handleNewProject = (e) => { 
        // get NameProject from user
        // it MUST be unique (per user ofc)
        let nameProject = "FIXME:"
        let sourceProject = "can not be blank!"; // just send some garbage like "test" if creating new project
        SessionManager.addProject(nameProject, sourceProject)
        .then(function(response) {
               let id = response["id"]; // save this to handle generating later
               let name = response["name"]; // save this too (to pass this on save)
               let source = response["source"];
        })
    }

    handleSelectProject = (e) => {
        // get projects from database
        SessionManager.getProjects()
        .then(function(response) {
            // returns list of projects, in this format:
            // [
            //     {id: 1, name: "TestName", source: "Not blank!"},
            //     {id: 2, name: "TestName2", source: "Testing is the future"},
            // ]
        })
    }

    handleSaveProject = (e) => {
        let projectId = 5 // project is identified by ID
        let projectName = "TestProjectName" // pass project name, you can
        // pass different project name when user want to change project name
        PubSub.publish(topic.SaveProject, {
            id: projectId,
            name: projectName,
        });
    }

    // no handler
    handleGenerateProject = (e) => {
        let projectId = 5; // project is identified by ID
        SessionManager.generateProject(projectId)
        .then(function(response) {
            console.log(response["result"])
            // note that there is big change this will fail:
            // if e.g.:
            // json is invalid or
            // backend can't handle this json
        })
    }

    handlePreviewProject = (e) => {
        let projectId = 5; // project is identified by ID
        this.handleSaveProject();
        // we should have some wait here, because we have to refresh the website
        window.open(`http://127.0.0.1:8000/ed/projects/preview/${projectId}/html/`);
    }

    handleLoginDialogClose = (e) => {
        this.setState({loginDialogOpen: false});
    }

    handleLogin = (e, username, password) => {
        return SessionManager.login(username, password)
            .then(function(response) {
                if (response) {
                    // login sucessful
                    // probably web browser will remember everything properly
                    this.setState({loginDialogOpen: false});
                    this._fetchProfile();
                } 
                return response;
            }.bind(this))
    }

    handleLogout = (e) => {
        SessionManager.logout();
        this._fetchProfile();
    }
}

export default withStyles(styles)(PageBar);
