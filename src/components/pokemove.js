import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';
import './pokemove.css'

const Pokemove = (props) => {
    const [moveInfo, setMoveInfo] = useState();
    const [toggleInfo, setToggleInfo] = useState(false);

    useEffect(() => {
        if (props.moveobj) {
            fetch(props.moveobj.move.url)
                .then(res => res.json())
                .then(result => {
                    setMoveInfo(result);
                });
        }


    }, []);

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

    const displayInfo = () => {
        setToggleInfo(!toggleInfo);
    }


    return (
        moveInfo ?
            (<div className="move-toggle">
                <div className="move" onClick={displayInfo}>
                    <label>
                        {toggleInfo ? '˅' : '>'} {props.moveobj.move.name}
                    </label>

                    <div className='hr-div'>
                        <hr></hr>
                    </div>

                    <span></span>

                    <div className="move-type" style={{ background: convertColor(moveInfo.type.name) }}>
                        <div>
                            {moveInfo.type.name}
                        </div>
                    </div>
                </div>

                {
                    toggleInfo ?
                        (<div className="move-info">
                            {moveInfo.flavor_text_entries && moveInfo.flavor_text_entries.length > 0 ?
                                (<div className="move-flavor-text">
                                    {moveInfo.flavor_text_entries.filter(f => f.language.name === 'en')[0].flavor_text}
                                </div>)
                                :
                                (<></>)
                            }


                            {moveInfo && moveInfo.meta ?
                                (<React.Fragment>
                                    <div className="move-accuracy">
                                        {moveInfo.meta.category ?
                                            "- Category: " + moveInfo.meta.category.name
                                            :
                                            (<></>)
                                        }
                                    </div>


                                    {moveInfo.accuracy ?
                                        <div className="move-accuracy">
                                            {"- Accuracy: " + moveInfo.accuracy}
                                        </div>
                                        :
                                        (<></>)
                                    }

                                    {moveInfo.power ?
                                        <div className="move-accuracy">
                                            {"- Power: " + moveInfo.power}
                                        </div>
                                        :
                                        (<></>)
                                    }

                                    <div className="move-accuracy">
                                        {moveInfo.pp ?
                                            "- PP: " + moveInfo.pp
                                            :
                                            (<></>)
                                        }
                                    </div>
                                </React.Fragment>)
                                :
                                (<></>)}
                        </div>)
                        :
                        (<></>)
                }
            </div>)
            :
            (<></>)
    )
}

export default Pokemove
