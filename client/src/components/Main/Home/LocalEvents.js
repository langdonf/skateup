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
});



class LocalEvents extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            openMap: false,
            localEvents: [], 
            event: ''

        }

    }
    
   
    componentDidMount(){
        
        
        var id = localStorage.getItem('userId')
        Axios.get(`${backURL}/api/users/${id}`)
			.then(response => {
                
                var home = response.data.data.hometown;
                
                this.handleLocalEvents(home)
			})
        
    }
    handleLocalEvents=(home)=>{
        var ths = this
        Axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${home}&key=${APIKey}`)
			.then(function(response) {
				ths.setState({
					home: {
						lat: response.data.results[0].geometry.location.lat,
						lng: response.data.results[0].geometry.location.lng
					},

					

                });
               
                
                ths.handleRange()
                
				// .catch(function (error) {
				//  
				// }
				// );
            }
            
            );
            
        
    }
    handleRange=()=>{
        var ths = this
        Axios.get(`${backURL}/api/events/local/${this.state.home.lat}/${this.state.home.lng}`)
                .then(response => {
               
                    ths.setState ({
                        localEvents: response.data
                    })
                    
                })
    }

    render(){
        const { classes } = this.props;
        
        let allEvents = this.state.localEvents.map(tile => (
            <GridListTile key={tile.start.lat}>
            <img src={`${backURL}/${tile.photo}`} alt={tile.title} />
                <GridListTileBar id={tile._id}
                    title={tile.title}
                    subtitle={<span>in: {tile.city}</span>}
                    actionIcon={
                <IconButton className={classes.icon}>
                    <InfoIcon   component={Link} to={`/eventDetail/${tile._id}`} />
                </IconButton>
            }
                />
            </GridListTile>
        ))
        
        
        return (
            <Grid item xs={8}>
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
    
LocalEvents.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocalEvents);