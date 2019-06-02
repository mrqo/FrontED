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

class ContentProperties extends React.Component {
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
                    Content
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
}

export default withStyles(styles)(ContentProperties);
