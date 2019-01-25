import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Events from '../components/Main/Home/Events'
import ProfileSidebar from '../components/Main/Home/ProfileSidebar'

const style = {paddingTop: 120}
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function Home(props) {
    const { classes } = props;

    return (
        <div className={classes.root} style={style}>
            <Grid container spacing={24}>
                <Events />
                <ProfileSidebar />
            </Grid>
        </div>
    );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);