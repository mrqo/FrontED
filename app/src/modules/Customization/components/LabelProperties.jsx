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

class LabelProperties extends React.Component {
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
                    Label
                </FormLabel>
                <FormGroup>
                    <TextField 
                        name="genColorNameField"
                        type="color"
                        label="Text color"
                        value={this.props.model.properties.bgColor}
                        className={classes.textField}
                        onChange={this.onBgColorChanged}/>
                    <TextField
                        id="labelTextField"
                        label="Text"
                        onChange={this.onTextChanged}
                        className={classes.textField}/>
                    <TextField
                        id="labelTextSizeTextField"
                        type="number"
                        label="Text size"
                        value={this.props.model.properties.textSize}
                        onChange={this.onTextSizeChanged}
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

    onBgColorChanged = (e) => {
        this.props.onChange("bgColor", e.target.value);
    }
}

export default withStyles(styles)(LabelProperties);
