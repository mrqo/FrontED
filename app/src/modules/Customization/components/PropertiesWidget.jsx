import React from 'react';

import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';



const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
        width: 220
    },
    switchLabel: {
    }
});

class PropertiesWidget extends Widget {
    state = {
        widgetName: "Properties",
        deriveStyleChecked: true,
    }

    constructor(props) {
        super(props);
    }

    getContent() {
        const { classes } = this.props;

        return (
            <div className="widget-content">
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        General
                    </FormLabel>
                    <FormGroup>
                        <TextField 
                            label="Name"
                            value={this.state.name}
                            className={classes.textField}/>

                        
                        <TextField 
                            label="Alias name"
                            value={this.state.name}
                            className={classes.textField}/>

                        <FormControlLabel
                            control={
                                <Switch 
                                    checked={this.state.deriveStyleChecked}
                                    value="deriveStyleChecked"
                                    className={classes.switch}/>
                            }
                            label={
                            <div 
                                minWidth="200"
                                className={classes.switchLabel}>
                                Inherit styles
                            </div>
                            }
                            labelPlacement="start"/>    
                    </FormGroup>
                </FormControl>
            </div>
        )
    }
}

export default withStyles(styles)(PropertiesWidget);