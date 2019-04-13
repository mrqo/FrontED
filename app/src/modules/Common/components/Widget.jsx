import React, { Component } from 'react';
import './Widget.css';

import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import { SearchIcon } from '../icons/search.png';
require('../icons/search.png');

const styles = theme => ({
    button: {
    }
});

class Widget extends React.Component {
    state = {
        "widgetName": "Widget"
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="widget">
                {this.getHeader()}
                {this.getContent()}
                {this.getFooter()}
            </div>
        )
    }

    getHeader() {
        return (
            <div className="widget-header container">
                <div className="row justify-content-around">
                    <div className="widget-header-title col">
                        {this.state.widgetName}
                    </div>
                    <div className="widget-header-btns col">
                        <IconButton 
                            iconStyle={{ width: '24px', height: '24px' }}
                            style={{ width: '34px', height: '34px', padding: '0px'}}
                            size="small"
                            color="white">
                            <Icon>search</Icon>
                        </IconButton>
                        <IconButton 
                            iconStyle={{ width: '24px', height: '24px' }}
                            style={{ width: '34px', height: '34px', padding: '0px'}}
                            size="small"
                            color="white">
                            <Icon>clear_all</Icon>
                        </IconButton>
                    </div>
                </div>

            </div>
        );
    }

    getContent() {
        return (
            <div className="widget-content">
                Some content.
            </div>
        );
    }

    getFooter() {
        const { classes } = this.props;

        return (
            <div className="widget-footer">
                
            </div>
        );
    }
}

//export default withStyles(styles)(Widget);
export default Widget;