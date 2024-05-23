import React, { Component, useEffect, Suspense } from "react";
import "./pokemonstyles.css";
// import PokemonCard from "./pokemon-card";
import PokemonInformation from "./pokemoninformation";
import ErrorMessage from "./errormessage";
import LoadingScreen from "./loadingscreen";
import { useState } from "react";
import axios from "axios";
import { BsCircleFill } from 'react-icons/bs'
import { Fade } from "react-reveal";
import { Route, Routes, BrowserRouter, Router, Link } from "react-router-dom";
import ReactList from "react-list";
import LazyList from "react-list-lazy-load";
import InfiniteScroll from "react-infinite-scroll-component";

// import {
//   BrowserRouter,
//   Switch,
//   Route,
//   Link,
//   HashRouter,
//   StaticRouter
// } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import FilterButton from "./filterbutton";
import { useRef } from "react";
import LoadMore from "./loadmore";
import NoResults from "./noresults";
const PokemonCard = React.lazy(() => import('./pokemon-card'));

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

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDataList, setPokemonDataList] = useState([]);
  const [max, setMax] = useState(25);
  const [loadList, setLoadList] = useState([]);
  const [resultSize, setResultSize] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemonClicked, setPokemonClicked] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState();
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [typeFilters, setTypeFilters] = useState([]);
  const [generationFilters, setGenerationFilters] = useState([]);
  const [cf, setCf] = useState(false);
  const [sortMethod, setSortMethod] = useState('Lowest - Highest');
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);


  useEffect(() => {
    setLoading(false);
  }, [loadList])

  useEffect(() => {
    setLoadList(filterPokemon().slice(0, max));

    if (loadList.length >= resultSize) {
      setHasMoreToLoad(false);
    }
    else
      setHasMoreToLoad(true);

  }, [max, generationFilters, typeFilters, searchValue, sortMethod])

  useEffect(() => {
    setMax(25);
  }, [resultSize])

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1500")
      // .then(res => res.json())
      .then((result) => {
        // console.log(result.data.results);
        setPokemonList(result.data.results);
        result.data.results.map(pokemon => {
          axios.get(pokemon.url)
            // .then(res => res.json())
            .then((result) => {
              axios.get(result.data.species.url).then((species) => {
                if (result.data.sprites.front_default != null) {
                  setPokemonDataList(current => [...current, {
                    name: result.data.name,
                    id: result.data.id,
                    imageUrl: result.data.sprites.front_default,
                    types: [],
                    generation: species.data.generation.name,
                    allInformation: result.data,
                  }], []);
                }
              })
              // setSearchedPokemonDataList(...pokemonDataList);
            });
        });
      });
    // setData(filterPokemon());

    setPokemonDataList(filterPokemon());

  }, [])

  useEffect(() => {
    setLoadList(pokemonDataList.slice(0, max));
    // console.log("effectloadlist");
    // console.log(loadList);
    // console.log(max);

  }, [pokemonDataList])

  const capitalize = s => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const setPokemon = (pokeinfo) => {
    setSelectedPokemon(pokeinfo);
    setPokemonClicked(true);

    document.title = capitalize(pokeinfo.name);
  }

  const closePokemon = () => {
    setSelectedPokemon(null);
    setPokemonClicked(false);
    document.title = "Pokédex";
  }


  const clearFilters = () => {
    setSearchValue('');

    if (typeFilters.length >= 1) {
      setTypeFilters([]);
      setCf(!cf);
    }

    if (generationFilters.length >= 1) {
      setGenerationFilters([]);
      setCf(!cf);
    }
  }

  const filterPokemon = () => {
    let filteredArray = [];

    const filterByType = (e, f, arr) => {
      if (e.allInformation.types.length >= 2) {
        if ((e.allInformation.types[1].type.name.includes(f.toLowerCase()) ||
          e.allInformation.types[0].type.name.includes(f.toLowerCase())) && !arr.includes(e)) {
          return true;
        }
      }
      else if (e.allInformation.types.length <= 1) {
        if (e.allInformation.types[0].type.name.includes(f.toLowerCase()) && !arr.includes(e)) {
          return true;
        }
      }
      else {
        return false;
      }
    }

    const filterByGeneration = (e, f, arr) => {

      if (e.generation) {
        if ((e.generation.toLowerCase() === f.toLowerCase()) && !arr.includes(e)) {
          return true;
        }
        else {
          return false;
        }
      }
      else {
        return false;
      }
    }

    const filterByTypeAndGen = (e, t, g, arr) => {
      if (e.allInformation.types.length >= 2) {
        if ((e.allInformation.types[1].type.name.includes(t.toLowerCase()) ||
          e.allInformation.types[0].type.name.includes(t.toLowerCase())) && e.generation.toLowerCase() === g.toLowerCase() && !arr.includes(e)) {
          return true;
        }
      }
      else if (e.allInformation.types.length <= 1) {
        if (e.allInformation.types[0].type.name.includes(t.toLowerCase()) && e.generation.toLowerCase() === g.toLowerCase() && !arr.includes(e)) {
          return true;
        }
      }
      else {
        return false;
      }
    }

    let flip = false;

    if (generationFilters.length <= 0 && typeFilters.length >= 1) {
      typeFilters.map(f => {
        filteredArray = [...filteredArray, ...([...pokemonDataList].filter(e => filterByType(e, f, filteredArray)))];
      });
      flip = true;
    }

    if (typeFilters.length <= 0 && generationFilters.length >= 1) {
      generationFilters.map(f => {
        filteredArray = [...filteredArray, ...([...pokemonDataList].filter(e => filterByGeneration(e, f, filteredArray)))];
      });
    }

    if (typeFilters.length >= 1 && generationFilters.length >= 1) {
      typeFilters.map(t => {
        generationFilters.map(g => {
          filteredArray = [...filteredArray, ...([...pokemonDataList].filter(e => filterByTypeAndGen(e, t, g, filteredArray)))];
        });
      });
    }

    if (generationFilters.length <= 0 && typeFilters <= 0) {
      filteredArray = [...pokemonDataList];
    }

    if (sortMethod === 'Lowest - Highest') {
      filteredArray = filteredArray.sort((a, b) => a.id > b.id ? 1 : -1).filter(e => e.name.includes(searchValue) || e.id.toString().includes(searchValue));
    }
    else if (sortMethod === 'Highest - Lowest') {
      filteredArray = filteredArray.sort((a, b) => a.id < b.id ? 1 : -1).filter(e => e.name.includes(searchValue) || e.id.toString().includes(searchValue));
    }
    else if (sortMethod === 'A - Z') {
      filteredArray = filteredArray.sort((a, b) => a.name > b.name ? 1 : -1).filter(e => e.name.includes(searchValue) || e.id.toString().includes(searchValue));
    }
    else if (sortMethod === 'Z - A') {
      filteredArray = filteredArray.sort((a, b) => a.name < b.name ? 1 : -1).filter(e => e.name.includes(searchValue) || e.id.toString().includes(searchValue));
    }

    // previousList = [...dataCopy];
    // dataCopy = dataCopy.filter(e => e.allInformation.types[0].type.name.includes("grass"));

    setResultSize(filteredArray.length);

    return filteredArray;
  }

  const inputOnChange = (e) => {
    setSearchValue(e.target.value);
    // console.log(searchValue);
  }

  const toggleFilterMenu = (e) => {
    setShowFilterMenu(!showFilterMenu);
  }

  const appendTypeFilter = (f, remove) => {
    if (!remove) {
      setTypeFilters((typeFilters) => [...typeFilters, f]);
    } else {
      setTypeFilters((typeFilters) => typeFilters.filter(filter => {
        return filter !== f;
      }));
    }
    // console.log(typeFilters);
  }

  const appendGenerationFilter = (f, remove) => {
    if (!remove) {
      setGenerationFilters((generationFilters) => [...generationFilters, f]);
    } else {
      setGenerationFilters((generationFilters) => generationFilters.filter(filter => {
        return filter !== f;
      }));
    }
    // console.log(generationFilters);
  }

  const selectSortOrder = (e) => {
    setSortMethod(e.target.value);
    // console.log(e.target.value);
  }

  const handleScroll = (e) => {

    console.log("scrolling");
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight / 2;
    if (bottom) {
      // console.log("bottom");
    }
  }

  const fetchData = () => {
    // console.log(resultSize);

    setTimeout(() => {
      setMax(max => max + 25);
    }, 250);
  }

  return (
    (<div className="page">
      {/* <HashRouter basename={process.env.PUBLIC_URL} > */}
      <React.Fragment>
        <div className="pokedex" onScroll={handleScroll}>
          <div className="bar-left">
          </div>

          {(!loading) ? (
            <div className="pokedex-division" id="pokedex-division">
              <div className="topbar-search">

                <Fade left>
                  <div className="pokelogo-wrap">
                    <img className='pokelogo-img' src={require('./images/pokedexlogo.png')} alt='pokelogo'>
                    </img>
                  </div>
                </Fade>

                <Fade top>
                  <div className="pokemon-search-wrapper">

                    <input
                      className="pokemon-search"
                      type="text"
                      onChange={inputOnChange}
                      id="pokemon-search-bar"
                      placeholder="Search for a Pokémon..."
                      autoComplete="off"
                      spellCheck="false"
                    ></input>
                  </div>
                </Fade>

                <Fade right>
                  <div className='pokeball-wrap'>
                    {/* <BsCircleFill className="pokelight-3"></BsCircleFill>
                    <BsCircleFill className="pokelight-2"></BsCircleFill>
                    <BsCircleFill className="pokelight-1"></BsCircleFill> */}

                    {/* <img src={require("./images/redlight.png")} className="pokelight" />
                    <img src={require("./images/yellowlight.png")} className="pokelight" />
                    <img src={require("./images/greenlight.png")} className="pokelight" /> */}

                    <div className="pokelight pokelight-red"></div>
                    <div className="pokelight pokelight-yellow"></div>
                    <div className="pokelight pokelight-green"></div>

                    <img className='pokeball-img' src={require('./images/pokeball-png.png')} alt='logo'>
                    </img>
                  </div>
                </Fade>
              </div>

              <div className="pokemon-section">

                <div className="filter-separate-wrapper">
                  <hr className="separationbar" />
                  <div className="filter-bar">
                    <button className="filter-button" onClick={toggleFilterMenu}>Filters</button>
                    <img className='pokedeximage-img' src={require('./images/pokedeximage.png')} alt='pokelogo'>
                    </img>
                    <select name="sort-order" className="sort-select" onChange={selectSortOrder}>
                      <option>Lowest - Highest</option>
                      <option>Highest - Lowest</option>
                      <option>A - Z</option>
                      <option>Z - A</option>
                    </select>
                  </div>
                </div>

                <Fade opposite duration={200}>
                  <div className='filter-wrapper' key={cf} style={{ display: (showFilterMenu ? 'flex' : 'none') }}>

                    <div className='type-buttons'>
                      <FilterButton label='Normal' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Fire' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Water' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Grass' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Electric' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Ice' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Fighting' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Poison' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Ground' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Flying' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Psychic' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Bug' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Rock' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Ghost' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Dark' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Dragon' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Steel' addFilter={appendTypeFilter}></FilterButton>
                      <FilterButton label='Fairy' addFilter={appendTypeFilter}></FilterButton>
                    </div>

                    <div className="region-buttons">
                      <FilterButton label='Generation-I' addFilter={appendGenerationFilter}></FilterButton>
                      <FilterButton label='Generation-II' addFilter={appendGenerationFilter}></FilterButton>
                      <FilterButton label='Generation-III' addFilter={appendGenerationFilter}></FilterButton>
                      <FilterButton label='Generation-IV' addFilter={appendGenerationFilter}></FilterButton>
                      <FilterButton label='Generation-V' addFilter={appendGenerationFilter}></FilterButton>
                      <FilterButton label='Generation-VI' addFilter={appendGenerationFilter}></FilterButton>
                      <FilterButton label='Generation-VII' addFilter={appendGenerationFilter}></FilterButton>
                      <FilterButton label='Generation-VIII' addFilter={appendGenerationFilter}></FilterButton>
                    </div>

                    <button onClick={clearFilters} className="clearfilter-button">Clear Filters</button>
                  </div>
                </Fade>

                <Fade bottom>
                  <InfiniteScroll
                    dataLength={max} //This is important field to render the next data
                    next={fetchData}
                    hasMore={hasMoreToLoad}
                    loader={<LoadMore />}
                    endMessage={
                      <NoResults />
                    }
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="grid-wrapper">
                      <div className="grid">
                        {loadList.map(p => (
                          <PokemonCard
                            className="grid-item"
                            imageUrl={p.imageUrl}
                            name={p.name}
                            information={p.allInformation}
                            key={p.id + p.name}
                            setPokeinformation={setPokemon}
                            isEvo={false}
                          ></PokemonCard>
                        ))}
                      </div>


                      {/* {filterPokemon().map(p => (
                        <Suspense fallback={<LoadingScreen />} key={p.id + p.name}
                        >
                          <PokemonCard
                          className="grid-item"
                          imageUrl={p.imageUrl}
                          name={p.name}
                          information={p.allInformation}
                          key={p.id + p.name}
                          setPokeinformation={setPokemon}
                          isEvo={false}
                          ></PokemonCard>
                          </Suspense>
                        ))} */}


                      {/* <LazyList length={data.length} items={data} onRequestPage={<LoadingScreen />}>
                      <ReactList
                      type='uniform'
                      length={data.length}
                      itemRenderer={(index, key) => (
                          // If `items[index] == null`, the page is still being loaded.
                          data[index] != null ? (
                            <PokemonCard
                            className="grid-item"
                            imageUrl={data[index].imageUrl}
                            name={data[index].name}
                            information={data[index].allInformation}
                            key={data[index].id + data[index].name}
                            setPokeinformation={setPokemon}
                            isEvo={false}
                            ></PokemonCard>
                            ) : (
                              <LoadingScreen key={key} />
                              )
                              )}
                      />
                    </LazyList> */}
                      {/* <PokemonCard
                    className="grid-item"
                    imageUrl={p.imageUrl}
                    name={p.name}
                    information={p.allInformation}
                    key={p.id + p.name}
                    setPokeinformation={setPokemon}
                    isEvo={false}
                  ></PokemonCard> */}
                      {/* </Suspense> */}
                    </div>
                  </InfiniteScroll>
                </Fade>
              </div>

              {/* Pokemon Selected - Show info here
                <div className=''>
                {pokemonClicked ? <PokemonInformation passFunction={setPokemon} setPokeinformation={selectedPokemon} key={selectedPokemon} closeFunction={closePokemon}>
                  </PokemonInformation> : <></>}
                </div> */}

            </div>
          )
            :
            (<LoadingScreen />)}

          <div className="bar-right">

          </div>
        </div>

        {/* <Route path="/error" component={ErrorMessage}></Route> */}
      </React.Fragment >

      {
        pokemonClicked ? <PokemonInformation passFunction={setPokemon} setPokeinformation={selectedPokemon} key={selectedPokemon} closeFunction={closePokemon}>

        </PokemonInformation> : <></>}
      {/* </HashRouter > */}
    </div >)
  );
}

export default Pokedex;
