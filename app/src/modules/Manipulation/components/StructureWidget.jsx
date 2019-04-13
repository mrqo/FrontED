import React from 'react';
import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';

import List from '@material-ui/core/List';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import TreeNode from './TreeNode';

class StructureWidget extends Widget {
    state = {
        widgetName: "Structure",
        model: null,
    }

    constructor(props) {
        super(props);

        this._modelChangedEventToken = PubSub.subscribe(topic.ModelChanged, this.onModelChanged.bind(this));
    }

    getContent() {
        var nodes = [];
        if (this.state.model != null) {
            nodes = this.state.model.content.map((child) => {
                return <TreeNode
                    type={child.meta.type}
                    name={child.name}
                    onClick={() => {
                        PubSub.publish(topic.ElemSelectionChanged, {
                            oldSel: null,
                            newSel: child
                        })
                    }}/>
                }
            );
        }

        return (
            <List dense className="widget-content">
                { nodes }
            </List>
        )
    };

    onModelChanged(msg, data) {
        console.log(data.model);
        this.setState({model: data.model});
    }
}

export default StructureWidget;