import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faUserTie } from '@fortawesome/free-solid-svg-icons/faUserTie'
import Link from '@material-ui/core/Link';
const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.primary.dark,
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
        },
    typography:{
        color: "#f5f5f5",
        paddingLeft: 40,
        paddingBottom: 16
    },
})

function Footer(props) {
    const { classes } = props;
    return (
        <footer className={classes.footer}>
            <Grid container spacing={24}>
                <Grid item xs={8} sm={7} lg={8}>
                    <Typography className={classes.typography} variant="h5"align="left" gutterBottom>
                        SkateUp 
                    </Typography>
                    <Typography className={classes.typography} variant="h6"align="left" >
                        Created by Langdon Froker for General Assembly WDI 49 capstone
                    </Typography>
                </Grid>
                <Grid item container alignContent='space-around' justify="space-around" xs={4} sm={5} lg={4} >
                    <Grid item xs={12} sm={4}>
                        <Link href="https://github.com/langdonf">
                            <Typography className={classes.typography} variant="h4"  >
                                <FontAwesomeIcon icon={faGithubSquare} />
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Link href="https://www.linkedin.com/in/langdon-froker/">
                            <Typography className={classes.typography} variant="h4"  >
                                <FontAwesomeIcon icon={faLinkedin} />
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Link href="https://www.generalassemb.ly">
                            <Typography className={classes.typography} variant="h4"  >
                                <FontAwesomeIcon icon={faUserTie} />
                            </Typography>
                        </Link>
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