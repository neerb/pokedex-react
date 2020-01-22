import React, { Component } from "react";
import "./pokemoncardstyle.css";
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
      <div>
        <div className="pokemon-image-border">
          <div className="pokemon-id-number">{this.state.information.id}</div>
          <img
            className="pokemon-image"
            src={this.state.imageUrl}
            alt={this.state.name}
            onClick={this.routeToInformation}
          ></img>
        </div>
      </div>
    );
  }
}

export default PokemonCard;
