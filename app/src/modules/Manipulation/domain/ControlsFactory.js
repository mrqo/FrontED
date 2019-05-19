import React from 'react';

class ControlsFactory extends React.Component {
    controls = { }

    constructor(props) {
        super(props);

        this.controls = this.createControls();
    }

    createControls() {
        return {
            //Container: 
        }
    }
}

export default ControlsFactory;

import Control from './Control';

class ContainerControl extends Control {

}

class TextControl extends Control {

}

//class
