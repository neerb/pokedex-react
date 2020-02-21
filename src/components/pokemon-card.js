import React, { Component } from "react";
import "./pokemoncardstyle.css";
import Pokedex from "./pokedex";
import PokemonInformation from "./pokemoninformation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: props.imageUrl,
      name: props.name,
      information: props.information,
      moves: null,
      abilities: null,
      clicked: false
    };

    this.routeToInformation = this.routeToInformation.bind(this);
    this.updateClick = this.updateClick.bind(this);
  }

  updateClick() {
    this.setState({ clicked: true });
    window.location.href = "/#/pokeinfo/" + this.state.name;
  }

  routeToInformation() {}

  render() {
    return (
      <div>
        <div className="pokemon-image-border">
          <div className="pokemon-id-number">{this.state.information.id}</div>

          <img
            className="pokemon-image"
            src={this.state.imageUrl}
            alt={this.state.name}
            onClick={this.updateClick}
          ></img>
        </div>
      </div>
    );
  }
}

export default PokemonCard;
