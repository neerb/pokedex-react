import React from 'react'
import './evolutionchain.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import PokemonCard from './pokemon-card'
import { AiFillCaretRight } from 'react-icons/ai'


const EvolutionChain = (props) => {
    // const [chainInfo, setChainInfo] = useState();
    const [evolutionNames, setEvolutionNames] = useState([]);
    const [evolutionInfo, setEvolutionInfo] = useState([]);
    const urlBase = "https://pokeapi.co/api/v2/pokemon/";

    useEffect(() => {
        axios.get(props.chainUrl)
            .then((result) => {
                // setChainInfo(result.data);
                // console.log(result.data);
                getEvolutionNames(result.data);
            })

    }, []);

    const getEvolutionNames = (chainInfo) => {
        //filteredArray = [...filteredArray, ...([...pokemonDataList].filter(e => filterFunction(e, f, filteredArray)))];
        // console.log("Evolutions:");
        // Add base evolution
        setEvolutionNames(current => [...current, chainInfo.chain.species.name]);

        axios.get(urlBase + chainInfo.chain.species.name)
            .then((result) => {
                // console.log(result.data)
                setEvolutionInfo(current => [...current, result.data]);
            })
        // console.log(chainInfo.chain.species.name);

        if (chainInfo.chain.evolves_to.length > 0) {
            let currentEvolvesTo = chainInfo.chain.evolves_to;

            while (currentEvolvesTo.length > 0) {
                setEvolutionNames(current => [...current, currentEvolvesTo[0].species.name]);
                axios.get(urlBase + currentEvolvesTo[0].species.name)
                    .then((result) => {
                        // console.log(result.data)
                        setEvolutionInfo(current => [...current, result.data]);
                    })
                // console.log(currentEvolvesTo[0].species.name);
                currentEvolvesTo = currentEvolvesTo[0].evolves_to;
            }
        }

        // let sortArray = [...evolutionInfo].sort((a, b) => a.id < b.id ? 1 : -1);
        // setEvolutionInfo(sortArray);

        // console.log(evolutionInfo);
    }

    const returnEvoItem = (p) => {

        count++;
        return (
            <React.Fragment key={p.name}>
                {count > 0 ?
                    <div className='between'>
                        <AiFillCaretRight />
                    </div>
                    : (<></>)}

                <PokemonCard
                    className="evo-item"
                    imageUrl={p.sprites.front_default}
                    name={p.name}
                    information={p}
                    key={p.id + p.name}
                    setPokeinformation={props.setPokemon}
                    isEvo={true}
                ></PokemonCard>
            </React.Fragment>
        )
    }

    let count = -1;

    return (
        <div className='evolutions'>
            {/* {evolutionInfo ? evolutionInfo.map(p => <PokemonCard
                className="evo-item"
                imageUrl={p.sprites.front_default}
                name={p.name}
                information={p}
                key={p.id + p.name}
                setPokeinformation={props.setPokemon}
                isEvo={true}
            ></PokemonCard>) : (<></>)} */}

            {evolutionInfo ? evolutionInfo.map(p =>
                (returnEvoItem(p))) : (<></>)}
        </div>
    )
}

export default EvolutionChain;
