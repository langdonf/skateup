import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid'
import seed from '../../../data.json'
import { Typography } from "@material-ui/core";


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});


                
class MyEvents extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myEvents: []
        }
    }
    render(){
    const { classes } = this.props;

    return (
            <Grid item xs={8}>
                <Paper className={classes.root} elevation={1}>
                <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                <Typography component="div" variant="title" >My Events</Typography>
                </GridListTile>
                {this.state.myEvents.map(tile => (
                <GridListTile key={tile.start.lat}>
                    <img src={tile.photo} alt={tile.title} />
                    <GridListTileBar
                    title={tile.title}
                    subtitle={<span>in: {tile.hometown}</span>}
                    actionIcon={
                        <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
                </Paper>
            </Grid>
    );
}
}

export default withStyles(styles)(MyEvents);