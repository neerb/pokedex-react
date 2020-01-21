import React, { Component } from "react";
import "./pokemonstyles.css";
import Pokedex from "./pokedex";

class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: props.imageUrl,
      name: props.name,
      information: props.information,
      moves: [],
      abilities: []
    };

    this.routeToInformation = this.routeToInformation.bind(this);
  }

  routeToInformation() {
    const informationBox = document.getElementById("pokemon-information");
  }

  render() {
    return (
      <img
        className="pokemon-image-border"
        src={this.state.imageUrl}
        alt={this.state.name}
        onClick={this.routeToInformation}
      ></img>
    );
  }
}

export default PokemonCard;
