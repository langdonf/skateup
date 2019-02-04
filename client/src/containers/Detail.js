import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import {backURL} from '../constants'
import { Typography } from "@material-ui/core";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import Map from '../components/Main/Map/Map';
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import DateFnsUtils from "@date-io/date-fns";
import Modal from "@material-ui/core/Modal";
import APIKey from '../constants'
import {
	MuiPickersUtilsProvider,
	TimePicker,
	DatePicker
} from "material-ui-pickers";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

var moment = require('moment');
const style = {paddingTop: 120}
const styles = theme => ({
    root: {
		flexGrow: 1,
		},
		image: {
		height:350,
		},
		img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		align: "center"
		},
		paper: {
		position: "absolute",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		margin: theme.spacing.unit * 4,
		outline: "none"
		},
		textField: {
		margin: 10
		}
	});

class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
			open: false,
            eventDetails: {}, 
            title: "",
            city: "",
			details: "",
			disabled: false,
		
            
            }
	}
    onChange = e => {
    	this.setState({ [e.target.id]: e.target.value });
    };
    
    componentDidMount(){
		var user =''
		let eventId = this.props.match.params.eventId;
		Axios.get(`${backURL}/api/events/detail/${eventId}`)
		.then(response => {
			console.log(response);
			user = response.data.data[0].owner;
			
			this.handleUser(user)
			this.setState ({
				eventDetails: response.data.data[0],
				title: response.data.data[0].title,
				city: response.data.data[0].city,
				details: response.data.data[0].details,
				date: response.data.data[0].date,
				selectedDate: response.data.data[0].date,
				attendees: response.data.data[0].participant.length

		})
		if (response.data.data[0].participant.includes(localStorage.getItem('userId'))){
			this.setState({
				disabled: true
			})
		} 
			
		this.handleCityOnLoad()
	})
	
}

    handleUser=(user)=>{
		Axios.get(`${backURL}/api/users/${user}`)
		.then(response => {
			console.log(response);
			this.setState({
			user: response.data.data.username
			})
		}).catch(error=>{
			console.log(error);
		})
		}
	delete=()=>{
		let eventId = this.props.match.params.eventId;
		Axios.delete(`${backURL}/api/events/delete/${eventId}`)
			.then(response => {
			window.location="/profile"
			})
		}
		handleCityOnLoad=()=>{
			var ths = this
			var lat = this.state.eventDetails.start.lat
			var lng = this.state.eventDetails.start.lng
			Axios
			.post(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${APIKey.APIKey}`
			)
			.then(function(response) {
				console.log(response);
				ths.setState({
				startName: response.data.results[0].formatted_address
				});
				// .catch(function (error) {
				//   console.log(error);
				// }
				// );
			});  
		}
	
		handleEditOpen = () => {
			var ths = this
			var lat = this.state.eventDetails.start.lat
			var lng = this.state.eventDetails.start.lng
			Axios
			.post(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${APIKey.APIKey}`
			)
			.then(function(response) {
				console.log(response);
				ths.setState({
				startName: response.data.results[0].formatted_address
				});
				// .catch(function (error) {
				//   console.log(error);
				// }
				// );
			});  
			this.setState({ openEdit: true });
			};
		
			handleEditClose = () => {
			this.setState({ openEdit: false });
		};
		
	edit=()=>{
		let toSend = {
                "title": this.state.title,
                "details": this.state.details,
				"city": this.state.city,
				"start": {lat: this.state.eventDetails.start.lat,
					lng: this.state.eventDetails.start.lng},
				"date": this.state.selectedDate
		}
		let eventId = this.props.match.params.eventId
		
		Axios.post(`${backURL}/api/events/edit/${eventId}`, toSend).then( response => {
			window.location=`/profile`
		}
			
		)
	}
	handleClickOpen = () => {
		this.setState({ open: true });
	  };
	
	  handleClose = () => {
		this.setState({ open: false });
		
	  };
	  handleCloseYes= () => {
		this.setState({ open: false });
		this.delete()
	  };
	 
	
	handleAttend=()=>{
		
		var eventId = this.props.match.params.eventId
		var userId = localStorage.getItem('userId');
		Axios.post(`${backURL}/api/events/attend/${userId}/${eventId}`).then(response => {
			
			
			
		}).then(
			this.setState({
				disabled: true,
				attendees: this.state.attendees +1
			})
		)
	}
	handleCity = e => {
		var ths = this;
		Axios
			.post(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${
					e.target.value
				}&key=${APIKey.APIKey}`
			)
			.then(function(response) {
				console.log(response);
				ths.setState({
					
					city: response.data.results[0].formatted_address

					

				});
				// .catch(function (error) {
				//   console.log(error);
				// }
				// );
			});
	};
	handleDateChange = date => {
		this.setState({ selectedDate: date });
	};
	

    handleMaps = e => {
		var ths = this;
		Axios
			.post(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${
				e.target.value
			}&key=${APIKey.APIKey}`
			)
			.then(function(response) {
			console.log(response);
			ths.setState({
				eventDetails: {
					start: {
				lat: response.data.results[0].geometry.location.lat,
				lng: response.data.results[0].geometry.location.lng
				}},
				formatted: response.data.results[0].formatted_address
	
            

			})
			// .catch(function (error) {
			//   console.log(error);
			// }
			// );
		});
    };
    
    
    render(){
		const { selectedDate } = this.state;
        const { classes } = this.props;
        var start = this.state.startName
        var deets = this.state.eventDetails
        var deleteButton = []
        if (window.localStorage.getItem('userId') === deets.owner){
			deleteButton.push(<Button key={0}  onClick={this.handleClickOpen} color="primary" > 
			Cancel Event
			</Button>, <Button key={1} onClick={this.handleEditOpen} color="primary" > 
			Edit Event Details
        </Button>)
        }
        if( Object.entries(this.state.eventDetails).length > 0){
            
            return (
<div style={style} className={classes.root}>
<Paper className={classes.paper}>
	<Grid container spacing={16}>
		<Grid item xs={8}>
			<Typography align="center" gutterBottom variant="h3">
			{deets.title}
			</Typography> 
			<img className={classes.img} src={`${backURL}/${deets.photo}`} alt={deets.title}  />
		</Grid>
		<Grid item xs={4}>
			
				<Typography variant="h5" gutterBottom>
					In {deets.city} on 
					<br/>
					{moment(deets.date).format("dddd, MMM Do hh:mm A")}
				</Typography>
				
				<Typography variant="body1" >
					{deets.details}
				</Typography>
				
				<Typography align="right" variant="subtitle1">
					Hosted by: {this.state.user}
				</Typography>
				<Typography align="left" variant="subtitle1">
				Attending: {this.state.attendees} 
				</Typography>
				
				
				{deleteButton}
				
				<Button 
					justify="flex-end" 
					key={4} 
					onClick={this.handleAttend} 
					color="primary" 
					disabled={this.state.disabled}
					>Attend Event
				</Button>
				
			
		</Grid>
			<Grid item xs container direction="column" spacing={16}>
				


			</Grid>
			<Map
			id="myMap"
			options={{
			center: { lat: this.state.eventDetails.start.lat, lng: this.state.eventDetails.start.lng },
			zoom: 16
			}}
			onMapLoad={map => {
				var icon = {
					scaledSize: new window.google.maps.Size(50, 50),
					url: 'https://i.imgur.com/X49fAci.png',

				}
			var marker = new window.google.maps.Marker({
				icon: icon,
				animation: window.google.maps.Animation.BOUNCE,
				
				position: { lat:this.state.eventDetails.start.lat, lng:this.state.eventDetails.start.lng  },
				map: map,
				title: deets.title
				});
				}}
			/>
		
	</Grid>
</Paper>
<Modal
aria-labelledby="simple-modal-title"
aria-describedby="simple-modal-description"
open={this.state.openEdit}
onClose={this.handleEditClose}

>
<div
style={{ alignItems: "center", justifyContent: "center" }}
className={classes.paper}
>
<MuiPickersUtilsProvider utils={DateFnsUtils}>
<form
encType="multipart/form-data"
className={classes.container}
autoComplete="on"
>
<TextField
id="title"
label="Event Title"
className={classes.textField}
onChange={this.onChange}
required
margin="normal"
defaultValue={this.state.eventDetails.title}
variant="outlined"
fullWidth={true}
/>

<TextField
id="city"
label="City"
required
className={classes.textField}
onChange={this.onChange}
onBlur={this.handleCity}
defaultValue={this.state.eventDetails.city}
type="text"
variant="outlined"
fullWidth={true}
helperText={this.state.city}
/>

<TextField
id="startPoint"
label="Start Address"
required
className={classes.textField}
onBlur={this.handleMaps}
defaultValue={this.state.startName}
type="text"
variant="outlined"
fullWidth={true}
helperText={this.state.formatted}
/>


<TextField
id="details"
label="Details"
multiline
required
rowsMax="8"
onChange={this.onChange}
defaultValue={this.state.eventDetails.details}
className={classes.textField}
margin="normal"
fullWidth={true}
/>
<Grid
container
className={classes.grid}
justify="space-around"
>
<DatePicker
margin="normal"
label="Date picker"
value={selectedDate}
onChange={this.handleDateChange}
/>
<TimePicker
margin="normal"
label="Time picker"
value={selectedDate}
onChange={this.handleDateChange}
/>
</Grid>


<Divider style={{ margin: "20px 0" }} />
<Button
variant="raised"
color="primary"
onClick={this.edit}
>
Submit
</Button>
</form>
</MuiPickersUtilsProvider>
</div>
</Modal>
<div>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
		  aria-describedby="alert-dialog-description"
		  maxWidth="xs"
        >
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to cancel? {this.state.attendees} people will be disapointed. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleCloseYes} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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