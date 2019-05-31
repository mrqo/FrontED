import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import Adjust from '@material-ui/icons/Adjust';
import ExpandLess from '@material-ui/icons/ArrowDropDown';
import ExpandMore from '@material-ui/icons/ArrowRight';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';

import Widget from '../../Common/components/Widget';
import '../../Common/components/Widget.css';

const styles = theme => ({
    root: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class TreeNode extends Widget {
    state = {
        expanded: true,
        elementName: "",
        elementClass: "",
        visible: true
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        var textStyle = {
            paddingLeft: '7px'
        }

        return (
            <React.Fragment>
                <ListItem 
                    button
                    dense={true}
                    onClick={() => {
                        this.props.onSelected();
                    }}
                    style={{
                        marginLeft: '4px',
                        paddingLeft: this.props.level * 10,
                        background: this.props.selected ? "#648FFF" : "none"
                    }}>
                    {
                        this.props.children.length > 0
                        ? (
                            this.state.expanded
                            ? <ExpandLess onClick={this.toggleExpanded.bind(this)}/>
                            : <ExpandMore onClick={this.toggleExpanded.bind(this)}/>
                        )
                        : <Adjust style={{ opacity: 0.2 }}/> // to keep the same width for all nodes
                    }
                    <ListItemText
                        inset 
                        style={textStyle}
                        primary={
                        <div>
                            <Typography
                                variant="body2"
                                style={{color: '#192A59', display: 'inline-block'}}>
                                {this.props.type}
                            </Typography>
                            <Typography
                                variant="caption"
                                style={{marginLeft: '5px', color: '#3F5AA6', display: 'inline-block'}}>
                                {this.props.name}
                            </Typography>
                        </div>   
                    } />
                    <ListItemSecondaryAction style={{marginRight:'6px'}}>
                        {
                            this.props.properties.visible
                            ? <Visibility    onClick={this.toggleVisible.bind(this)}/>
                            : <VisibilityOff onClick={this.toggleVisible.bind(this)}/>
                        }
                    </ListItemSecondaryAction>
                </ListItem>
                <Collapse
                    in={this.state.expanded && this.hasChildren()}
                    timeout="auto">
                        <List>
                            {this.props.children}
                        </List>
                </Collapse>
            </React.Fragment>
        );
    }

    hasChildren() {
        return this.props.children.length > 0;
    }

    toggleExpanded() {
        this.setState({expanded: !this.state.expanded});
    }
    
    toggleVisible() {
        this.setState({visible: !this.state.visible}); // TODO: remove from state: 'visible' in state not needed
        this.props.onVisibilityChanged(!this.state.visible);
    }
}

export default TreeNode;
