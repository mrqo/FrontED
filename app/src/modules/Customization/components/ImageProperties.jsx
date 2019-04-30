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
                    <TextField id="imageSourceTextField" label="Image source" />
                    <TextField id="imageTextTextField" label="Description" />
                </FormGroup>
            </FormControl>
        )
    }
}

export default withStyles(styles)(ImageProperties);
