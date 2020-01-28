import React, { Component } from "react";
import "./pokemoninformationstyles.css";

class PokemonInformation extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.match.params);

    this.state = {
      searchedName: this.props.match.params.name,
      name: null,
      idnum: null,
      moves: null,
      abilities: null,
      allinformation: null,
      isLoaded: false,
      error: false
    };
  }

  componentDidMount() {
    console.log(this.props);

    fetch("https://pokeapi.co/api/v2/pokemon/" + this.state.searchedName)
      .then(res => res.json())
      .then(result => {
        console.log(result.height);

        this.setState({
          name: result.name,
          idnum: result.id,
          moves: result.moves,
          abilities: result.abilities,
          pokemonHeight: result.height,
          allInformation: result,
          isLoaded: true
        });

        document.title = this.state.name;
      })
      .catch(function() {
        window.location.href = "pokedex-react/error";
      });
  }

  showInformation() {
    const { allInformation } = this.state;

    if (this.state.isLoaded === true && this.state.error === false) {
      return (
        <div className="pokeinfo">
          <div className="pokemon-name-id">
            <h>{this.state.name}</h> <h1>Number: {this.state.idnum}</h1>
          </div>
          <div className="image-box sprites">
            <img src={allInformation.sprites.front_default}></img>
            <img src={allInformation.sprites.back_default}></img>
            <img src={allInformation.sprites.front_shiny}></img>
            <img src={allInformation.sprites.back_shiny}></img>
          </div>
          <div className="basic-info-box">
            <div className="grid">
              <div className="grid-item">Height: {allInformation.height}</div>
              <div className="grid-item"> Weight: {allInformation.weight}</div>
            </div>
          </div>
          Moves:
          <div className="moves-box">
            {this.state.moves.map(m => (
              <div className="bordered-list-item" key={m.move.name}>
                {m.move.name}
              </div>
            ))}
          </div>
          <br></br>
          Abilities:
          {this.state.abilities.map(abil => (
            <div className="bordered-list-item" key={abil.ability.name}>
              {abil.ability.name}
            </div>
          ))}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="pokemon-information" id="pokemon-information">
        {this.showInformation()}
      </div>
    );
  }
}

export default PokemonInformation;
