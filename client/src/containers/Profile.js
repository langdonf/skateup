import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import MyEvents from '../components/Main/Profile/MyEvents'
import ProfileSidebar from '../components/Main/Home/ProfileSidebar'
import EventsAttending from "../components/Main/Profile/EventsAttending";
const style = {paddingTop: 120}
const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

function Profile(props) {
    const { classes } = props;
    return (
        <div className={classes.root} style={style}>
            <Grid container spacing={24}>
                <Grid item xs={12} md={8}>
                    <MyEvents />
                    <EventsAttending /> 
                </Grid>
                <Grid item xs={12} md={4}>
                    <ProfileSidebar />
                </Grid>
            </Grid>
        </div>
    );
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);