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
import { Typography } from "@material-ui/core";
import Axios from "axios";
import {backURL} from '../../../constants'
import { Link } from "react-router-dom";
import {APIKey} from '../../../constants'


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    actions: {
        display: 'flex',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    icon:{
        color: "primary"
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
                        <IconButton color="primary"  className={classes.icon}>
                            <InfoIcon  color="primary" component={Link} to={`/eventDetail/${tile._id}`} />
                        </IconButton>}/>
                </GridListTile>
        ))
        
        
        return (
            <Grid>
                <Paper className={classes.root} elevation={1}>
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            <Typography component="div" variant="title" >Local Events</Typography>
                        </GridListTile>
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