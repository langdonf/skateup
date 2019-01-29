import React from "react";
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import { Divider } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
var moment = require('moment');

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        
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


class ProfileSidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            userId: "",
            hometown: "",
            boards: [],
            joinDate: ""
            }
        }
        componentDidMount=()=>{
        let id = localStorage.getItem('userId')
		axios.get(`http://localhost:3001/api/users/${id}`)
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
                <Divider  />
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

                </Paper>
            </Grid>
        )
    
    }
}
        
export default withStyles(styles)(ProfileSidebar);
