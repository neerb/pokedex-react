import React, { Component } from "react";
import "./pokemonstyles.css";
import PokemonCard from "./pokemon-card";
import PokemonInformation from "./pokemoninformation";
import ErrorMessage from "./errormessage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Pokedex extends Component {
  constructor(props) {
    super(props);

    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000")
      .then(res => res.json())
      .then(result => {
        this.setState({ pokemonList: result.results });
        //console.log(this.state.pokemonList);

        this.state.pokemonList.map(pokemon => {
          fetch(pokemon.url)
            .then(res => res.json())
            .then(result => {
              let newList = this.state.pokemonDataList;

              if (result.sprites.front_default != null) {
                newList.push({
                  name: result.name,
                  imageUrl: result.sprites.front_default,
                  allInformation: result
                });
              }

              this.setState({
                pokemonDataList: newList,
                searchedPokemonDataList: newList
              });
            });
        });
      });

    //console.log(this.pokemonDataList);

    this.state = {
      name: null,
      error: null,
      isLoaded: false,
      pokemon: null,
      pokemonHeight: null,
      abilities: [],
      moves: [],

      pokemonList: [],
      pokemonDataList: [],
      searchedPokemonDataList: []
    };

    this.fetchPokemonData = this.fetchPokemonData.bind(this);
    this.returnMappedImages = this.returnMappedImages.bind(this);
    this.showPokemonResults = this.showPokemonResults.bind(this);
  }

  fetchPokemonData(e) {
    if (e.keyCode === 13) {
      console.log("Enter Pressed");

      const name = document.getElementById("pokemon-search-bar").value;

      console.log("https://pokeapi.co/api/v2/pokemon/" + name);

      fetch("https://pokeapi.co/api/v2/pokemon/" + name)
        .then(res => res.json())
        .then(
          result => {
            console.log(result.height);

            this.setState({
              name: result.name,
              idnum: result.id,
              isLoaded: true,
              pokemonHeight: result.height,
              abilities: result.abilities,
              moves: result.moves
            });
          },

          error => {
            this.setState({ isLoaded: true, error });
          }
        );
    }
  }

  showPokemonResults() {
    const name = document.getElementById("pokemon-search-bar").value;
    let newSearchList = [];

    this.state.pokemonDataList.map(pokemon => {
      if (name === "") {
        newSearchList = this.state.pokemonDataList;
      } else if (pokemon.name.includes(name)) {
        newSearchList.push(pokemon);
      }
    });

    this.setState({ searchedPokemonDataList: newSearchList });
  }

  returnMappedImages() {
    return (
      <div className="grid">
        {this.state.searchedPokemonDataList.map(p => (
          <PokemonCard
            className="grid-item"
            imageUrl={p.imageUrl}
            name={p.name}
            information={p.allInformation}
            key={p.name}
          ></PokemonCard>
        ))}
      </div>
    );
  }

  updateSelectedPokemonInformation() {}

  /*
  getImageFromURL(pokemon) {
    fetch(pokemon.url)
      .then(res => res.json())
      .then(result => {
        let newList = this.state.pokemonDataList;
        newList.push({
          name: result.name,
          imageUrl: result.sprites.front_default
        });

        this.setState({ pokemonDataList: newList });
      });
  }
  */

  render() {
    const {
      name,
      idnum,
      error,
      isLoaded,
      pokemon,
      pokemonHeight,
      abilities,
      moves,

      pokemonList,
      pokemonDataList
    } = this.state;

    return (
      <Router>
        <Route exact path="/">
          <div className="pokedex">
            <div className="pokedex-division" id="pokedex-division">
              <input
                className="pokemon-search"
                type="text"
                onKeyDown={this.fetchPokemonData}
                onChange={this.showPokemonResults}
                id="pokemon-search-bar"
                placeholder="Search for a pokemon..."
              ></input>

              {this.returnMappedImages()}
            </div>
          </div>
        </Route>

        <Route path="/pokeinfo/:name" component={PokemonInformation}></Route>

        <Route path="/error" component={ErrorMessage}></Route>
      </Router>
    );
  }
}

export default Pokedex;
