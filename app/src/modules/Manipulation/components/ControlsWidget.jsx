import React from 'react';

import List from '@material-ui/core/List';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import ControlTile from './ControlTile';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
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

    getContent() {
        return (
            <div className={styles.root}>
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
                        />
                    ))
                }
                </List>

            </div>
        );
    }

    getControlsData() {
        return [
            {
                name: "Container",
                desc: "Holds other elements."
            },
            {
                name: "Button",
                desc: "Responsible for intercepting user reactions."
            }, 
            {
                name: "TextBox",
                desc: "Holds text informations."
            },
            {
                name: "Image",
                desc: "Shows static image."
            }
        ];
    }
}

export default ControlsWidget;