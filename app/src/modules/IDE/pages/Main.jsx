import React, { Component } from 'react';
import ControlsBrowser from '../components/ControlsBrowser';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardPrimaryContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionButtons from '@material-ui/core/CardActions'; 
import CardActionIcons from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MaterialIcon from '@material-ui/core/Icon';
import Headline6 from '@material-ui/core/Typography';
import Subtitle2 from '@material-ui/core/Typography';
import Body2 from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        
        /*
        return (
            <div>
                <Card className='mdc-card demo-card demo-basic-with-header'>
                    <div className='demo-card__primary'>
                        <Headline6 className='demo-card__title'>
                            Our Changing Planet
                        </Headline6>
                        <Subtitle2 className='demo-card__subtitle'>
                            by Kurt Wagner
                        </Subtitle2>
                    </div>
                    <CardPrimaryContent className='demo-card__primary-action'>
                        <CardMedia wide image={"http://img1.coastalliving.timeinc.net/sites/default/files/styles/4_3_horizontal_inbody_900x506/public/image/2018/05/main/stewart-beach-galveston-island-texas-632172305_0.jpg?itok=gy5oUGK0&1527023607"} className='demo-card__media' />
                    <Body2 className='demo-card__secondary'>
                        Visit ten places on our planet that are undergoing the biggest changes today.
                    </Body2>
                    </CardPrimaryContent>
                    <CardActions>
                        <CardActionButtons>
                        <Button>Read</Button>
                        <Button>Bookmark</Button>
                        </CardActionButtons>
                        <CardActionIcons>
                        <IconButton>
                            <MaterialIcon icon='favorite_border' />
                        </IconButton>
                        <IconButton>
                            <MaterialIcon icon='share' />
                        </IconButton>
                        <IconButton>
                            <MaterialIcon icon='more_vert' />
                        </IconButton>
                        </CardActionIcons>
                    </CardActions>
                </Card>
            </div>
        );
        */
       return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                be
                {bull}
                nev
                {bull}o{bull}
                lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                adjective
                </Typography>
                <Typography component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
       );
    }

    getAssets() {
        return ([
            {
                key: "div",
                name: "Div",
                url: "",
                sketchName: "div-sketch"
            },
            {
                key: "p",
                name: "Paragraph",
                url: "",
                sketchName: "p-sketch"
            }
        ]);
    }
}

export default withStyles(styles)(Main);