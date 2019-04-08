import React from 'react';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

class PropertiesWidget extends Widget {
    state = {
        widgetName: "Properties"
    }

    constructor(props) {
        super(props);
    }

    getContent() {
        return (
            <div className="widget-content">
            </div>
        )
    }
}

export default PropertiesWidget;