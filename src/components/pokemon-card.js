import React, { Component } from "react";
import "./pokemoncardstyle.css";
import Pokedex from "./pokedex";
import PokemonInformation from "./pokemoninformation";

class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: props.imageUrl,
      name: props.name,
      information: props.information,
      moves: props.information.moves,
      abilities: props.information.ablilities
    };

    this.routeToInformation = this.routeToInformation.bind(this);
  }

  routeToInformation() {
    //const informationBox = document.getElementById("pokemon-information");
    const pdex = document.getElementById("pokedex-division");

    //informationBox.style.visibility = "visible";
    //informationBox.style.width = "100%";

    //pdex.style.width = "75%";

    return (
      <PokemonInformation
        name={this.state.name}
        idnum={this.state.information.id}
        moves={this.state.moves}
        abilities={this.state.abilities}
      ></PokemonInformation>
    );
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
