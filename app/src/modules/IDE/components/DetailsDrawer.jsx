import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

function DetailsDrawer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Divider />
            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="age-label-placeholder">
                    Age
                </InputLabel>
                <Select
                    value={12}
                    input={<Input name="age" id="age-label-placeholder" />}
                    displayEmpty
                    name="age"
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Label + placeholder</FormHelperText>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="age-label-placeholder">
                    Age
                </InputLabel>
                <Select
                    value={12}
                    input={<Input name="age" id="age-label-placeholder" />}
                    displayEmpty
                    name="age"
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Label + placeholder</FormHelperText>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  value="antoine"
                />
              }
              label="Antoine Llorca"
              className={classes.formControl}
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="antoine"
                />
              }
              label="Antoine Llorca"
              className={classes.formControl}
            />

            <FormControlLabel
              control={
                <Checkbox
                  value="antoine"
                />
              }
              label="Antoine Llorca"
              className={classes.formControl}
            />
        <Divider />
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(DetailsDrawer);