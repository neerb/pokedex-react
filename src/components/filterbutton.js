import React from 'react'
import './filterbutton.css'
import { useEffect } from 'react'
import { useState } from 'react'

const FilterButton = (props) => {

    const [toggled, setToggled] = useState(false);
    const [isTypeButton, setTypeButton] = useState(true);

    const onToggle = () => {
        setToggled(!toggled)
        props.addFilter(props.label, toggled);
    }

    const convertColor = c => {
        c = c.toLowerCase();

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

    const calcBorderColor = (c) => {
        if (c.toLowerCase().includes('region')) {
            return '3px solid navy';
        }
        else {
            return '';
        }
    }

    return (
        <div className="f-button-wrapper">
            <button className="f-button" style={{ backgroundColor: convertColor(props.label), border: calcBorderColor(props.label) }} onClick={onToggle}>
                {toggled ? <img src={require('./images/checkmark.png')} alt=''></img> : <></>}
                {props.label}
            </button>
        </div >
    )
}

export default FilterButton
