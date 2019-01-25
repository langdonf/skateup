import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from './components/Header/Nav'

import Profile from './containers/Profile'

import Home from "./containers/Home"
import Index from "./containers/Index"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoggedIn: false,
    }
  }
  handleStateChange=(loggedIn)=>{
    this.setState({
      isLoggedIn: loggedIn
    })
  }
  
  render() {
    return (
      <Router>
        <div className="App">
            <Nav login={this.handleStateChange}/>
            <Route exact path="/"  component={Index} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;