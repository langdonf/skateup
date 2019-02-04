import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Grid from '@material-ui/core/Grid'
import { Typography } from "@material-ui/core";
import Axios from "axios";
import {backURL} from '../../../constants'
import { Link } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation'
import Divider from '@material-ui/core/Divider'
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginLeft: theme.spacing.unit * 1,
        marginRight:theme.spacing.unit * 1
    },
    actions: {
        display: 'flex',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 120,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    icon:{
        color: "white"
    },
    margin:{
        margin: theme.spacing.unit * 2,
    }
    
});

class Events extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            openMap: false,
            events: [], 
            event: ''
        }
    }

    componentDidMount(){
        
        Axios.get(`${backURL}/api/events/all`)
        .then(response => {
            
            this.setState ({
                events: response.data
            })
        })
    }

    render(){
        const { classes } = this.props;
        let allEvents = this.state.events.map(tile => (
            <GridListTile key={tile.start.lat}>
            <img src={`${backURL}/${tile.photo}`} alt={tile.title} />
                <GridListTileBar id={tile._id}
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
        ))
        
        
        return (
            <Grid className={classes.root}>
                <Paper className={classes.root} elevation={1}>
                <Typography component="div" color="secondary" variant="h4" >Featured SkateUp Events</Typography>
                <Divider style={{ margin: '10px 0' }}/>
                    <GridList cellHeight={250} cols={2} className={classes.gridList}>
                    
                        {allEvents}

                    
                    </GridList>
                </Paper>

            </Grid>
    );
}
        
    
}
    
Events.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Events);