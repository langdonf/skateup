import React from "react";
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import { Divider } from "@material-ui/core";
import uuidv4 from 'uuid/v4';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from "axios";
import {backURL} from '../../../constants'
import profilePlaceholder from '../../../images/profilePlaceholder.jpg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons/faMapMarkerAlt'
var moment = require('moment');

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    paper: {
		margin: "0 auto",
		marginTop: "10%",
        width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: "none"
	},
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
        left: 0
    },
    profile:{
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
        fontFamily: 'Cuprum', 
    },
});
const inputStyle = {
    marginTop: "10px"
}

class ProfileSidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            userId: "",
            hometown: "",
            boards: [],
            joinDate: "",
            rows: [{ _id: uuidv4() }],
            }
    }
    handleEditOpen = () => { 
        this.setState({ openEdit: true });
    };

    addRow = () => {
        const { rows } = this.state
        rows.push({ _id: uuidv4() })
        this.setState({ rows })
    };

    addBoard = (e) => {
        const { boards } = this.state
        boards.push(e.target.value)
        this.setState({ boards })
    };

    removeRow = (index) => {
        const { rows } = this.state
        if (rows.length > 1) {
            rows.splice(index, 1)
            this.setState({ rows })
        }
        const { boards } = this.state
        if (boards.length > 1) {
            boards.splice(index, 1)
            this.setState({ boards })   
        }
    };

    submit = () => {
        let updated = {
            "username": this.state.username,
            "hometown": this.state.hometown,
            "boards": this.state.boards,
        }
        let userId = localStorage.getItem('userId')
        Axios.put(`${backURL}/api/users/edit/${userId}`, updated).then( response => {
            window.location=`/profile`
        })
    };

    handleEditClose = () => {
        this.setState({ openEdit: false });
    };

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentDidMount=()=>{
        let id = localStorage.getItem('userId')
        axios.get(`${backURL}/api/users/${id}`)
            .then(response => {
                var info = response.data.data;
                this.setState({
                    username: info.username,
                    hometown: info.hometown,
                    boards: info.boards,
                    joinDate: info.joinDate.substring(0,10)
                })
                    this.handleRows()
             })
    }

    handleRows=()=>{
        var rows = []
        this.state.boards.forEach(board => {
            rows.push({ _id: uuidv4() })
        });
        this.setState({
            rows: rows
        })
    }

    render(){
        const { classes } = this.props;
        return(
            <Grid item xs={12}>
                <Paper className={classes.root} elevation={1}>
                    <Grid container >
                        <Avatar 
                            alt="default" 
                            src={profilePlaceholder} 
                            className={classes.bigAvatar} 
                        />
                        <Typography 
                            style={{paddingTop: 18, fontFamily: 'Cuprum'}} 
                            color="secondary" 
                            variant="h3" 
                            component="h2"
                        >
                            {this.state.username}
                        </Typography>
                    </Grid>
                    <Divider />
                    <Typography 
                        className={classes.profile} 
                        color="secondary" 
                        variant="h5" 
                    >
                        <FontAwesomeIcon icon={faMapMarkerAlt}/> 
                            Hometown:
                    </Typography>
                    <Typography 
                        className={classes.profile} 
                        color="secondary" 
                        align="right" 
                        variant="h5"  
                        component="h2"
                    >
                        {this.state.hometown}
                    </Typography>
                    <Divider />
                    <Typography 
                        className={classes.profile} 
                        color="secondary" 
                        variant="h5"  
                    >
                        Boards:
                    </Typography>
                    {this.state.boards.map((board) => (
                        <div key={board}>
                            <Typography 
                                color="secondary" 
                                align="right" 
                                className={classes.profile} 
                                variant="h5"
                            >
                                {board}
                            </Typography>
                        </div>
                    ))}
                    <Divider/>
                    <Typography 
                        className={classes.profile} 
                        color="secondary" 
                        variant="h5"  
                    >
                        Joined:
                    </Typography>
                    <Typography 
                        className={classes.profile}
                        align="right" color="secondary" 
                        variant="subheading" 
                        gutterBottom
                    >
                        {moment(this.state.joinDate).format("dddd, MMMM Do YYYY")}
                    </Typography>
                    <Divider/>
                    <Button 
                        key={1} 
                        onClick={this.handleEditOpen} 
                        color="primary"
                    > 
                        Edit Profile Details
                    </Button>
                </Paper>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openEdit}
                    onClose={this.handleEditClose}
                > 
                    <div className={classes.paper}>
                        <form className={classes.container} >
                            <div>
                                <TextField
                                    id="username"
                                    name="username"
                                    label="Username"
                                    required
                                    fullWidth
                                    className={classes.textField}
                                    onChange={this.onChange}
                                    margin="normal"
                                    variant="outlined"
                                    defaultValue={this.state.username}
                                />
                                <TextField
                                    id="hometown"
                                    label="Hometown"
                                    fullWidth
                                    required
                                    className={classes.textField}
                                    onChange={this.onChange}
                                    onBlur={this.handleMaps}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    defaultValue={this.state.hometown}
                                />
                            </div>
                                {this.state.rows.map((row, i) => (
                            <div key={row._id}>
                                <TextField
                                    label="Board Name"
                                    fullWidth
                                    className={classes.textField}
                                    variant="outlined"
                                    style={inputStyle}
                                    onBlur={this.addBoard}
                                    defaultValue={this.state.boards[i]}
                                />
                                <Button
                                    onClick={() => this.removeRow(i)}
                                    deletefieldrow={`rows[${i}]`}
                                >
                                    Remove Board
                                </Button>
                            </div>
                                ))}
                            <br /><br />
                            <Button 
                                variant="raised" 
                                onClick={this.addRow}>Add another board
                            </Button>
                            <Divider style={{ margin: '20px 0' }} />
                            <Button 
                                variant="raised" 
                                color="primary" 
                                onClick={this.submit} 
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </Modal>
            </Grid>
        )
    }
}
        
export default withStyles(styles)(ProfileSidebar);
