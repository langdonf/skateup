import React from "react";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import RegModal from "../Auth/Register";
import LogModal from "../Auth/Login";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import DateFnsUtils from "@date-io/date-fns";
import {
	MuiPickersUtilsProvider,
	TimePicker,
	DatePicker
} from "material-ui-pickers";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import APIKey from '../../constants'

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	paper: {
		position: "absolute",
		top: "20%",
		right: "40%",
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: "none"
	},
	textField: {
		margin: 10
	}
});

class Nav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDate: new Date("2019-04-20T16:20:00"),
			isLoggedIn: false,
			openReg: false,
			openLog: false,
			openCre: false,
			title: "",
			city: "",
			details: "",
			startPoint: {
				lat: "",
				lng: ""
			},
			file: null
		};
	}
	
	createEvent = (event) => {
		let formData = new FormData()
		console.log(this.state.file); 
		formData.append("title", this.state.title)
		
		formData.append("details",this.state.details)
		formData.append("city", this.state.city)
		formData.append("startLat", this.state.startPoint.lat)
		formData.append("startLng", this.state.startPoint.lng)
		formData.append("date", this.state.selectedDate)
		formData.append("photo", this.state.file)
		formData.append("userId", localStorage.getItem("userId"))
		for (var key of formData.entries()) {
			console.log(key[0] + ', ' + key[1])
		}

		axios
			.post("http://localhost:3001/api/events/newevent", formData)
			.then(function(response) {
				console.log(response);
				window.location ='/home'
			})
			.catch(function(error) {
				console.log(error);
			});
		
	};
	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};
	handleDateChange = date => {
		this.setState({ selectedDate: date });
	};
	handleStateChange = loggedIn => {
		this.setState({
			isLoggedIn: loggedIn
		});
		this.props.login(this.state.isLoggedin);
	};
	handleClose = () => {
		this.setState({ openReg: false, openLog: false });
	};

	handleCreateOpen = () => {
		this.setState({ openCre: true });
	};

	handleCreateClose = () => {
		this.setState({ openCre: false });
	};

	handleRegOpen = () => {
		console.log("this");
		this.setState({ openReg: true });
	};
	handleLogOpen = () => {
		console.log("this");
		this.setState({ openLog: true });
	};

	handleLogOut = () => {
		this.setState({
			isLoggedIn: false
		});
		console.log(localStorage);
		localStorage.clear();
		window.location = "/";
	};
	onFileUpload=(e)=>{
		this.setState({
			file:e.target.files[0]
		})
	}
	handleCity = e => {
		var ths = this;
		axios
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
	
	handleFuckMaps = e => {
		var ths = this;
		axios
			.post(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${
					e.target.value
				}&key=${APIKey.APIKey}`
			)
			.then(function(response) {
				console.log(response);
				ths.setState({
					startPoint: {
						lat: response.data.results[0].geometry.location.lat,
						lng: response.data.results[0].geometry.location.lng
					},
					formatted: response.data.results[0].formatted_address

					

				});
				// .catch(function (error) {
				//   console.log(error);
				// }
				// );
			});
	};

	render() {
		const { classes } = this.props;
		const { selectedDate } = this.state;
		let navBarItems = [
			<Button key={0} color="inherit" component={Link} to="/home">
				Browse Events
			</Button>
		];
		if (window.localStorage.length > 0) {
			navBarItems.push(
				<Button key={5} color="inherit" onClick={this.handleCreateOpen}>
					Create an Event
				</Button>,
				<Button key={1} color="inherit" onClick={this.handleLogOut}>
					Logout
				</Button>,
				<Button key={4} color="inherit" component={Link} to="/profile">
					Profile
				</Button>
			);
		} else {
			navBarItems.push(
				<Button key={2} color="inherit" onClick={this.handleLogOpen}>
					Login
				</Button>
			);
			navBarItems.push(
				<Button key={3} color="inherit" onClick={this.handleRegOpen}>
					SignUp
				</Button>
			);
		}
		return (
			<div className={classes.root}>
				<AppBar position="static" style={{ position: "fixed", top: 0 }}>
					<Toolbar>
						<IconButton
							className={classes.menuButton}
							color="inherit"
							aria-label="Menu"
						>
							<MenuIcon />
						</IconButton>
						<Typography
							component={Link}
							to="/"
							variant="h6"
							color="inherit"
							className={classes.grow}
						>
							SkateUp
						</Typography>
						{navBarItems}
						<RegModal
							open={this.state.openReg}
							login={this.handleStateChange}
							isLoggedin={this.state.isLoggedIn}
							handleClose={this.handleClose}
						/>
						<LogModal
							open={this.state.openLog}
							handleClose={this.handleClose}
						/>
						<Modal
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
							open={this.state.openCre}
							onClose={this.handleCreateClose}
							
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
											autoComplete="current-password"
											margin="normal"
											variant="outlined"
											fullWidth={true}
										/>

										<TextField
											id="city"
											label="City"
											className={classes.textField}
											onChange={this.onChange}
											onBlur={this.handleCity}
											autoComplete="current-password"
											type="text"
											variant="outlined"
											fullWidth={true}
											helperText={this.state.city}
										/>
										<TextField
											id="startPoint"
											label="Start Address"
											className={classes.textField}
											onBlur={this.handleFuckMaps}
											autoComplete="current-password"
											type="text"
											variant="outlined"
											fullWidth={true}
											helperText={this.state.formatted}
										/>
										
									 
										<TextField
											id="details"
											label="Details"
											multiline
											rowsMax="8"
											onChange={this.onChange}
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
										<input
											hidden
											onChange={this.onFileUpload}
											name="photo"
											className={classes.input}
											id="contained-button-file"
											type="file"
										/>
										<label htmlFor="contained-button-file">
											<Button
												variant="contained"
												component="span"
												className={classes.button}
											>
												Upload
											</Button>
										</label>

										<Divider style={{ margin: "20px 0" }} />
										<Button
											variant="raised"
											color="primary"
											onClick={this.createEvent}
										>
											Submit
										</Button>
									</form>
								</MuiPickersUtilsProvider>
							</div>
						</Modal>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(Nav);
