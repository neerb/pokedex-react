import React, { Component } from "react";
import "./pokemoninformationstyles.css";
import MoveCard from "./movecard.js";

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

const hectogramsToPounds = s => {
  return (s / 10.0).toFixed(2);
};

const decimetersToCentimeters = s => {
  return s * 10.0;
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
      description: null,
      genus: null,
      color: null,
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

        fetch(this.state.allInformation.species.url)
          .then(res => res.json())
          .then(result => {
            let flavorTextArray = result.flavor_text_entries;
            let n = 0;

            while (flavorTextArray[n].language.name !== "en") {
              n++;
            }

            if (flavorTextArray[n].language.name === "en") {
              this.setState({ description: flavorTextArray[n].flavor_text });
            }

            let generaArray = result.genera;
            n = 0;

            while (generaArray[n].language.name !== "en") {
              n++;
            }

            if (generaArray[n].language.name === "en") {
              this.setState({ genus: generaArray[n].genus });
            }

            if (result.color.name === "white") {
              let types = this.state.allInformation.types;

              if (types.length >= 1) {
                this.setState({ color: convertColor(types[0].type.name) });
              } else {
                this.setState({ color: "gray" });
              }
            } else {
              this.setState({ color: result.color.name });
            }
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
    this.returnAbilityString = this.returnAbilityString.bind(this);
    this.returnTypeBoxes = this.returnTypeBoxes.bind(this);
  }

  navToPrevious() {
    window.location.href =
      "/pokedex-react/#/pokeinfo/" +
      (parseInt(this.state.allInformation.id, 10) - 1);
    window.location.reload();
  }

  navToNext() {
    window.location.href =
      "/pokedex-react/#/pokeinfo/" +
      (parseInt(this.state.allInformation.id, 10) + 1);
    window.location.reload();
  }

  returnAbilityString() {
    let abilities = this.state.allInformation.abilities;

    console.log(abilities);

    if (abilities.length === 2) {
      return (
        capitalize(abilities[0].ability.name) +
        ", " +
        capitalize(abilities[1].ability.name)
      );
    } else if (abilities.length === 1) {
      return capitalize(abilities[0].ability.name);
    } else {
      return "N/A";
    }
  }

  returnTypeBoxes() {
    let types = this.state.allInformation.types;

    if (types.length === 2) {
      var orientation = "to left";
      var colorOne = convertColor(types[0].type.name);
      var colorTwo = convertColor(types[1].type.name);

      return (
        <React.Fragment>
          <span
            style={{
              backgroundColor: colorOne,
              textTransform: "uppercase",
              margin: "5px",
              padding: "2px 10px 2px 10px"
            }}
          >
            {types[0].type.name}
          </span>
          <span
            style={{
              backgroundColor: colorTwo,
              textTransform: "uppercase",
              margin: "5px",
              padding: "2px 10px 2px 10px"
            }}
          >
            {types[1].type.name}
          </span>
        </React.Fragment>
      );
    } else if (types.length === 1) {
      var colorOne = convertColor(types[0].type.name);
      return (
        <React.Fragment>
          <span
            style={{
              backgroundColor: colorOne,
              textTransform: "uppercase",
              margin: "5px",
              padding: "2px 10px 2px 10px"
            }}
          >
            {types[0].type.name}
          </span>
        </React.Fragment>
      );
    } else {
      return <span style={{ backgroundColor: convertColor("???") }}>???</span>;
    }
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

      if (bground !== null) {
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
      if (bground !== null) {
        bground.style.background = convertColor(
          allInformation.types[0].type.name
        );
      }
    } else {
      if (bground !== null) {
        bground.style.background = convertColor("???");
      }
    }

    if (this.state.isLoaded === true && this.state.error === false) {
      return (
        <div className="pokeinfo">
          <div className="pokemon-idnum">
            <span>#{this.state.idnum}</span>
          </div>
          <div className="info-box">
            <div className="typeandstat-info">
              <div className="types">{this.returnTypeBoxes()}</div>
            </div>

            <div className="sprites">
              <div className="two-sprites">
                <div>
                  {" "}
                  <strong>Normal</strong>
                </div>
                <img src={allInformation.sprites.front_default}></img>
                <img src={allInformation.sprites.back_default}></img>
              </div>

              <div className="two-sprites">
                <div>
                  <strong>Shiny</strong>
                </div>
                <img src={allInformation.sprites.front_shiny}></img>
                <img src={allInformation.sprites.back_shiny}></img>
              </div>
            </div>
          </div>
          <div className="short-description">
            <div className="genus-text">{this.state.genus}</div>

            <div className="flavor-text">{this.state.description}</div>
          </div>
          <div className="section-box" style={{ background: this.state.color }}>
            {" "}
            <span>Profile</span>
          </div>
          <div className="profile-info-box">
            <strong>Height:</strong>

            <span>
              {decimetersToCentimeters(this.state.allInformation.height)}cm
            </span>

            <strong>Weight:</strong>

            <span>
              {hectogramsToPounds(this.state.allInformation.weight)}kgs
            </span>
          </div>
          <div className="profile-info-box">
            <strong>Abilities:</strong>

            <span>{this.returnAbilityString()}</span>

            <strong>Base Experience:</strong>

            <span>{this.state.allInformation.base_experience}</span>
          </div>
          <div className="section-box" style={{ background: this.state.color }}>
            {" "}
            <span>Moves</span>
          </div>
          <div className="moves-box">
            <ul>
              {this.state.moves.map(m => (
                <div key={m.move.name}>
                  <MoveCard name={m.move.name} url={m.move.url}></MoveCard>
                </div>
              ))}
            </ul>
          </div>
          <br></br>
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
              <div className="pokemon-name"> {this.state.name}</div>
              <button
                className="previous-btn"
                type="submit"
                onClick={this.navToPrevious}
              ></button>
              <button
                className="next-btn"
                type="submit"
                onClick={this.navToNext}
              >
                <img className="next-btn-img"></img>
              </button>
            </div>
            {this.showInformation()}
            <div className="padding-bottom"></div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          {" "}
          <h1>Loading...</h1>
        </div>
      );
    }
  }
}

export default PokemonInformation;
