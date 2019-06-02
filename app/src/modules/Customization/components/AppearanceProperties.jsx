import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';

import { withStyles } from '@material-ui/core';

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
    },
    textFieldContent: {
        fontSize: 14
    }
});

class AppearanceProperties extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <FormControl
                component="fieldset"
                fullWidth
                className={classes.container}>
                <FormLabel component="legend">
                    Appearance
                </FormLabel>
                <FormGroup>
                <div>
                        <TextField 
                            type="color"
                            label="Background color"
                            value={this.props.model.properties.bgColor}
                            className={classes.textField}
                            onChange={this.onBgColorChanged}
                            style = {{width: "45%"}}/>

                        <TextField
                            type="color"
                            label="Border color"
                            value={this.props.model.properties.borderColor}
                            className={classes.textField}
                            onChange={this.onBorderColorChanged}
                            style = {{width: "45%", marginLeft: "10%"}}/>
                    </div>


                    <div>
                        <TextField
                            label="Border width"
                            type="number"
                            value={this.props.model.properties.strokeWidth}
                            className={classes.textField}
                            onChange={this.onStrokeWidthChanged}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                classes: {
                                    input: classes.textFieldContent
                                }
                            }}
                            style = {{width: "45%"}}/>

                        <TextField
                            label="Border radius"
                            type="number"
                            value={this.props.model.properties.borderRadius}
                            className={classes.textField}
                            onChange={this.onBorderRadiusChanged}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                classes: {
                                    input: classes.textFieldContent
                                }
                            }}
                            style = {{width: "45%", marginLeft: "10%"}}/>
                    </div>
                    
                    <div>
                        <TextField
                            label="Shadow blur"
                            type="number"
                            value={this.props.model.properties.shadowBlur}
                            onChange={this.onShadowBlurChanged}
                            className={classes.textField}
                            style = {{width: "45%"}}
                            InputProps={{
                                classes: {
                                    input: classes.textFieldContent
                                }
                            }}/>

                        <TextField
                            type="color"
                            label="Shadow color"
                            value={this.props.model.properties.shadowColor}
                            className={classes.textField}
                            onChange={this.onShadowColorChanged}
                            style = {{width: "45%", marginLeft: "10%"}}/>
                    </div>

                    <div>
                        <TextField
                            label="Shadow X"
                            type="number"
                            value={this.props.model.properties.shadowOffsetX}
                            className={classes.textField}
                            onChange={this.onShadowXChanged}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                classes: {
                                    input: classes.textFieldContent
                                }
                            }}
                            style = {{width: "45%"}}/>

                        <TextField
                            label="Shadow Y"
                            type="number"
                            value={this.props.model.properties.shadowOffsetY}
                            className={classes.textField}
                            onChange={this.onShadowYChanged}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                classes: {
                                    input: classes.textFieldContent
                                }
                            }}
                            style = {{width: "45%", marginLeft: "10%"}}/>
                    </div>
                </FormGroup>
            </FormControl>
        )
    }

    
    onBorderColorChanged = (e) => {
        this.props.onChange("borderColor", e.target.value);
    }

    onBgColorChanged = (e) => {
        this.props.onChange("bgColor", e.target.value);
    }

    onStrokeWidthChanged = (e) => {
        this.props.onChange("strokeWidth", parseInt(e.target.value));
    }

    onBorderRadiusChanged = (e) => {
        this.props.onChange("borderRadius", parseInt(e.target.value));
    }

    onShadowBlurChanged = (e) => {
        this.props.onChange("shadowBlur", parseInt(e.target.value));
    }
    
    onShadowColorChanged = (e) => {
        this.props.onChange("shadowColor", e.target.value);
    }

    onShadowXChanged = (e) => {
        this.props.onChange("shadowOffsetX", parseInt(e.target.value));
    }

    onShadowYChanged = (e) => {
        this.props.onChange("shadowOffsetY", parseInt(e.target.value));
    }
}

export default withStyles(styles)(AppearanceProperties);