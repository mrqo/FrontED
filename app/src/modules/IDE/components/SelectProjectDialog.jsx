import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Radio from '@material-ui/core/Radio';

function Row(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
            <ListItemIcon>
              <Radio
                color="default"
                checked={index == 0}
                value={index}
              />
            </ListItemIcon>
            <ListItemText primary={`Project ${index + 1}`} />
        </ListItem>
    );
}

class SelectProjectDialog extends React.Component {
    state = {
        selectedIndex: 0
    }

    render() {
        return (
            <Dialog 
                open={this.props.open}
                onClose={this.props.handleClose}>
                <DialogTitle>Load Project</DialogTitle>
                <DialogContent>
                    <FixedSizeList height={200} width={400} itemSize={35} itemCount={5}>
                        {Row}
                    </FixedSizeList>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button 
                        onClick={(e) => this.props.handleSelect(e, this.state.selectedIndex)} 
                        color="primary">
                        Load
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default SelectProjectDialog;