import React from 'react';

import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { withStyles } from '@material-ui/core/styles';

import { SketchPicker } from 'react-color';


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
        deriveStyle: false
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
                        value={this.props.model.properties.name}
                        className={classes.textField}
                        onChange={this.onNameChanged}/>

                    <TextField 
                        name="genAliasNameField"
                        label="Alias name"
                        placeholder="aliasName"
                        value={this.props.model.properties.name}
                        className={classes.textField}
                        onChange={this.onAliasNameChanged}/>

                    <TextField 
                        name="genColorNameField"
                        type="color"
                        label="Main color"
                        value={this.props.model.properties.bgColor}
                        className={classes.textField}
                        onChange={this.onBgColorChanged}/>
                    
                    <div>
                        <TextField
                            label="Width"
                            type="number"
                            value={this.props.model.properties.width}
                            className={classes.textField}
                            onChange={this.onWidthChanged}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style = {{width: "45%"}}/>

                        <TextField
                            label="Height"
                            type="number"
                            value={this.props.model.properties.height}
                            className={classes.textField}
                            onChange={this.onHeightChanged}
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
                            value={this.props.model.properties.x}
                            onChange={this.onXChanged}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style = {{width: "45%"}}/>

                        <TextField
                            label="Position Y"
                            type="number"
                            className={classes.textField}
                            value={this.props.model.properties.y}
                            onChange={this.onYChanged}
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
    
    onNameChanged = (e) => {
        this.props.onChange("name", e.target.value);
    }
    
    onAliasNameChanged = (e) => {
        this.props.onChange("aliasName", e.target.value);
    }

    onBgColorChanged = (e) => {
        this.props.onChange("bgColor", e.target.value);
    }

    onWidthChanged = (e) => {
        var val = parseInt(e.target.value);
        if (!isNaN(val)) 
        {  
            this.props.onChange("width", val);
        } else
        {
            this.props.onChange("width", e.target.value);
        }
    }

    onHeightChanged = (e) => {
        var val = parseInt(e.target.value);
        if (!isNaN(val)) 
        {  
            this.props.onChange("height", val);
        } else
        {
            this.props.onChange("height", e.target.value);
        }
    }

    onXChanged = (e) => {
        var val = parseInt(e.target.value);
        if (!isNaN(val)) 
        {  
            this.props.onChange("x", val);
        } else
        {
            this.props.onChange("x", e.target.value);
        }
    }

    onYChanged = (e) => {
        var val = parseInt(e.target.value);
        if (!isNaN(val)) 
        {  
            this.props.onChange("y", val);
        } else
        {
            this.props.onChange("y", e.target.value);
        }
    }
}

export default withStyles(styles)(GeneralProperties);
