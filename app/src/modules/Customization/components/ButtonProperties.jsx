import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    container: {
        marginTop: 15,
    },
    textField: {
        marginTop: 10,
    },
    textFieldContent: {
        fontSize: 14
    }
});

class ButtonProperties extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <FormControl
                component="fieldset"
                fullWidth={true}
                className={classes.container}>
                <FormLabel component="legend">
                    Button
                </FormLabel>
                <FormGroup>
                    <TextField
                        id="buttonTextField"
                        label="Text"
                        value={this.props.model.properties.text}
                        onChange={this.onTextChanged}
                        className={classes.textField}
                        InputProps={{
                            classes: {
                                input: classes.textFieldContent
                            }
                        }}/>

                    <div>
                        <TextField
                            id="buttonTextSizeTextField"
                            type="number"
                            label="Font size"
                            value={this.props.model.properties.textSize}
                            onChange={this.onTextSizeChanged}
                            className={classes.textField}
                            style = {{width: "45%"}}
                            InputProps={{
                                classes: {
                                    input: classes.textFieldContent
                                }
                            }}/>

                        <TextField 
                            name="buttonTextColorNameField"
                            type="color"
                            label="Foreground color"
                            value={this.props.model.properties.textColor}
                            className={classes.textField}
                            onChange={this.onTextColorChanged}
                            style = {{width: "45%", marginLeft: "10%"}}/>
                    </div>


                    <div>
                        <TextField 
                            name="genColorNameField"
                            type="color"
                            label="Background color"
                            value={this.props.model.properties.bgColor}
                            className={classes.textField}
                            onChange={this.onBgColorChanged}
                            style = {{width: "45%"}}/>

                        <TextField
                            name="genColorNameField"
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

    onTextChanged = (e) => {
        this.props.onChange("text", e.target.value);
    }

    onTextSizeChanged = (e) => {
        this.props.onChange("textSize", e.target.value);
    }

    onTextColorChanged = (e) => {
        this.props.onChange("textColor", e.target.value);
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

export default withStyles(styles)(ButtonProperties);
