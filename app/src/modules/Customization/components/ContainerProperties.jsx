import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import { ContainerLayoutType } from '../../Domain/Enums/ContainerLayoutTypes';


const styles = theme => ({
    container: {
        marginTop: 15,
    },
    textFieldContent: {
        fontSize: 14
    }
});

class ContainerProperties extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <FormControl
                component="fieldset"
                className={classes.container}
                fullWidth>
                <FormLabel component="legend">
                    Container
                </FormLabel>
                <FormGroup>
                    <Typography 
                        style={{width: "100%"}} 
                        variant="caption" 
                        display="block" 
                        gutterBottom>
                        Type
                    </Typography>
                    <Select
                        onChange={this.onTypeChanged}
                        value={this.props.model.properties.layoutType || ''}>
                        {
                            Object.keys(ContainerLayoutType).map(key => (
                                <MenuItem key={key} value={key}>
                                    {key}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormGroup>
            </FormControl>
        )
    }

    onTypeChanged = (e) => {
        this.props.onChange("layoutType", e.target.value);
    }

}

export default withStyles(styles)(ContainerProperties);
