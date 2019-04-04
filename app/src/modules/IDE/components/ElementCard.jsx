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
    card: {
        maxWidth: 345
    },
    media: {

    }
};

class ElementCard extends React.Component {
    render() {
        const { classes } = this.props;

        return(
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Element image"
                        className={classes.media}
                        src="https://static.vecteezy.com/system/resources/previews/000/205/944/non_2x/beach-resort-landscape-vector.jpg"
                        width="140"
                        title="Element image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Container
                        </Typography>
                        <Typography component="p">
                            Container holds other elements inside. It corresponds to div in html.
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn more
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(ElementCard);