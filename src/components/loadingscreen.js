import React, { Component } from "react";
import Pokedex from "./pokedex";
import PokemonInformation from "./pokemoninformation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './loadingscreenstyles.css'

class LoadingScreen extends Component {
  render() {
    return (
      <div className="center-loading">
        <div className="loading-screen">
          {" "}
          <div className="loading-screen-image"></div>
          <h1 className="load-text">Loading...</h1>
        </div>
      </div>
    );
  }
}

export default LoadingScreen;
