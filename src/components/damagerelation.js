import React, { Component } from "react";
import "./damagerelation.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

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

const DamageRelation = (props) => {

    const [typeArray, setTypeArray] = useState([]);
    const [type1, setType1] = useState();
    const [type2, setType2] = useState();

    useEffect(() => {
        setTypeArray(props.type);
    }, []);

    useEffect(() => {
        if (typeArray.length === 1) {
            axios.get(typeArray[0].type.url)
                .then((result) => {
                    setType1(result.data);
                });
        }
        else if (typeArray.length === 2) {
            axios.get(typeArray[0].type.url)
                .then((result) => {
                    setType1(result.data);
                });
            axios.get(typeArray[1].type.url)
                .then((result) => {
                    setType2(result.data);
                });
        }

    }, [typeArray]);


    return (
        <div className="damage-relations">
            {typeArray && type1 ?
                <div className="damage-modifier-list">
                    <div className="relation">
                        <div className="relation-info">
                            <div style={{ backgroundColor: convertColor(type1.name) }} className="tbox">
                                {type1.name}
                            </div>
                            <div>
                                receives <span style={{ color: 'gold' }}>2x</span> damage FROM:
                            </div>
                        </div>

                        <hr className="hr-bar"></hr>

                        <div className="relation-types">
                            {type1.damage_relations.double_damage_from.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                        </div>
                    </div>

                    <div className="relation">
                        <div className="relation-info">
                            <div style={{ backgroundColor: convertColor(type1.name) }} className="tbox">
                                {type1.name}
                            </div>
                            <div>
                                causes <span style={{ color: 'gold' }}>2x</span> damage TO:
                            </div>
                        </div>

                        <hr className="hr-bar"></hr>

                        <div className="relation-types">
                            {type1.damage_relations.double_damage_to.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                        </div>
                    </div>

                    <div className="relation">
                        <div className="relation-info">
                            <div style={{ backgroundColor: convertColor(type1.name) }} className="tbox">
                                {type1.name}
                            </div>
                            <div>
                                receives <span style={{ color: 'aqua' }}>0.5x</span> damage FROM:
                            </div>
                        </div>

                        <hr className="hr-bar"></hr>

                        <div className="relation-types">
                            {type1.damage_relations.half_damage_from.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                        </div>
                    </div>

                    <div className="relation">
                        <div className="relation-info">
                            <div style={{ backgroundColor: convertColor(type1.name) }} className="tbox">
                                {type1.name}
                            </div>
                            <div>
                                causes <span style={{ color: 'aqua' }}>0.5x</span> damage TO:
                            </div>
                        </div>

                        <hr className="hr-bar"></hr>

                        <div className="relation-types">
                            {type1.damage_relations.half_damage_to.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                        </div>
                    </div>

                    <div className="relation">
                        <div className="relation-info">
                            <div style={{ backgroundColor: convertColor(type1.name) }} className="tbox">
                                {type1.name}
                            </div>
                            <div>
                                receives <span style={{ color: 'darkgrey' }}>no</span> damage FROM:
                            </div>
                        </div>

                        <hr className="hr-bar"></hr>

                        <div className="relation-types">
                            {type1.damage_relations.no_damage_from.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                        </div>
                    </div>

                    <div className="relation">
                        <div className="relation-info">
                            <div style={{ backgroundColor: convertColor(type1.name) }} className="tbox">
                                {type1.name}
                            </div>
                            <div>
                                causes <span style={{ color: 'darkgrey' }}>no</span> damage to:
                            </div>
                        </div>

                        <hr className="hr-bar"></hr>

                        <div className="relation-types">
                            {type1.damage_relations.no_damage_to.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                        </div>
                    </div>

                    {type2 ? (
                        <React.Fragment>
                            <div className="relation">
                                <div className="relation-info">
                                    <div style={{ backgroundColor: convertColor(type2.name) }} className="tbox">
                                        {type2.name}
                                    </div>
                                    <div>
                                        receives <span style={{ color: 'gold' }}>2x</span> damage FROM:
                                    </div>
                                </div>

                                <hr className="hr-bar"></hr>

                                <div className="relation-types">
                                    {type2.damage_relations.double_damage_from.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                                </div>
                            </div>

                            <div className="relation">
                                <div className="relation-info">
                                    <div style={{ backgroundColor: convertColor(type2.name) }} className="tbox">
                                        {type2.name}
                                    </div>
                                    <div>
                                        causes <span style={{ color: 'gold' }}>2x</span> damage TO:
                                    </div>
                                </div>

                                <hr className="hr-bar"></hr>

                                <div className="relation-types">
                                    {type2.damage_relations.double_damage_to.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                                </div>
                            </div>

                            <div className="relation">
                                <div className="relation-info">
                                    <div style={{ backgroundColor: convertColor(type2.name) }} className="tbox">
                                        {type2.name}
                                    </div>
                                    <div>
                                        receives <span style={{ color: 'aqua' }}>0.5x</span> damage FROM:
                                    </div>
                                </div>

                                <hr className="hr-bar"></hr>

                                <div className="relation-types">
                                    {type2.damage_relations.half_damage_from.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                                </div>
                            </div>

                            <div className="relation">
                                <div className="relation-info">
                                    <div style={{ backgroundColor: convertColor(type2.name) }} className="tbox">
                                        {type2.name}
                                    </div>
                                    <div>
                                        causes <span style={{ color: 'aqua' }}>0.5x</span> damage TO:
                                    </div>
                                </div>

                                <hr className="hr-bar"></hr>

                                <div className="relation-types">
                                    {type2.damage_relations.half_damage_to.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                                </div>
                            </div>

                            <div className="relation">
                                <div className="relation-info">
                                    <div style={{ backgroundColor: convertColor(type2.name) }} className="tbox">
                                        {type2.name}
                                    </div>
                                    <div>
                                        receives <span style={{ color: 'darkgrey' }}>no</span> damage FROM:
                                    </div>
                                </div>

                                <hr className="hr-bar"></hr>

                                <div className="relation-types">
                                    {type2.damage_relations.no_damage_from.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                                </div>
                            </div>

                            <div className="relation">
                                <div className="relation-info">
                                    <div style={{ backgroundColor: convertColor(type2.name) }} className="tbox">
                                        {type2.name}
                                    </div>
                                    <div>
                                        causes <span style={{ color: 'darkgrey' }}>no</span> damage to:
                                    </div>
                                </div>

                                <hr className="hr-bar"></hr>

                                <div className="relation-types">
                                    {type2.damage_relations.no_damage_to.map(type => (<div style={{ backgroundColor: convertColor(type.name) }} className="tbox" key={type.name}>{type.name}</div>))}
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (<></>)}
                </div>
                : <></>}
        </div >
    )
}

export default DamageRelation;
