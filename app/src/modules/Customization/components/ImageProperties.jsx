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
});

class ImageProperties extends React.Component {
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
                    Image
                </FormLabel>
                <FormGroup>
                    <TextField 
                        id="imageSourceTextField"
                        type="file"
                        onChange={this.onSourceChanged}
                        label="Image source" />
                    <TextField 
                        id="imageTextTextField" 
                        onChange={this.onDescriptionChanged}
                        label="Description" />
                </FormGroup>
            </FormControl>
        )
    }
    
    onSourceChanged = (e) => {
        //TODO: test if it works
        this.props.onChange("source", e.target.files[0]);
    }
    onDescriptionChanged = (e) => {
        //TODO: test if it works
        // <img alt=description>
        this.props.onChange("description", e.target.value);
        console.log(this.props.model.properties.image);
    }
}

export default withStyles(styles)(ImageProperties);
