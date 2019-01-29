import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider'
import axios from 'axios'
import uuidv4 from 'uuid/v4';
import APIKey from '../../constants'



const styles = theme => ({
    paper: {
        position: 'absolute',
        top: "10%",
        right: "40%",
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    });

const inputStyle = {
        marginRight: '20px',
        width: '250px',
      }

class RegModal extends React.Component {
    constructor(props) {
        super(props);
        // var state =  this.props.open
        this.state = {
            username: "",
            email: "",
            password: "",
            password2: "",
            hometown: "",
            boards: [],
            rows: [{ _id: uuidv4() }],
            onSubmitValues: null,
            open: false,
            isLoggedin: false,
            errors: [{email:"",password:""}]
        };
    }
    addRow = () => {
        const { rows } = this.state
        rows.push({ _id: uuidv4() })
        this.setState({ rows })
        }
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

    removeRow = (index) => {
        const { rows } = this.state
        if (rows.length > 1) {
            rows.splice(index, 1)
            this.setState({ rows })
        }
        }
    submitSuccess = (newUser) =>{
        axios.post('http://localhost:3001/api/users/login', {email: newUser.email, password: newUser.password})
        .then(function(response){
            let token = response.data.token
            localStorage.userId = response.data.userData.id
            localStorage.token = token
            if(response){
                window.location = '/home'
            }
    })
        .catch(function(error){
            console.log(error);
        })

        
        
    }
    submit = (e) => {
        e.preventDefault()
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            hometown: this.state.hometown,
            boards: this.state.boards
            };

        var ths = this
        axios.post('http://localhost:3001/api/users/register', newUser)
        .then(function (response) {
            console.log(response)
            ths.submitSuccess(newUser)   
        })
        .catch(function (error) {
            let validation = error.response.data
           ths.setState({
               errors: [validation]
           })
        })

        
    }

    addBoard = (e) => {
        const { boards } = this.state
        boards.push(e.target.value)
        this.setState({ boards })
        }
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        };
    
    render() {
        const { classes } = this.props;
        
        return (
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.props.open}
            onClose={this.props.handleClose}
            className="modal"
            >
            <div  className={classes.paper}>
            <form className={classes.container} >
            <TextField
                id="username"
                name="username"
                label="Username"
                className={classes.textField}
                onChange={this.onChange}
                margin="normal"
                variant="outlined"
                helperText={this.state.errors[0].username}
            />
            <TextField
                id="email"
                label="Email"
                className={classes.textField}
                onChange={this.onChange}
                type="email"
                name="email"
                margin="normal"
                variant="outlined"
                helperText={this.state.errors[0].email}
            />
            <TextField
                id="password"
                label="Password"
                className={classes.textField}
                onChange={this.onChange}
                type="password"
                margin="normal"
                variant="outlined"
                helperText={this.state.errors[0].password}
            />
            <TextField
                id="password2"
                label="Confirm Password"
                className={classes.textField}
                onChange={this.onChange}
                type="password"
                margin="normal"
                variant="outlined"
                helperText={this.state.errors[0].password2}
            />
            <TextField
                id="hometown"
                label="Hometown"
                className={classes.textField}
                onChange={this.onChange}
                type="text"
                margin="normal"
                variant="outlined"
                
            />
            {this.state.rows.map((row, i) => (
                <div key={row._id}>
                <TextField
                    label="Board Type"
                    id="boards"
                    variant="outlined"
                    style={inputStyle}
                    onBlur={this.addBoard}
                />
                { this.state.rows.length > 1 &&
                    <Button
                    onClick={() => this.removeRow(i)}
                    deletefieldrow={`rows[${i}]`}
                    >
                    Remove Board
                    </Button>
                }
                </div>
            ))}
            <br /><br />
            <Button variant="raised" onClick={this.addRow}>Add another board</Button>
            <Divider style={{ margin: '20px 0' }} />
            <Button variant="raised" color="primary" onClick={this.submit} >Submit</Button>
            </form>
                <RegModalWrapped />
            </div>
            </Modal>
       
        );
    }
    }

    RegModal.propTypes = {
    classes: PropTypes.object.isRequired,
    };

// We need an intermediary variable for handling the recursive nesting.
const RegModalWrapped = withStyles(styles)(RegModal);

export default RegModalWrapped;