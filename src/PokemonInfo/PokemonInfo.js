import React, { useEffect, useState } from 'react';
import './PokemonInfo.css';

function PokemonInfo({ info }) {
    const [image, setImage] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [brightness, setBrightness] = useState(0);
    const [pokemon, setPokemon] = useState(false);

    const imageStyle = {
        width: "550px",
        height: "550px",
        imageRendering: "pixelated",
        filter: `brightness(${brightness}%)`
    }

    useEffect(() => {
        setImage(info.sprites.front_default);
        setBrightness(0);
        setLoaded(true);
        setPokemon(false);
    }, [info]);

    const discoverPokemon = () => {
        setBrightness(100);
        setPokemon(true);
        document.body.style.backgroundImage = "url(no-interrogation.png)";
        
        const types = info.types.map(t => t.type.name);
        const abilities = info.abilities.map(t => t.ability.name);
        const items = info.held_items.map(t => t.item.name);
        const i = new SpeechSynthesisUtterance();

        types[0] === 'electric' || types[0] === 'ice' ?
        i.text = `${info.name}, an ${types} pokémon. ` :
        i.text = `${info.name}, a ${types} pokémon. `;

        abilities.length > 1 ?
        i.text += `It may have the abilities ${abilities[0]} or ${abilities[1]} and ` :
        i.text += `Its ability is ${abilities} and `;

        items.length === 0 ?
        i.text += `it cannot come with any items.` :
        items.length === 1 ?
        i.text += `It comes with the item ${items}. ` : 
        i.text += `It comes with the items ${items[0]} and ${items[1]}. `;

        i.lang = 'en-US';
        i.rate = 1.5;
        speechSynthesis.speak(i);
    }

    return (
        <div className="div-pokemon-info">
            {!loaded ?
            <div>Loading...</div> :
            <img 
                className="pokemon-image" 
                onClick={discoverPokemon}
                src={image} 
                style={imageStyle} 
                alt='pokémon'
            />}
            <div className="interrogation-name">
                {pokemon ?
                <p>{info.name.toUpperCase()}</p> :
                null}
            </div>
        </div>
    )
}

export default PokemonInfo;