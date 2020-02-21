import React, { Component } from "react";
import "./pokemonstyles.css";
import PokemonCard from "./pokemon-card";
import PokemonInformation from "./pokemoninformation";
import ErrorMessage from "./errormessage";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  HashRouter,
  StaticRouter
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const insertionSort = array => {
  const length = array.length;

  for (let i = 1; i < length; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j].id > key.id) {
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;
  }
  return array;
};

class Pokedex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: [],
      pokemonDataList: [],
      searchedPokemonDataList: []
    };

    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1000")
      .then(res => res.json())
      .then(result => {
        this.setState({ pokemonList: result.results });
        //console.log(this.state.pokemonList);

        this.state.pokemonList.map(pokemon => {
          fetch(pokemon.url)
            .then(res => res.json())
            .then(result => {
              let newList = insertionSort(this.state.pokemonDataList);

              if (result.sprites.front_default != null) {
                newList.push({
                  name: result.name,
                  id: result.id,
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

    console.log(this.state.pokemonDataList);

    //console.log(this.pokemonDataList);
    this.returnMappedImages = this.returnMappedImages.bind(this);
    this.showPokemonResults = this.showPokemonResults.bind(this);
  }

  showPokemonResults() {
    const name = document.getElementById("pokemon-search-bar").value;
    let newSearchList = [];

    if (name === "") {
      newSearchList = this.state.pokemonDataList;
    } else {
      this.state.pokemonDataList.map(pokemon => {
        if (pokemon.name.includes(name)) {
          newSearchList.push(pokemon);
        }
      });
    }

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

  componentDidMount() {
    let sortedList = insertionSort(this.state.pokemonDataList);

    this.setState({ pokemonDataList: sortedList });

    console.log(this.state.pokemonDataList);
  }

  updateSelectedPokemonInformation() {}

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
      <BrowserRouter basename="pokedex-react">
        <div>
          <Route path="/pokeinfo/:name" component={PokemonInformation}></Route>

          <Route exact path="/">
            <div className="pokedex">
              <div className="pokedex-division" id="pokedex-division">
                <input
                  className="pokemon-search"
                  type="text"
                  onChange={this.showPokemonResults}
                  id="pokemon-search-bar"
                  placeholder="Search for a pokemon..."
                ></input>

                {this.returnMappedImages()}
              </div>
            </div>
          </Route>

          <Route path="/error" component={ErrorMessage}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default Pokedex;
