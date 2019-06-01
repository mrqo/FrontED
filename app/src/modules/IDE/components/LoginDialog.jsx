import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class LoginDialog extends React.Component {
    state = {
        username: '',
        password: '',
        displayError: false,
    }

    render() {
        return (
            <div>
            <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                {
                    this.state.displayError
                        ? <p style={{color: 'red'}}>Wrong username or password.</p>
                        : <div/>
                }
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Username"
                    type="email"
                    value={this.state.username}
                    onChange={(e) => this.setState({username: e.target.value})}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button 
                    onClick={(e) => {
                        const response = this.props.handleLogin(e, this.state.username, this.state.password);
                        this.setState({displayError: !response});
                    }} 
                    color="primary">
                    Login
                </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default LoginDialog;
