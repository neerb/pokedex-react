import React, { Component } from "react";
import "./pokemoninformationstyles.css";
import Pokedex from "./pokedex";
import PokemonInformation from "./pokemoninformation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class LoadingScreen extends Component {
  render() {
    return (
      <div className="loading-screen">
        {" "}
        <h1>Loading...</h1>
        <div className="loading-screen-image"></div>
      </div>
    );
  }
}

export default LoadingScreen;
