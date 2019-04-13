import React from 'react';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
    },
    switchLabel: {
        textAlign: 'left'
    }
});

class GeneralProperties extends React.Component {
    state = {
        modelName: "",
        aliasName: "",
        deriveStyle: false,
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <FormControl 
                component="fieldset"
                fullWidth="true">
                <FormLabel component="legend">
                    General
                </FormLabel>
                <FormGroup>
                    <TextField 
                        id="genNameField"
                        label="Name"
                        value={this.props.name}
                        className={classes.textField}
                        onChange={this._onNameChange}/>

                    
                    <TextField 
                        name="genAliasNameField"
                        label="Alias name"
                        placeholder="aliasName"
                        value={this.props.aliasName}
                        className={classes.textField}/>

                    <div>
                        <TextField
                            label="Width"
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style = {{width: "45%"}}/>

                        <TextField
                            label="Height"
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style = {{width: "45%", marginLeft: "10%"}}/>
                    </div>

                    <div>
                        <TextField
                            label="Position X"
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style = {{width: "45%"}}/>

                        <TextField
                            label="Position Y"
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style = {{width: "45%", marginLeft: "10%"}}/>
                    </div>
                    
                    {/*
                        <FormControlLabel
                        control={
                            <Switch 
                                checked={this.state.deriveStyleChecked}
                                value="deriveStyleChecked"
                                className={classes.switch}/>
                        }
                        label={
                        <div 
                            className={classes.switchLabel}>
                            Inherit styles
                        </div>
                        }
                        labelPlacement="start"/>    
                        */
                    }

                </FormGroup>
            </FormControl>
        );
    }

    _onNameChange = (e) => {
        /*
        this.setState({
            modelName: e.target.value
        });
        */
    }
}

export default withStyles(styles)(GeneralProperties);