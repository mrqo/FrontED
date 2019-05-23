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
                fullWidth="true"
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
                        className={classes.textField}/>
                    <TextField
                        id="buttonTextSizeTextField"
                        type="number"
                        label="Text size"
                        value={this.props.model.properties.textSize}
                        onChange={this.onTextSizeChanged}
                        className={classes.textField}/>
                    <TextField 
                        name="buttonTextColorNameField"
                        type="color"
                        label="Text color"
                        value={this.props.TextColor}
                        className={classes.textField}
                        onChange={this.onTextColorChanged}/>

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
                            style = {{width: "45%", marginLeft: "10%"}}/>
                    </div>
                    
                    <TextField 
                        name="genColorNameField"
                        type="color"
                        label="Border color"
                        value={this.props.model.properties.borderColor}
                        className={classes.textField}
                        onChange={this.onBorderColorChanged}/>


				            <TextField
                        id="buttonActionTextField"
                        label="Action"
                        className={classes.textField}/>

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

    onStrokeWidthChanged = (e) => {
        var val = parseInt(e.target.value);
        if (!isNaN(val)) 
        {  
            this.props.onChange("strokeWidth", val);
        } else
        {
            this.props.onChange("strokeWidth", e.target.value);
        }
    }

    onBorderRadiusChanged = (e) => {
        var val = parseInt(e.target.value);
        if (!isNaN(val)) 
        {  
            this.props.onChange("borderRadius", val);
        } else
        {
            this.props.onChange("borderRadius", e.target.value);
        }
    }
}

export default withStyles(styles)(ButtonProperties);
