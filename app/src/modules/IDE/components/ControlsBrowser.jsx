import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import ElementCard from './ElementCard';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    element: {

    }
});

class ControlsBrowser extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <ElementCard/>
                    </Grid>
                    <Grid item xs>
                        <ElementCard/>
                    </Grid>
                    <Grid item xs>
                        <ElementCard/>
                    </Grid>
                    <Grid item xs>
                        <ElementCard/>
                    </Grid>
                    <Grid item xs>
                        <ElementCard/>
                    </Grid>
                    <Grid item xs>
                        <ElementCard/>
                    </Grid>
                    <Grid item xs>
                        <ElementCard/>
                    </Grid>
                    <Grid item xs>
                        <ElementCard/>
                    </Grid>
                </Grid>
            </div>                
        );
    }
}

/*
ControlsBrowser.propTypes = {
    assets: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        sketchName: PropTypes.string.isRequired 
    })).isRequired
};
*/

export default withStyles(styles)(ControlsBrowser);