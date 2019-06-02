import React from 'react';

import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { FormatAlignLeftRounded, FormatAlignCenterRounded, FormatAlignRightRounded } from '@material-ui/icons';
import { VerticalAlignBottomRounded, VerticalAlignCenterRounded, VerticalAlignTopRounded } from '@material-ui/icons';

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
    },
    icon: {
        width: 24,
        height: 24,
        color: '#192A59',
    },
    uncheckedIcon: {
        width: 24,
        height: 24,
        color: '#cccccc'
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
                fullWidth={true}>
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
                    
                    <div style={{marginTop: 10}} className="row">
                        <div className="col">
                            <Typography 
                                style={{width: "100%"}} 
                                variant="caption" 
                                display="block" 
                                gutterBottom>
                                Horizontal align
                            </Typography>
                        
                            <FormatAlignLeftRounded 
                                className={
                                    this.props.model.properties.contentHorAlignment == 'left'
                                    ? classes.icon
                                    : classes.uncheckedIcon
                                }
                                onClick={(e) => {
                                    this.onHorizontalAlignmentChanged(e, 'left');
                                }}/>
                            <FormatAlignCenterRounded 
                                className={
                                    this.props.model.properties.contentHorAlignment == 'center'
                                    ? classes.icon
                                    : classes.uncheckedIcon
                                }
                                onClick={(e) => {
                                    this.onHorizontalAlignmentChanged(e, 'center');
                                }}/>
                            <FormatAlignRightRounded 
                                className={
                                    this.props.model.properties.contentHorAlignment == 'right'
                                    ? classes.icon
                                    : classes.uncheckedIcon
                                }
                                onClick={(e) => {
                                    this.onHorizontalAlignmentChanged(e, 'right');
                                }}/>
                        </div>
                        <div className="col">
                            <Typography 
                                style={{width: "100%"}}
                                variant="caption" 
                                display="block" 
                                gutterBottom>
                                Vertical align
                            </Typography>
                        
                            <VerticalAlignBottomRounded 
                                onClick={(e) => {
                                    this.onVerticalAlignmentChanged(e, 'bottom');
                                }}
                                className={
                                    this.props.model.properties.contentVerAlignment == 'bottom'
                                    ? classes.icon
                                    : classes.uncheckedIcon
                                }/>
                            <VerticalAlignCenterRounded 
                                className={
                                    this.props.model.properties.contentVerAlignment == 'center'
                                    ? classes.icon
                                    : classes.uncheckedIcon
                                }
                                onClick={(e) => {
                                    this.onVerticalAlignmentChanged(e, 'center');
                                }}/>
                            <VerticalAlignTopRounded 
                                className={
                                    this.props.model.properties.contentVerAlignment == 'top'
                                    ? classes.icon
                                    : classes.uncheckedIcon
                                }
                                onClick={(e) => {
                                    this.onVerticalAlignmentChanged(e, 'top');
                                }}/>
                        </div>
                    </div>
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

    onHorizontalAlignmentChanged = (e, alignment) => {
        this.props.onChange("contentHorAlignment", alignment);
    }

    onVerticalAlignmentChanged = (e, alignment) => {
        this.props.onChange("contentVerAlignment", alignment);
    }
}

export default withStyles(styles)(GeneralProperties);
