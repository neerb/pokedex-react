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
    // create a new div element
    var newDiv = document.createElement("div");

    const pokeInfo = () => (
      <PokemonInformation
        name={this.state.name}
        idnum={this.state.information.id}
        moves={this.state.moves}
        abilities={this.state.abilities}
      ></PokemonInformation>
    );

    return pokeInfo;

    // add the newly created element and its content into the DOM
    var currentDiv = document.getElementById("root");
    document.body.insertBefore(pokeInfo, currentDiv);

    /*
    document.body.createElement(
      <PokemonInformation
        name={this.state.name}
        idnum={this.state.information.id}
        moves={this.state.moves}
        abilities={this.state.abilities}
      ></PokemonInformation>
    );
    */

    //const informationBox = document.getElementById("pokemon-information");

    //informationBox.props = { name: "TEST" };
    //const pdex = document.getElementById("pokedex-division");
    //informationBox.style.visibility = "visible";
    //informationBox.style.width = "100%";
    //pdex.style.width = "75%";

    var btn = document.createElement("BUTTON"); // Create a <button> element
    btn.innerHTML = "CLICK ME"; // Insert text
    document.body.appendChild(btn);
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
        {this.routeToInformation()}
      </div>
    );
  }
}

export default PokemonCard;
