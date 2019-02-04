import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie'

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
        },
    typography:{
        color: "#f5f5f5",
        paddingLeft: 40
    }
})

function Footer(props) {
    const { classes } = props;
    return (
        <footer className={classes.footer}>
            <Grid container spacing={20}>
                <Grid item alignContent='space-around' xs={8} md={8}>
                    <Typography className={classes.typography} variant="h5"align="left" gutterBottom>
                        SkateUp 
                    </Typography>
                    <Typography className={classes.typography} variant="h6"align="left" >
                        Created by Langdon Froker for General Assembly WDI 49 capstone
                    </Typography>
                </Grid>
                <Grid  container alignContent='space-around' justify="space-around" xs={4} md={3} >
                    <Grid item xs={12} sm={4}>
                        <Typography className={classes.typography} variant="h4"  >
                            <FontAwesomeIcon icon={faGithubSquare} />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography className={classes.typography} variant="h4"  >
                            <FontAwesomeIcon icon={faLinkedin} />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography className={classes.typography} variant="h4"  >
                            <FontAwesomeIcon icon={faUserTie} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    )
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);