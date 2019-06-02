import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { FormGroup, TextField } from '@material-ui/core';


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

class ImageProperties extends React.Component {
    //constructor(props) { super(props); }

    render() {
        const { classes } = this.props;

        return (
            <FormControl 
                component="fieldset"
                fullWidth={true}
                className={classes.container}>
                <FormLabel component="legend">
                    Image
                </FormLabel>
                <FormGroup>
                    <TextField 
                        className={classes.textField}
                        onChange={this.onSourceChanged}
                        value={this.props.model.properties.src}
                        label="Source"
                        InputProps={{
                            classes: {
                                input: classes.textFieldContent
                            }
                        }}/>
                </FormGroup>
            </FormControl>
        )
    }
    
    onSourceChanged = (e) => {
        this.props.onChange("src", e.target.value);
    }
}

export default withStyles(styles)(ImageProperties);
