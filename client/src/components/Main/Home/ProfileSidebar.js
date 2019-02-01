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
import APIKey from '../../../constants'
import {localUrl} from '../../../components'
var moment = require('moment');


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        
    },
    paper: {
		position: "absolute",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		margin: theme.spacing.unit * 4,
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
    marginRight: '20px',
    width: '450px',
    padding: "10px"
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
            var userId = localStorage.getItem('userId')
            Axios.get()
            this.setState({ openEdit: true });
            };
        addRow = () => {
            const { rows } = this.state
            rows.push({ _id: uuidv4() })
            this.setState({ rows })
            }
        addBoard = (e) => {
            const { boards } = this.state
            boards.push(e.target.value)
            this.setState({ boards })
            }
        removeRow = (index) => {
            const { boards } = this.state
            if (boards.length > 1) {
                boards.splice(index, 1)
                this.setState({ boards })
            }
            }
        submit = () => {
            let updated = {
                "username": this.state.username,
                "hometown": this.state.hometown,
				"boards": this.state.boards,
				
            }
            let userId = localStorage.getItem('userId')
            
            Axios.put(`${localUrl}/api/users/edit/${userId}`, updated).then( response => {
                window.location=`/profile`
            }
                
            )
        }
        handleEditClose = () => {
            this.setState({ openEdit: false });
        };
        onChange = (e) => {
            this.setState({ [e.target.id]: e.target.value });
            };
        componentDidMount=()=>{
        let id = localStorage.getItem('userId')
		axios.get(`${localUrl}/api/users/${id}`)
			.then(response => {
                // console.log(response);
                var info = response.data.data;
                this.setState({
                    username: info.username,
                    hometown: info.hometown,
                    boards: info.boards,
                    joinDate: info.joinDate.substring(0,10)
                })
			})
        }
        render(){
            const { classes } = this.props;

        
        return(
            <Grid item xs={4}>
                <Paper className={classes.root} elevation={1}>
                    <Grid container >
                    <Avatar alt="Remy Sharp" 
                        src="https://scontent-lax3-2.xx.fbcdn.net/v/t31.0-8/14207637_10206003764886661_3602537242608403601_o.jpg?_nc_cat=107&_nc_ht=scontent-lax3-2.xx&oh=2bec00c1345da652d49d472378242c44&oe=5CFF3601" className={classes.bigAvatar} />
                    <Typography style={{paddingTop: 18,fontFamily: 'Cuprum', }} color="secondary" variant="h3" component="h2">

                    {this.state.username}
                    </Typography>
                    </Grid>
                <Divider />
                <Typography className={classes.profile} color="secondary" variant="h5"  >
                <i className="fas fa-map-marker-alt"></i> Hometown:

                </Typography>
                <Typography className={classes.profile} color="secondary" align="right" variant="h5"  component="h2">
                 {this.state.hometown}

                </Typography>
                <Divider />
                <Typography className={classes.profile} color="secondary" variant="h5"  >
                <span id='icon'></span>Boards:

                </Typography>
                {this.state.boards.map((board) => (
                <div key={board}>
                <Typography color="secondary" align="right" className={classes.profile} variant="h5" >
                {board}
                </Typography>
                
                </div>
                ))}
                <Divider/>
                <Typography className={classes.profile} color="secondary" variant="h5"  >
                 Joined:

                </Typography>
                <Typography className={classes.profile}  align="right" color="secondary" variant="subheading" gutterBottom>
                 {moment(this.state.joinDate).format("dddd, MMMM Do YYYY")}
                </Typography>


                <Divider/>
                <Button key={1} onClick={this.handleEditOpen} color="primary" > 
			Edit Profile Details
        </Button>
                </Paper>
                
                    <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.openEdit}
                    onClose={this.handleEditClose}

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
                    defaultValue={this.state.username}

                    />

                    <TextField
                    id="hometown"
                    label="Hometown"
                    className={classes.textField}
                    onChange={this.onChange}
                    onBlur={this.handleFuckMaps}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    defaultValue={this.state.hometown}


                    />
                    {this.state.boards.map((row, i) => (
                <div key={row._id}>
                <TextField
                    label="Board Type"
                    id="boards"
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
                    <Button variant="raised" onClick={this.addRow}>Add another board</Button>
                    <Divider style={{ margin: '20px 0' }} />
                    <Button variant="raised" color="primary" onClick={this.submit} >Submit</Button>
                    </form>

                    </div>

                    </Modal>
            </Grid>
        )
    
    }
}
        
export default withStyles(styles)(ProfileSidebar);
