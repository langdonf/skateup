import React from "react";
import { Parallax } from "react-parallax";


const styles = {
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


const Hero = () => (
  <div  style={styles} >

    <h1>| | |</h1>
    <Parallax bgImage={image1} strength={-300}>
      <div style={{ height: 500 }}>
        <div className="homeHero" style={insideStyles}><h3>plan group rides</h3></div>
      </div>
    </Parallax>
    <h1>| | |</h1>
    <Parallax bgImage={image2} strength={200}>
      <div style={{ height: 500 }}>
        <div className="homeHero" style={insideStyles}><h3>find riders near you</h3></div>
      </div>
    </Parallax>
   
    
    <h1>| | |</h1>
    <Parallax bgImage={image3} strength={-200}>
      <div style={{ height: 500 }}>
        <div className="homeHero" style={insideStyles}><h3>meet up</h3></div>
      </div>
    </Parallax>
    <h1>| | |</h1>
    <Parallax bgImage={image4} strength={200}>
      <div style={{ height: 500 }}>
        <div  className="homeHero"style={insideStyles}><h3>skate together</h3></div>
      </div>
    </Parallax>
   
  </div>
);
export default Hero
