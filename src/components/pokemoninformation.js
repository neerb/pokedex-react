import React, { Component } from "react";
import "./pokemonstyles.css";

class PokemonInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      idnum: props.idnum,
      moves: props.moves,
      abilities: props.abilities
    };

    console.log(this.state.moves);
  }

  showMovesAndAbilities() {
    return;
  }

  render() {
    const { name, idnum, moves, abilities } = this.state;

    return (
      <div className="pokemon-information" id="pokemon-information">
        Name: {name}
        <br></br>
        Number: {idnum}
        <br></br>
        {/*
          Moves:{" "}
          {moves.map(m => (
            <li key={m.move.name}>{m.move.name}</li>
          ))}
          <br></br>
          Abilities:{" "}
          {abilities.map(abil => (
            <li key={abil.ability.name}>{abil.ability.name}</li>
          ))}
          */}
      </div>
    );
  }
}

export default PokemonInformation;
