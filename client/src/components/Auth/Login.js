import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {backURL} from '../../constants'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider'
import axios from 'axios'

const styles = theme => ({
    paper: {
        margin: "0 auto",
		marginTop: "10%",
        width: theme.spacing.unit * 40,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    textField: {
        width: 250
    }
});

class LogModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            openLog: false,
            errors: [{email:"",password:""}]
        };
    }

    submit = (e) => {
        e.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password,
        };
        var ths = this
        axios.post(`${backURL}/api/users/login`, user)
            .then(function (response) {
                let token = response.data.token
                localStorage.token = token
                localStorage.userId = response.data.userData.id
                window.location ='/home'
            })
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
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.props.open}
                onClose={this.props.handleClose}
                className="modal"
                >
                <div  className={classes.paper}>
                    <form className={classes.container} >
                        <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            onChange={this.onChange}
                            required
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
                            required
                            type="password"
                            name="password"
                            margin="normal"
                            variant="outlined"
                            helperText={this.state.errors[0].password}
                        /> 
                        <br /> 
                        <br />
                        <Divider style={{ margin: '20px 0' }} />
                        <Button 
                            variant="raised" 
                            color="primary" 
                            
                            onClick={this.submit}>
                            Submit
                        </Button>
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

const LogModalWrapped = withStyles(styles)(LogModal);
export default LogModalWrapped;