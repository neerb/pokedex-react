import React, { Component } from "react";
import Pokedex from "./pokedex";
import PokemonInformation from "./pokemoninformation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './loadingscreenstyles.css'

class LoadMore extends Component {
  render() {
    return (
      <div className="bottom-loading">
        <div className="load-bottom-screen">
          <div className="loading-screen-image-smaller"></div>
          <h1 className="load-text-smaller">Loading...</h1>
        </div>
      </div>
    );
  }
}

export default LoadMore;
