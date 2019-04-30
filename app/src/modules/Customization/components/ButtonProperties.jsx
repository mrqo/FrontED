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
                        onChange={this.props.onChange}
                        className={classes.textField}/>
					<TextField
                        id="buttonActionTextField"
                        label="Action"
                        className={classes.textField}/>
                </FormGroup>
            </FormControl>
        )
    }
}

export default withStyles(styles)(ButtonProperties);
