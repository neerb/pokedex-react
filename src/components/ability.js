import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';
import './ability.css'

const Ability = (props) => {
    const [abilityInfo, setAbilityInfo] = useState();

    useEffect(() => {
        if (props.abilityobj) {
            fetch(props.abilityobj.ability.url)
                .then(res => res.json())
                .then(result => {
                    setAbilityInfo(result);
                    // console.log(result);
                });
        }
    }, []);

    return (
        abilityInfo && abilityInfo.flavor_text_entries && abilityInfo.flavor_text_entries.length > 0 ?
            (<div className='ability' >
                <label>
                    {props.abilityobj.ability.name}
                </label>

                <div >
                    {abilityInfo.flavor_text_entries.filter(f => f.language.name === 'en')[0].flavor_text}
                </div>
            </div >)
            :
            (<></>)
    )
}

export default Ability