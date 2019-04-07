import React from 'react';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

import ControlTile from './ControlTile';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
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
                <GridList 
                    cellHeight={75}
                    className={styles.gridList}
                    cols={3}
                >
                    <GridListTile>
                        <ControlTile/>
                    </GridListTile>
                    <GridListTile>
                        <ControlTile/>
                    </GridListTile>
                    <GridListTile>
                        <ControlTile/>
                    </GridListTile>
                    <GridListTile>
                        <ControlTile/>
                    </GridListTile>
                </GridList>

            </div>
        );
    }
}

export default ControlsWidget;