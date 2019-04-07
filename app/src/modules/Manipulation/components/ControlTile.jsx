import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import { CardActionArea } from '@material-ui/core';

const styles = {
    tile: {
        maxWidth: 100
    }
};

class ControlTile extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.tile}>
                <CardActionArea>
                    {/*<CardMedia
                        component="img"
                        alt="Element image"
                        className={classes.media}
                        width="20"
                        title="Element image"
                    />*/}
                    <CardContent>
                        <Typography component="p">
                            Container
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(ControlTile);