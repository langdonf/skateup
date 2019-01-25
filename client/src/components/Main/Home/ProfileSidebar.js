import React from "react";
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import { Divider } from "@material-ui/core";


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
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,

    }
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
                console.log(response);
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
            <Avatar alt="Remy Sharp" src="https://scontent-lax3-2.xx.fbcdn.net/v/t31.0-8/14207637_10206003764886661_3602537242608403601_o.jpg?_nc_cat=107&_nc_ht=scontent-lax3-2.xx&oh=2bec00c1345da652d49d472378242c44&oe=5CFF3601" className={classes.bigAvatar} />
            <Typography style={{paddingTop: 18}}variant="h3" component="h2">
           
           {this.state.username}
           </Typography>
            </Grid>
            <Divider variant="inset" />
            
            <Typography className={classes.profile} variant="h4"  component="h2">
            {this.state.hometown}
         
        </Typography>
        <Divider />
            <Typography className={classes.profile} variant="h5" gutterBottom>
            Joined: {this.state.joinDate}
            </Typography>
            {this.state.boards.map((board) => (
            <div key={board}>
                <Typography className={classes.profile} variant="h5" gutterBottom>
                {board}
            </Typography>
            </div>
            ))}
            
    
                <Divider variant="inset" />
            </Paper>
        </Grid>
        )
    
    }
}
        
export default withStyles(styles)(ProfileSidebar);
