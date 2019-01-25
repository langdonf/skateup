import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid'
import seed from '../../../data.json'
import { Typography } from "@material-ui/core";
import GoogleMap from 'google-map-react';
import isEmpty from 'lodash.isempty';
import Marker from 'google-map-react'


const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
    const bounds = new maps.LatLngBounds();
  
    places.forEach((place) => {
      bounds.extend(new maps.LatLng(
        place.geometry.location.lat,
        place.geometry.location.lng,
      ));
    });
    return bounds;
  };
  
  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };
  
  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };
class Events extends React.Component{
    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };
    constructor(props){
        super(props)
        this.state = { 
            openMap: false,
            places: [], 
        }
    }
    handleMapOpen = () => {
        this.setState({ openMap: true });
      };
    
      handleMapClose = () => {
        this.setState({ openMap: false });
      };
      componentDidMount() {
        seed.forEach(event => {
            this.state.places.push(event)})}
        
        
      
    
   
    render(){
        const { places } = this.state;
        const { classes } = this.props;
        return (
            <Grid item xs={8}>
                <Paper className={classes.root} elevation={1}>
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            <Typography component="div" variant="title" >Local Events</Typography>
                        </GridListTile>
                        {seed.map(tile => (
                        <GridListTile key={tile.start.lat}>
                        <img src={tile.photo} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}
                                subtitle={<span>in: {tile.hometown}</span>}
                                actionIcon={
                            <IconButton onClick={this.handleMapOpen} className={classes.icon}>
                                <InfoIcon />
                            </IconButton>
                        }
                            />
                        </GridListTile>
                    ))}

                    <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openMap}
                    onClose={this.handleMapClose}
                    >
                    <div  className={classes.paper}>
                    <div style={{ height: '100%', width: '100%' }}>
                    <React.Fragment>
                    {!isEmpty(places) && (
                    <GoogleMap
                    defaultZoom={10}
                    defaultCenter={[34.0522, -118.2437]}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
                    >
                    {places.map(place => (
                    <Marker
                    key={place.id}
                    text={place.title}
                    lat={place.start.lat}
                    lng={place.start.lng}
                    />
                    ))}
                    </GoogleMap>
                    )}
                    </React.Fragment>
                    </div>

                    </div>
                    </Modal>
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