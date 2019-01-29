import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider'
import axios from 'axios'



const styles = theme => ({
    paper: {
        position: 'absolute',
        top: "20%",
        right: "40%",
        width: theme.spacing.unit * 40,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    });



class LogModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            openLog: false
        };
    }

    submit = (e) => {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
            };

        
    
        axios.post('http://localhost:3001/api/users/login', user)
        .then(function (response) {
            console.log(response)
            let token = response.data.token
            localStorage.token = token
            localStorage.userId = response.data.userData.id
            window.location ='/home'
            
        })
        .catch(function (error) {
            console.log("Username not found, please try again.");
        })
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
            <form validate className={classes.container} autoComplete="on">
            
            <TextField
                id="email"
                label="Email"
                className={classes.textField}
                onChange={this.onChange}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="password"
                label="Password"
                className={classes.textField}
                onChange={this.onChange}
                type="password"
                autoComplete="current-password"
                margin="normal"
                variant="outlined"
            />
            
            <br /> <br />
            
            <Divider style={{ margin: '20px 0' }} />
            <Button variant="raised" color="primary" onClick={this.submit}  >Submit</Button>
            </form>
                <LogModalWrapped />
            </div>
            </Modal>
       
        );
    }
    }

    LogModal.propTypes = {
    classes: PropTypes.object.isRequired,
    };

// We need an intermediary variable for handling the recursive nesting.
const LogModalWrapped = withStyles(styles)(LogModal);

export default LogModalWrapped;