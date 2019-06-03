import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class NewProjectDialog extends React.Component {
    state = {
        title: '',
        sourceProject: '',
        displayError: false,
    }

    render() {
        return (
            <div>
            <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Project</DialogTitle>
                <DialogContent>
                {
                    this.state.displayError
                        ? <p style={{color: 'red'}}>Project with this name already esists :(.</p>
                        : <div/>
                }
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New Project Name"
                    ///type="text"
                    value={this.state.title}
                    onChange={(e) => this.setState({title: e.target.value})}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="projectSource"
                    label="New Project sourceProject"
                    ///type="text"
                    value={this.state.sourceProject}
                    onChange={(e) => this.setState({sourceProject: e.target.value})}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button 
                    //onClick={(e) => {
                    //    this.props.handleCreate(e, this.state.title)
                    //        .then(response => this.setState({displayError: !response}));
                    //}} 
                    onClick={(e) => {
                        let res = this.props.handleCreate(e, this.state.title, this.state.projectSource);
                        this.setState({displayError: !res});
                    }} 
                    color="primary">
                    Create
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default NewProjectDialog;
