import React, { Component } from "react";
import Hero from '../components/Header/Hero'
import Events from '../components/Main/Home/Events'

class Index extends Component {
    render() {
        return (
            <div>
                <Hero />
                <Events />
            </div>
        );
    }
}

export default Index;