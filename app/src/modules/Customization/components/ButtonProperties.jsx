import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({

});

class ButtonProperties extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl 
                component="fieldset"
                fullWidth="true">
                <FormLabel component="legend">
                    Button
                </FormLabel>
                <FormGroup>
                    <TextField
                        id="buttonTextField"
                        label="Text"/>
					<TextField
                        id="buttonActionTextField"
                        label="Action"/>
                </FormGroup>
            </FormControl>
        )
    }
}

export default withStyles(styles)(ButtonProperties);
