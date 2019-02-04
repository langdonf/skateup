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
import {backURL} from '../../constants'

const styles = theme => ({
    paper: {
        margin: "0 auto",
		marginTop: "10%",
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflow:'scroll',
        height: 680
    },
});
const inputStyle = {
    width: '100%',
}

class RegModal extends React.Component {
    constructor(props) {
        super(props);
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
            errors: [{email:"",password:""}],
            error: false
        };
    }

    addBoard = (e) => {
        const { boards } = this.state
        boards.push(e.target.value)
        this.setState({ boards })
    }

    addRow = () => {
        const { rows } = this.state
        rows.push({ _id: uuidv4() })
        this.setState({ rows })
    }

    removeRow = (index) => {
        const { rows } = this.state
        if (rows.length > 1) {
            rows.splice(index, 1)
            this.setState({ rows })
        }
    }

    handleMaps = e => {
        var ths = this;
        axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${e.target.value}&key=${APIKey.APIKey}`)
            .then(function(response) {
                ths.setState({
                    hometown: response.data.results[0].formatted_address
                });
            }
        );
    };
    
    submitSuccess = (newUser) =>{
        axios.post(`${backURL}/api/users/login`, {email: newUser.email, password: newUser.password})
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
        axios.post(`${backURL}/api/users/register`, newUser)
            .then(function (response) {
                ths.submitSuccess(newUser)   
            }
        )
        .catch(function (error) {
            let validation = error.response.data
            ths.setState({
                errors: [validation]
            })
        })
    }

    onChange = (e) => {
        this.setState({ 
            [e.target.id]: e.target.value 
        });
    };
    
    render() {
        const { classes } = this.props;
        return (
            <Modal
                scroll='body'
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose={this.props.handleClose}
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
                            required
                            style={inputStyle}
                            error={this.state.error}
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
                            required
                            style={inputStyle}
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
                            required
                            style={inputStyle}
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
                            required
                            style={inputStyle}
                            helperText={this.state.errors[0].password2}
                            />
                        <TextField
                            id="hometown"
                            label="Hometown"
                            className={classes.textField}
                            onChange={this.onChange}
                            onBlur={this.handleMaps}
                            type="text"
                            margin="normal"
                            variant="outlined"
                            style={inputStyle}
                            required
                            helperText={this.state.hometown}
                            />
                        {this.state.rows.map((row, i) => (
                            <div key={row._id}>
                                <TextField
                                    label="Boards and Gear"
                                    id="boards"
                                    variant="outlined"
                                    style={inputStyle}
                                    onBlur={this.addBoard}
                                />
                                {this.state.rows.length > 1 &&
                                    <Button
                                        onClick={() => this.removeRow(i)}
                                        deletefieldrow={`rows[${i}]`}>
                                        Remove Gear
                                    </Button>
                                }
                            </div>
                        ))}
                        <br/><br/>
                        <Button 
                            variant="raised" 
                            onClick={this.addRow}>
                            Add more gear
                        </Button>
                        <Divider style={{ margin: '20px 0' }} />
                        <Button 
                            variant="raised" 
                            color="primary" 
                            onClick={this.submit}>
                            Submit
                        </Button>
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

const RegModalWrapped = withStyles(styles)(RegModal);

export default RegModalWrapped;