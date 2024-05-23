import React, { Component } from "react";
import Pokedex from "./pokedex";
import PokemonInformation from "./pokemoninformation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './loadingscreenstyles.css'

class NoResults extends Component {
    render() {
        return (
            <div className="noresults">
                <div className="loading-screen">
                    <h1 className="load-text">- End of results -</h1>
                </div>
            </div>
        );
    }
}

export default NoResults;
