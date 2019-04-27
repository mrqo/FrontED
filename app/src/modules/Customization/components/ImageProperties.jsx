import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { FormGroup, TextField } from '@material-ui/core';


const styles = theme => ({

});

class ImageProperties extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl 
                component="fieldset"
                fullWidth="true">
                <FormLabel component="legend">
                    Image
                </FormLabel>
                <FormGroup>
                    <TextField id="imageSourceTextField" label="Image source" />
                    <TextField id="imageTextTextField" label="Description" />
                </FormGroup>
            </FormControl>
        )
    }
}

export default withStyles(styles)(ImageProperties);
