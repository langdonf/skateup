import React from "react";
import { Parallax } from "react-parallax";
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
root: {
    flexGrow: 1,
    
},
paper: {
    padding: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    textAlign: 'center',
    fontSize: 20,
    color: theme.palette.text.secondary,
},
});
const style = {

fontFamily: "sans-serif",
textAlign: "center",
paddingTop: 64
};
const insideStyles = {
    fontSize: 38,
    fontWeight: "bold",
    padding: 20,
    position: "absolute",
    color: "white",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
};
const image1 =
    "https://cdn.thetechreviewer.com/wp-content/uploads/2018/04/22135746/best-electric-skateboard.jpg"
const image2 =
"https://12u5i3qsp9y22yzjwn5z1lil-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/Campus-Cruiser-FB@2x.png";
const image3 =
"https://sandiegoflyrides.com/wp-content/uploads/2017/10/INBOARD_20170305_9965-1200x960.jpg";
const image4 =
"https://i.ytimg.com/vi/NM2sOZOsoGM/maxresdefault.jpg";


const Hero = (props) => {
const { classes } = props;
return(
<div  style={style} >
    <Parallax bgImage={image1} strength={-300}>
    <div style={{ height: 500 }}>
        <div className="homeHero" style={insideStyles}><h3>plan group rides</h3></div>
    </div>
    </Parallax>
    <Grid container spacing={24}>
    <Grid className={classes.root} item xs={12}>
        <Paper className={classes.paper}>
        Big fish sets socked in triple overhead, frontside WQS rain rad alley-oop. Late drop poked the nose reef chunky fish, slab wave backhand attack marine layer poked the nose. Ano Nuevo ripper casual tide switch un-real waterman. Pumping swell floater barrels turning on wobbly  Simpo salt water psyched glazz. Too deep duck diving stomp out the back epic late drop brutal reef break lined up. Paddle battle shred precise wind conditions indy slash. Pigdog kook of the day radical slab critical too deep green room mellow, shampoo cutties.
        
        Dry hair goes vertical Pipeline rail grab air reverse poked the nose full rotation. Tossin' pizzas twin keel face, firing shorebreak fresh stick air section kick out quiver speed power hack. Slabbing rail dig wax grommet dry hair paddle out cracking it round house cutty tide clean keyhole. Rip, lip lay day, twin fin pearl open face Mick Fanning layback daggers. Aquarium DOH backhand, loc, dry hair squirt, viscious shack Dane Reynolds.
</Paper>
    </Grid>
    </Grid>
    <Parallax bgImage={image2} strength={200}>
    <div style={{ height: 500 }}>
        <div className="homeHero" style={insideStyles}><h3>find riders near you</h3></div>
    </div>
    </Parallax>

    
    <Grid container spacing={24}>
    <Grid item xs={12}>
        <Paper className={classes.paper}>Dry hair goes vertical Pipeline rail grab air reverse poked the nose full rotation. Tossin' pizzas twin keel face, firing shorebreak fresh stick air section kick out quiver speed power hack. Slabbing rail dig wax grommet dry hair paddle out cracking it round house cutty tide clean keyhole. Rip, lip lay day, twin fin pearl open face Mick Fanning layback daggers. Aquarium DOH backhand, loc, dry hair squirt, viscious shack Dane Reynolds.

Big fish sets socked in triple overhead, frontside WQS rain rad alley-oop. Late drop poked the nose reef chunky fish, slab wave backhand attack marine layer poked the nose. Ano Nuevo ripper casual tide switch un-real waterman. Pumping swell floater barrels turning on wobbl Simpo salt water psyched glazz. Too deep duck diving stomp out the back epic late drop brutal reef break lined up. Paddle battle shred precise wind conditions indy slash. Pigdog kook of the day radical slab critical too deep green room mellow, shampoo cutties.</Paper>
    </Grid>
    </Grid>
    <Parallax bgImage={image3} strength={-200}>
    <div style={{ height: 500 }}>
        <div className="homeHero" style={insideStyles}><h3>meet up</h3></div>
    </div>
    </Parallax>
    <Grid container spacing={24}>
    <Grid item xs={12}>
        <Paper className={classes.paper}>Ano Nuevo ripper casual tide switch un-real waterman. Pumping swell floater barrels turning on wobbly  Simpo salt water psyched glazz. Too deep duck diving stomp out the back epic late drop brutal reef break lined up. Paddle battle shred precise wind conditions indy slash. Pigdog kook of the day radical slab critical too deep green room mellow, shampoo cutties.Dry hair goes vertical Pipeline rail grab air reverse poked the nose full rotation. Tossin' pizzas twin keel face, firing shorebreak fresh stick air section kick out quiver speed power hack. Slabbing rail dig wax grommet dry hair paddle out cracking it round house cutty tide clean keyhole. Rip, lip lay day, twin fin pearl open face Mick Fanning layback daggers. Aquarium DOH backhand, loc, dry hair squirt, viscious shack Dane Reynolds.

        Big fish sets socked in triple overhead, frontside WQS rain rad alley-oop. Late drop poked the nose reef chunky fish, slab wave backhand attack marine layer poked the nose. </Paper>
    </Grid>
    </Grid>
    <Parallax bgImage={image4} strength={200}>
    <div style={{ height: 500 }}>
        <div  className="homeHero"style={insideStyles}><h3>skate together</h3></div>
    </div>
    </Parallax>

</div>
)};
export default withStyles(styles)(Hero)
