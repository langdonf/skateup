import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import backURL from '../constants'
import { Typography } from "@material-ui/core";
import Axios from "axios";
import Button from "@material-ui/core/Button";


const style = {paddingTop: 120}
const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 4,
      margin: theme.spacing.unit * 4,
    
    },
    image: {
     
      height:350,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  });

class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            eventDetails: {}, 
        }
    }
   
    componentDidMount(){
   
       let eventId = this.props.match.params.eventId;
       
        Axios.get(`http://localhost:3001/api/events/detail/${eventId}`)
        .then(response => {
           
            this.setState ({
                eventDetails: response.data.data[0]
            })
        })
    }
    delete=()=>{
      let eventId = this.props.match.params.eventId;
      Axios.delete(`http://localhost:3001/api/events/delete/${eventId}`)
        .then(response => {
        window.location="/profile"
        })
    }
    
    
    render(){
        const { classes } = this.props;
        var deets = this.state.eventDetails
       
        var deleteButton = []
        if (window.localStorage.getItem('userId') === deets.owner){
          deleteButton.push(<Button key={0} onClick={this.delete} color="primary" >
          Cancel Event
        </Button>)
        }
        if( Object.entries(this.state.eventDetails).length > 0){
            
            return (
                <div style={style} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item>
           
              <img className={classes.img} src={`${backURL.backURL}${deets.photo}`} alt={deets.title}  />
       
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="h3">
                  {deets.title}
                </Typography>
                <Typography  variant="h5"gutterBottom>{deets.city}  --- Date: {deets.date.substring(0,10)}</Typography>
                <Typography variant="h6" >{deets.details}</Typography>
                <Typography align="right" variant="subtitle1">Hosted by: {deets.owner}</Typography>
                {deleteButton}
              </Grid>
              
            </Grid>
            
          </Grid>
        </Grid>
      </Paper>
    </div>
            );
        }else{
            return(
                <div></div>
            )
        }
        
}
        
    
}
    
Detail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Detail);