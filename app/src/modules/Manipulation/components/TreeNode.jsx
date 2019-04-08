import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

const styles = theme => ({

});

class TreeNode extends Widget {
    state = {
        expanded: false,
        elementName: "",
        elementClass: "",
        isVisible: true,
        childs: [{name: "hehe1"}]
    };

    constructor(props) {
        super(props);
    }

    render() {
        var textStyle = {
            padding: '0px'
        }

        var listItem = (
            <ListItem 
                button
                dense={true}>
                {this.state.expanded 
                    ? <ExpandLess/> 
                    : <ExpandMore/>}
                <ListItemText
                    inset 
                    style={textStyle}
                    primary={
                    <div>
                        <Typography
                            variant="body2"
                            style={{color: '#192A59', display: 'inline-block'}}
                            >
                            Container
                        </Typography>
                        <Typography
                            variant="caption"
                            style={{marginLeft: '5px', color: '#3F5AA6', display: 'inline-block'}}
                            >
                            MainCont
                        </Typography>
                    </div>   
                } />
                <ListItemSecondaryAction>
                    <Checkbox/>
                </ListItemSecondaryAction>
            </ListItem>
        );

        if (this.hasChildren()) {
            return (
            <Collapse 
                in={this.state.isVisible}
                timeout="auto"
                unmountOnExit>
                {listItem}
            </Collapse>
            );
        }
        return listItem;
    }

    hasChildren() {
        return this.state.childs.length > 0;
    }
}

export default TreeNode;