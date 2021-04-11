import React, { useEffect } from 'react'

function PokemonList({ info }) {
    useEffect(() => {
        const u = new SpeechSynthesisUtterance();
        u.text = `${info.name}, a ${info.types.map(t => t.type.name)} pokémon.`;
        u.lang = 'en-US';
        u.rate = 2;
        speechSynthesis.speak(u);
    }, [info]);

    return (
        <div>
            <img src={info.sprites.front_default} alt='pokémon'/>
            <div>{`${info.name}, a ${info.types.map(t => t.type.name)} pokémon.`}</div>
        </div>
    )
}


export default PokemonList;