import React, { Component } from "react";
import "./movecard.css";

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

const fixString = s => {
  if (typeof s !== "string") return "";

  var len = s.length;
  var newStr = "";

  for (var i = 0; i < len; i++) {
    if (s.charAt(i) === "-") {
      newStr += " ";
    } else {
      newStr += s.charAt(i);
    }
  }

  return newStr;
};

class MoveCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      type: null,
      color: null
    };
    fetch(props.url)
      .then(res => res.json())
      .then(result => {
        this.setState({
          name: result.name,
          type: result.type.name,
          color: convertColor(result.type.name)
        });
      });

    this.routeToInformation = this.routeToInformation.bind(this);
    this.updateClick = this.updateClick.bind(this);
  }

  updateClick() {
    this.setState({ clicked: true });
    window.location.href = "/pokeinfo/" + this.state.name;
  }

  routeToInformation() {}

  render() {
    return (
      <div className="move-card">
        <div className="name">{fixString(this.state.name)}</div>
        <div style={{ backgroundColor: this.state.color }} className="type-box">
          {this.state.type}
        </div>
      </div>
    );
  }
}

export default MoveCard;
