import React from 'react';
import PubSub from 'pubsub-js';
import { topic } from '../../Domain/Enums/PubSubTopics';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import TreeNode from './TreeNode';

class StructureWidget extends Widget {
    state = {
        widgetName: "Structure",
        model: null,
        selectedElement: null
    }

    constructor(props) {
        super(props);
        props.manager.initSubscriptions(this);
    }

    _makeNodes(parent, level) {
        var ret = parent == null ? [] : parent.content.map((child) => {
            return (
                <TreeNode
                    type={child.meta.type}
                    name={child.properties.name}
                    key={child.id + "_" + child.properties.name}
                    selected={this.state.selectedElement === child}
                    level={level}
                    onClick={() => {
                        PubSub.publish(topic.ElemSelectionChanged, {
                            oldSel: null,
                            newSel: child
                        })
                    }}
                    children={this._makeNodes(child, level + 1)}/>
            );  
        });

        //console.log("new parent generated");
        //console.log(ret);
        return ret;
    }

    getContent() {
        var nodes = [];
        if (this.state.model != null) {
            nodes = this.state.model.content.map((child) => {
                return <TreeNode
                    type={child.meta.type}
                    key={child.id + child.meta.type + child.properties.name}
                    name={child.properties.name}
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
            <Paper 
                style={{
                    maxHeight: 320, 
                    height: 320, 
                    overflow: 'auto',
                    background: 'transparent',
                    margin: 10,
                    boxShadow: 0
                }}
                square>
                <List dense className="widget-content">
                    { this._makeNodes(this.state.model, 0) }
                </List>
            </Paper>
        )
    };

    onModelChangedCb(msg, data) {
        this.setState({model: data.model.getRoot()});
    }
    
    onSelectionChangedCb(msg, data) {
        this.setState({
            selectedElement: data.newSel
        });
    }
}

export default StructureWidget;
