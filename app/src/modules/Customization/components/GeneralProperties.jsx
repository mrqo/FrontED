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
        modelName: "",
        aliasName: "",
        bgColor: "",
        deriveStyle: false,
        width: 0,
        height: 0,
        x: 0,
        y: 0
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
                        label="Background color"
                        value={this.props.bgColor}
                        className={classes.textField}
                        onChange={this.onBgColorChanged}/>
                    {/*<SketchPicker/>*/}

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
        this.setState({modelName: e.target.value});
        this.props.onChange("name", e.target.value);
    }
    
    onAliasNameChanged = (e) => {
        this.setState({aliasName: e.target.value});
        this.props.onChange("aliasName", e.target.value);
    }

    onBgColorChanged = (e) => {
        this.setState({bgColor: e.target.value});
        this.props.onChange("bgColor", e.target.value);
    }

    onWidthChanged = (e) => {
        this.setState({width: e.target.value});
        this.props.onChange("width", e.target.value);
    }

    onHeightChanged = (e) => {
        this.setState({height: e.target.value});
        this.props.onChange("height", e.target.value);
    }

    onXChanged = (e) => {
        this.setState({x: e.target.value});
        this.props.onChange("x", e.target.value);
    }

    onYChanged = (e) => {
        this.setState({y: e.target.value});
        this.props.onChange("y", e.target.value);
    }
}

export default withStyles(styles)(GeneralProperties);
