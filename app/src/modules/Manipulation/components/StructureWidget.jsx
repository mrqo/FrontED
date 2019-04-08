import React from 'react';

import List from '@material-ui/core/List';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import TreeNode from './TreeNode';

class StructureWidget extends Widget {
    state = {
        "widgetName": "Structure"
    }

    getContent() {
        return (
            <List dense className="widget-content">
                <TreeNode/>
                <TreeNode/>
                <TreeNode/>
                <TreeNode/>
                <TreeNode/>
                <TreeNode/>
            </List>
        )
    };
}

export default StructureWidget;