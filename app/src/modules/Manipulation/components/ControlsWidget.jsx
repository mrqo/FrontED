import React from 'react';
import PubSub from 'pubsub-js';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import ControlTile from './ControlTile';

import { elementType } from '../../Domain/Enums/Elements';
import { topic } from '../../Domain/Enums/PubSubTopics';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        width: 400,
        height: 350
    }
});

class ControlsWidget extends Widget {
    state = {
        "widgetName": "Controls"
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    getContent() {
        return (
            <Paper 
                className={styles.root}
                style={{maxHeight: 340, overflow: 'auto'}}>
                <List
                    dense 
                    cellHeight={75}
                    className={styles.gridList}
                    cols={1}
                > {
                    this.getControlsData().map(controlData => (
                        <ControlTile 
                            title={controlData.name}
                            description={controlData.desc}
                            onClick={() => {
                                this.handleClick(controlData.type);
                            }}
                        />
                    ))
                }
                </List>
            </Paper>
        );
    }

    getControlsData() {
        return [
            {
                name: "Container",
                desc: "Holds other elements.",
                type: elementType.Container
            },
            {
                name: "Button",
                desc: "Responsible for intercepting user reactions.",
                type: elementType.Button
            }, 
            {
                name: "Label",
                desc: "Holds text informations.",
                type: elementType.Label
            },
            {
                name: "Image",
                desc: "Shows static image.",
                type: elementType.Image
            },
            {
                name: "Image",
                desc: "Shows static image.",
                type: elementType.Image
            },
            {
                name: "Image",
                desc: "Shows static image.",
                type: elementType.Image
            },
            {
                name: "Image",
                desc: "Shows static image.",
                type: elementType.Image
            },
            {
                name: "Image",
                desc: "Shows static image.",
                type: elementType.Image
            }
        ];
    }

    handleClick(elemType) {
        console.log("Handle element creation of " + elemType);
        PubSub.publish(topic.ElemCreationRequested, {
            type: elemType
        });
    }
}

export default ControlsWidget;