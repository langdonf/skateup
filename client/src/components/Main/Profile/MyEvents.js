import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grid from '@material-ui/core/Grid'
import {backURL} from '../../../constants'
import { Typography } from "@material-ui/core";
import Axios from "axios";
import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    margin:{
        margin: theme.spacing.unit * 2,
    }
});

class MyEvents extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            myEvents: []
        }
    }

    componentDidMount(){
        var userId = localStorage.getItem('userId')
        Axios.get(`${backURL}/api/events/user/${userId}`)
        .then((response)=>{
            console.log(response.data);
            var events = response.data.data;
            this.setState({
                myEvents : events
            })
        }).catch(err=>{
            console.log(err.response)
        })
    }

    render(){
        const { classes } = this.props;
        return (
                <Grid item xs={12}>
                    <Paper className={classes.root} elevation={1}>
                        <GridList cellHeight={180} className={classes.gridList}>
                            <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                <Typography component="div" variant="h4" >My Events</Typography>
                            </GridListTile>
                            {this.state.myEvents.map(tile => (
                                <GridListTile key={tile.start.lat}>
                                    <img src={`${backURL}/${tile.photo}`} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        subtitle={<span>in: {tile.city}</span>}
                                        actionIcon={
                                            <Fab
                                            variant="extended"
                                            size="small"
                                            color="primary"
                                            aria-label="Add"
                                            className={classes.margin}
                                            component={Link} to={`/eventDetail/${tile._id}`}
                                        >
                                            <NavigationIcon  className={classes.extendedIcon} />
                                                More Info
                                            </Fab>
                                        }
                                    />
                                </GridListTile>
                            ))}
                    </GridList>
                </Paper>
            </Grid>
        )
    }
}

export default withStyles(styles)(MyEvents);