import React, { Component, useEffect } from "react";
import "./pokemoncardstyle.css";
import Pokedex from "./pokedex";
import PokemonInformation from "./pokemoninformation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PokemonCard = (props) => {
  const [imageUrl, setImageUrl] = useState(props.imageUrl);
  const [name, setName] = useState(props.name);
  const [information, setInformation] = useState(props.information);
  const [moves, setMoves] = useState();
  const [abilities, setAbilities] = useState();
  const [clicked, setClicked] = useState();
  const callbackFunc = props.callbackFunc;
  const navigate = useNavigate();
  const { nameOrId } = useParams();

  const UpdateClick = () => {
    console.log(nameOrId);

    navigate('/' + information.name);

    console.log('navigating to ' + information.name);
  }
  const capitalize = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

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

  const generateTypeBar = () => {
    if (information) {
      const allInformation = information;
      let types = allInformation.types;
      // const bground = document.getElementById("card-type-gradient");
      let bgroundStyle = "";

      if (types.length === 2) {
        var orientation = "to right";
        var colorOne = convertColor(types[0].type.name);
        var colorTwo = convertColor(types[1].type.name);

        // if (bground !== null) {
        // bground.style.background =
        return ("linear-gradient(" +
          orientation + ", " +
          colorOne + " 0%," +
          colorOne + " 50%, " +
          colorTwo + " 50%, " +
          colorTwo + " 100%" +
          ")");
        //}
      } else if (types.length === 1) {
        // if (bground !== null) {
        return convertColor(
          allInformation.types[0].type.name
        );
        // }
      } else {
        // if (bground !== null) {
        return convertColor("???");
        // }
      }
    }
  }

  // useEffect(() => {
  //   generateTypeBar();
  // });

  return (
    <div onClick={UpdateClick}
      className="pokemon-image-border"
      style={props.isEvo ? { width: "20%" } : {}}
    >
      <img
        className="pokemon-image"
        src={imageUrl}
        alt={name}
      ></img>
      <div className="card-type-gradient" style={{ background: generateTypeBar() }} id="card-type-gradient"></div>
      <label>{capitalize(name)}</label>
      <div className="pokemon-id-number">#{information.id}</div>
    </div>
  );
}

export default PokemonCard;
