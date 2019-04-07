import React from 'react';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

class StructureWidget extends Widget {
    state = {
        "widgetName": "Structure"
    }

    getContent() {
        return (
            <div className="widget-content">
                Structure widget.
            </div>
        )
    };
}

export default StructureWidget;