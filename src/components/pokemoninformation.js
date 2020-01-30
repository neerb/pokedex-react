import React, { Component } from "react";
import "./pokemoninformationstyles.css";

const capitalize = s => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const convertColor = c => {
  if (c === "normal") {
    return "#A8A878";
  } else if (c === "fighting") {
    return "#C03028";
  } else if (c === "flying") {
    return "#A890F0";
  } else if (c === "poison") {
    return "#A040A0";
  } else if (c === "ground") {
    return "#E0C068";
  } else if (c === "rock") {
    return "#B8A038";
  } else if (c === "bug") {
    return "#A8B820";
  } else if (c === "ghost") {
    return "#705898";
  } else if (c === "steel") {
    return "#B8B8D0";
  } else if (c === "fire") {
    return "#F08030";
  } else if (c === "water") {
    return "#6890F0";
  } else if (c === "grass") {
    return "#78C850";
  } else if (c === "electric") {
    return "#F8D030";
  } else if (c === "psychic") {
    return "#F85888";
  } else if (c === "ice") {
    return "#98D8D8";
  } else if (c === "dragon") {
    return "#7038F8";
  } else if (c === "dark") {
    return "#705848";
  } else if (c === "fairy") {
    return "#EE99AC";
  } else if (c === "???") {
    return "#68A090";
  }
};

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

    fetch("https://pokeapi.co/api/v2/pokemon/" + this.state.searchedName)
      .then(res => res.json())
      .then(result => {
        this.setState({
          name: result.name,
          idnum: result.id,
          moves: result.moves,
          abilities: result.abilities,
          pokemonHeight: result.height,
          allInformation: result,
          isLoaded: true
        });

        document.title = capitalize(this.state.name);
      });
    /*
      .catch(function() {
        window.location.href = "/error";
      });
      */

    this.navToPrevious = this.navToPrevious.bind(this);
    this.navToNext = this.navToNext.bind(this);
  }

  navToPrevious() {
    window.location.href =
      "/pokeinfo/" + (parseInt(this.state.allInformation.id, 10) - 1);
  }

  navToNext() {
    window.location.href =
      "/pokeinfo/" + (parseInt(this.state.allInformation.id, 10) + 1);
  }

  componentDidMount() {}

  showInformation() {
    const { allInformation } = this.state;

    console.log(allInformation.types);

    let types = allInformation.types;
    const bground = document.getElementById("pokemon-information-background");

    if (types.length === 2) {
      var orientation = "to left";
      var colorOne = convertColor(types[0].type.name);
      var colorTwo = convertColor(types[1].type.name);

      console.log(
        "linear-gradient(" +
          orientation +
          ", " +
          colorOne +
          ", " +
          colorTwo +
          ")"
      );

      if (bground != null) {
        bground.style.background =
          "linear-gradient(" +
          orientation +
          ", " +
          colorOne +
          ", " +
          colorTwo +
          ")";
      }
    } else if (types.length === 1) {
      if (bground != null) {
        bground.style.background = convertColor(
          allInformation.types[0].type.name
        );
      }
    } else {
      if (bground != null) {
        bground.style.background = convertColor("???");
      }
    }

    if (this.state.isLoaded === true && this.state.error === false) {
      return (
        <div className="pokeinfo">
          <div className="pokemon-name-id">
            <h1>{this.state.name}</h1> <h1>#{this.state.idnum}</h1>
          </div>
          <div className="image-box sprites">
            <img src={allInformation.sprites.front_default}></img>
            <img src={allInformation.sprites.back_default}></img>
            <img src={allInformation.sprites.front_shiny}></img>
            <img src={allInformation.sprites.back_shiny}></img>
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
    if (this.state.isLoaded == true) {
      return (
        <React.Fragment>
          <div
            className="pokemon-information-background"
            id="pokemon-information-background"
          >
            <div className="navbar-top">
              <button
                className="previous-btn"
                type="submit"
                onClick={this.navToPrevious}
              >
                <img src="./images/prev.png"></img>
              </button>
              <button
                className="next-btn"
                type="submit"
                onClick={this.navToNext}
              >
                <img src="images/next.png"></img>
              </button>
            </div>
            {this.showInformation()}
            <div className="padding-bottom"></div>
          </div>
        </React.Fragment>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default PokemonInformation;
