import React, { Component } from 'react';
import './Widget.css';

import { SearchIcon } from '../icons/search.png';
require('../icons/search.png');

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
                        {this.state["widgetName"]}
                    </div>
                    <div className="widget-header-btns col">
                        <img src={require('../icons/search.svg')} width="16" height="16" />
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
        return (
            <div className="widget-footer">
                Footer
            </div>
        );
    }
}

export default Widget;