import React, { Component } from "react";
import "./pokemoninformationstyles.css";
import MoveCard from "./movecard.js";
import LoadingScreen from "./loadingscreen";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Fade } from "react-reveal";
import { TypeAnimation } from "react-type-animation";
import StatBar from "./statbar";
import Pokemove from "./pokemove";
import Ability from "./ability";
import EvolutionChain from "./evolutionchain";
import DamageRelation from "./damagerelation";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AiTwotoneSound } from "react-icons/ai";
import SpiderStatGraph from "./spiderstatgraph/spiderstatgraph";

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

// function NavToPrev(props) {
//   let history = useHistory();

//   function handleClick() {
//     let n = props.currentNum - 1;

//     if (n > 0) {
//       history.push("/pokeinfo/" + n);
//       window.location.reload();
//     }
//   }

//   return (
//     <button
//       className="previous-btn"
//       type="submit"
//       onClick={handleClick}
//     ></button>
//   );
// }

// function NavToNext(props) {
//   let history = useHistory();

//   function handleClick() {
//     history.push("/pokeinfo/" + (props.currentNum + 1));
//     window.location.reload();
//   }

//   return (
//     <button className="next-btn" type="submit" onClick={handleClick}></button>
//   );
// }

const PokemonInformation = (props) => {
  // console.log(this.props.match.params);

  // this.state = {
  //   searchedName: this.props.match.params.name,
  //   name: null,
  //   idnum: null,
  //   moves: null,
  //   abilities: null,
  //   description: null,
  //   genus: null,
  //   color: null,
  //   allinformation: null,
  //   isLoaded: false,
  //   error: false
  // };

  const [initialInformation, setInitialInformation] = useState(null);
  const [information, setInformation] = useState(null);
  const [sprites, setSprites] = useState([]);
  const [spritesPos, setSpritesPos] = useState(0);
  const [currentSprite, setCurrentSprite] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const { nameOrId } = useParams();
  const statColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];


  useEffect(() => {
    console.log(nameOrId);

    if (nameOrId != "home") {
      fetchPokeInfo(nameOrId);
      setIsLoaded(true);
    }
    else {
      setIsLoaded(false);
    }
  }, []);

  useEffect(() => {
    console.log(nameOrId);

    if (nameOrId != "home") {
      fetchPokeInfo(nameOrId);
      setIsLoaded(true);
    }
    else {
      setInitialInformation(null);
      setInformation(null);
      setIsLoaded(false);
    }
  }, [nameOrId]);



  const fetchPokeInfo = (id) => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then(res => res.json())
      .then(result => {
        console.log(result);

        setInitialInformation(result);

        setSprites([result.sprites.front_default,
        result.sprites.back_default,
        result.sprites.front_shiny,
        result.sprites.back_shiny,
        result.sprites.female_default,
        result.sprites.back_female,
        result.sprites.front_female,
        result.sprites.back_shiny_female,
        result.sprites.front_shiny_female].filter(e => e));

        setCurrentSprite(result.sprites.front_default);

        if (result)
          fetch(result.species.url)
            .then(res => res.json())
            .then(result => {
              setInformation(result);
              console.log(result);
              // console.log(initialInformation)
            });
      });
  }

  // const navToPrevious = () => {
  //   if (parseInt(information.id, 10) - 1 > 0) {
  //     fetchPokeInfo(information.id - 1);
  //   }
  // }

  // const navToNext = () => {
  //   fetchPokeInfo(information.id + 1);
  // }

  const returnToPokedex = () => {
    // props.closeFunction();






    setInitialInformation(null);
    setInformation(null);

    if (nameOrId != 'home') {
      navigate('/home');
      console.log("go home");
    }
    // setIsLoaded(false);
  }

  const returnAbilityString = () => {
    let abilities = information.abilities;

    // console.log(abilities);

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

  const returnPokeTypes = () => {
    if (information) {
      // if (information.)
    }
  }

  const playCry = () => {
    document.getElementById('current-cry').play();
  }

  const navigateLeft = () => {
    if (spritesPos - 1 < 0) {
      setCurrentSprite(sprites[sprites.length - 1]);
      setSpritesPos(sprites.length - 1);
    }
    else {
      setCurrentSprite(sprites[spritesPos - 1]);
      setSpritesPos(spritesPos - 1);
    }
  }

  const navigateRight = () => {
    if (spritesPos + 1 > sprites.length - 1) {
      setCurrentSprite(sprites[0]);
      setSpritesPos(0);
    }
    else {
      setCurrentSprite(sprites[spritesPos + 1]);
      setSpritesPos(spritesPos + 1);
    }
  }

  const handleClickOutside = () => {
    returnToPokedex();
  };

  const useOutsideClick = () => {
    const ref = React.useRef();

    React.useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          returnToPokedex();
        }
      };

      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);
    return ref;
  };

  const ref = useOutsideClick(handleClickOutside);

  const formatGeneration = (g) => {
    let newstr = '';

    return g.substring(0, g.indexOf('-')) + g.substring(g.indexOf('-'), g.length).toUpperCase();
  }

  return (
    isLoaded ?
      (<Fade opposite top duration={300} key={nameOrId}>
        {
          initialInformation && information ?
            <div className="pokeinfo-wrapper">
              <div
                className="pokemon-information-background"
                id="pokemon-information-background"
              >
                <div className="navbar-top">
                  <div className="pokemon-name"> {initialInformation.name ? initialInformation.name : ""}</div>
                  {/* {this.displayPrevButton()} */}
                  {/* <NavToNext currentNum={idNum}></NavToNext> */}
                </div>
                {/* {showInformation()} */}

                {information && initialInformation ? (
                  <div className="info-scroller">
                    {/* <div className='prev' onClick={navToPrevious}>
                </div> */}
                    <div className="information-form" ref={null}>
                      <div className="pokedexlights">
                        <img src={require("./images/pokedexlight.png")} className="pokelight1" />
                        <div className="pokelight pokelight-red"></div>
                        <div className="pokelight pokelight-yellow"></div>
                        <div className="pokelight pokelight-green"></div>

                        <hr></hr>
                        <label>#{information ? information.id : null}</label>
                        <hr></hr>
                      </div>

                      <div className="wrap-upper-info">
                        <div className="pokeimage-window-panel">
                          <div className="upperpanel-wrapper">
                            <div className="top-lights"></div>
                            <div className="top-lights"></div>
                            {/* <img className='top-lights' src={require("./images/redlight.png")} />
                      <img className='top-lights' src={require("./images/redlight.png")} /> */}
                          </div>

                          <div className="pokeimage-screen">

                            <div className="gen-type-wrap">
                              <div className="generation">
                                <div className="pokeball-pin" style={{ marginRight: "4px" }}></div>
                                {formatGeneration(information.generation.name)}
                                <div className="pokeball-pin" style={{ marginLeft: "4px" }}></div>
                              </div>

                              {/* <hr style={{ width: "100%", border: "2px dashed lightblue", height: 0, margin: "auto 3px" }}></hr> */}

                              <div className="pokeimage-screen_types">
                                <div className="poketype" style={{ background: convertColor(initialInformation.types[0].type.name) }}>
                                  {initialInformation.types[0].type.name}
                                </div>
                                {initialInformation.types[1] ?
                                  (<div className="poketype" style={{ background: convertColor(initialInformation.types[1].type.name) }}>
                                    {initialInformation.types[1].type.name}
                                  </div>) : (<></>)}
                              </div>
                            </div>

                            {/* <div className="pokeimage-screen_types">
                        <div className="poketype" style={{ background: convertColor(initialInformation.types[0].type.name) }}>
                          {initialInformation.types[0].type.name}
                        </div>
                        {initialInformation.types[1] ?
                          (<div className="poketype" style={{ background: convertColor(initialInformation.types[1].type.name) }}>
                            {initialInformation.types[1].type.name}
                          </div>) : (<></>)}
                      </div> */}

                            <div className="pokemon-floaters-info-wrap">
                              {/* Image gallery */}
                              <div className="image-gallery">
                                <div className="image-gallery_wrapper">
                                  <div className="image-gallery_background">
                                    <Fade duration={400}>
                                      <img key={currentSprite} className="current-sprite" src={currentSprite}>
                                      </img>
                                    </Fade>
                                  </div>
                                </div>

                                <div className="image-gallery-nav">
                                  <div className="gallery-left">
                                    <div className="left-arrow-clip" onClick={navigateLeft}></div>
                                  </div>

                                  {/* <hr></hr> */}

                                  <div className="gallery-right">
                                    <div className="right-arrow-clip" onClick={navigateRight}></div>
                                  </div>
                                </div>
                              </div>

                              {/* Misc Info on right side */}
                              <div className="floating-misc-info">
                                <div className="name-id-floater">
                                  <div className="idnamefloat">
                                    <div className="pokeball-pin2"></div>
                                    {"#" + information.id}
                                    {" "}
                                    {information.name}
                                  </div>
                                  <div className="funfloat">
                                    {(information.habitat ? information.habitat.name : "???") + " Pokemon"}
                                  </div>
                                </div>

                                <div className="height-weight-floater">
                                  <div className="wh-info">
                                    <label>HT:</label>
                                    <label>{initialInformation.height / 10}m</label>
                                  </div>
                                  <div className="height-weight-floater-separator"></div>
                                  <div className="wh-info">
                                    <label>WT:</label>
                                    <label>{initialInformation.weight / 10}kg</label>
                                  </div>
                                </div>

                                {
                                  initialInformation.cries ?
                                    <div className="cry-floater-wrap">
                                      {
                                        initialInformation.cries.latest ?
                                          <audio id="current-cry" src={initialInformation.cries.latest} />
                                          :
                                          (
                                            initialInformation.cries.legacy ?
                                              <audio id="current-cry" src={initialInformation.cries.legacy} />
                                              :
                                              <></>
                                          )
                                      }
                                      <AiTwotoneSound className="cry-icon" onClick={playCry} />
                                    </div>

                                    :
                                    <></>
                                }

                                <div className="separationbar-floater">
                                </div>
                              </div>
                            </div>


                            {/* Flavor Text */}
                            {information.flavor_text_entries ?
                              (<div className="flavor-text" key={information}>
                                {/* <TypeAnimation className="flavor-text-actual" sequence={["> " + information.flavor_text_entries.filter(e => e.language.name === 'en')[0].flavor_text.replace('\f', ' ')]} cursor={false} speed={70} /> */}
                                <div className="flavor-text-actual">
                                  {["> " + information.flavor_text_entries.filter(e => e.language.name === 'en')[0].flavor_text.replace('\f', ' ')]}
                                </div>

                                <div className="fill-space-flavor">
                                  {["> " + information.flavor_text_entries.filter(e => e.language.name === 'en')[0].flavor_text.replace('\f', ' ')]}
                                </div>
                              </div>) : null}

                          </div>
                          {/* Posture */}

                          <div className="underscreen-decor">
                            <div className="underscreen-light" />
                            <img className="hamburger-decor" src={require("./images/hamburger.png")} />
                          </div>
                        </div>

                        <div className="wrap-special-stats-diagram">
                          <div className="misc-info-wrapper">
                            <div className="misc-info">
                              {
                                information.shape ?
                                  <>
                                    <label>Posture: <span>{information.shape.name}</span></label>
                                  </>
                                  :
                                  <></>
                              }
                            </div>
                          </div>

                          <div className="misc-info-wrapper">
                            <div className="misc-info">
                              {
                                information.capture_rate ?
                                  <>
                                    <label>Capture Rate: <span>{information.capture_rate}</span></label>
                                  </>
                                  :
                                  <></>
                              }
                            </div>
                          </div>

                          {/* <div className="special-skill-wrapper">

                            <div className="special-skill-diagram">
                              <SpiderStatGraph data={initialInformation.stats}/>
                            </div>
                          </div> */}

                        </div>

                      </div>

                      {/* Stat bars */}
                      <div className="stats-label">
                        <div className="bolt" />
                        <div className="title-grouping">
                          <label className="stat-label">Stats</label>
                          <hr></hr>
                        </div>
                        <div className="bolt" />
                      </div>
                      <div className="base-stat-wrapper">
                        {initialInformation.stats.map((s, i) => (<StatBar key={s.stat.name} color={statColors[i]} stat={s} />))}
                      </div>

                      <div className="special-skill-wrapper">
                        <div className="special-skill-diagram">
                          <SpiderStatGraph data={initialInformation.stats} />
                        </div>
                      </div>



                      {/* Abilities */}
                      {initialInformation.abilities && initialInformation.abilities.length > 0 ?
                        (
                          <div className="stats-label">
                            <div className="bolt" />
                            <div className="title-grouping">
                              <label className="stat-label">Abilities</label>
                              <hr></hr>
                            </div>
                            <div className="bolt" />
                          </div>
                        )
                        :
                        (<></>)}

                      {initialInformation.abilities && initialInformation.abilities.length > 0 ?
                        (<div className="abilities-wrapper">
                          {initialInformation.abilities.map(s => (<Ability key={s.ability.name} abilityobj={s} />))}
                        </div>)
                        :
                        (<></>)}

                      {/* Habitat */}
                      {information.habitat ?
                        (<div className="stats-label">
                          <div className="bolt" />
                          <div className="title-grouping">
                            <label className="stat-label">Habitat</label>
                            <hr></hr>
                          </div>
                          <div className="bolt" />
                        </div>) : (<></>)}

                      {information.habitat ?
                        (<div className="habitat-wrapper">
                          <div className="habitat-screen">
                            <div className="habitat-info">
                              <Fade bottom>
                                <img className="habitat-img" src={require("./images/habitats/" + information.habitat.name + ".png")} />
                              </Fade>
                              <TypeAnimation sequence={["> " + ((information.habitat.name === 'rare') ? 'origin-unknown' : information.habitat.name)]} cursor={true} speed={70} />
                            </div>
                          </div>
                        </div>) : (<></>)}




                      {/* Evolutions */}
                      {information.evolution_chain ?
                        (
                          <React.Fragment>
                            <div className="stats-label">
                              <div className="bolt" />
                              <div className="title-grouping">
                                <label className="stat-label">Evolutions</label>
                                <hr></hr>
                              </div>
                              <div className="bolt" />
                            </div>

                            <div className="evolutions-wrapper">
                              <EvolutionChain setPokemon={props.passFunction} chainUrl={information.evolution_chain.url} />
                            </div>
                          </React.Fragment>
                        ) : (<></>)}

                      {/* Moves */}
                      <div className="stats-label">
                        <div className="bolt" />
                        <div className="title-grouping">
                          <label className="stat-label">Moves</label>
                          <hr></hr>
                        </div>
                        <div className="bolt" />
                      </div>

                      <div className="moves-wrapper">
                        {initialInformation.moves.map(s => (<Pokemove key={s.move.name} moveobj={s} />))}
                      </div>

                      {/* Damage Relation Info */}
                      {initialInformation.types ?
                        (
                          <React.Fragment>
                            <div className="stats-label">
                              <div className="bolt" />
                              <div className="title-grouping">
                                <label className="stat-label">Damage Relations</label>
                                <hr></hr>
                              </div>
                              <div className="bolt" />
                            </div>

                            <div className="damage-info">
                              <DamageRelation type={initialInformation.types}></DamageRelation>
                            </div>
                          </React.Fragment>
                        ) : (<></>)
                      }
                    </div>
                  </div>) : (<LoadingScreen />)}

                <div className="return-link" onClick={returnToPokedex}>

                  <img src={require('./images/uparrow.png')} />
                  <img src={require('./images/uparrow.png')} />
                  <img src={require('./images/uparrow.png')} />
                </div>
              </div>
            </div>
            :
            <></>
        }
      </Fade >)
      :
      <></>
    // (<LoadingScreen />)
  );
}
export default PokemonInformation;
