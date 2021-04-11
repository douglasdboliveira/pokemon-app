import React, { useEffect, useState } from 'react'

function PokemonList({ info }) {
    const [image, setImage] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setImage(info.sprites.front_default);
        setLoaded(true);

        const types = info.types.map(t => t.type.name);
        const abilities = info.abilities.map(t => t.ability.name);
        const items = info.held_items.map(t => t.item.name);
        const i = new SpeechSynthesisUtterance();

        types[0] === 'electric' || types[0] === 'ice' ?
        i.text = `${info.name}, an ${types} pokémon. ` :
        i.text = `${info.name}, a ${types} pokémon. `;

        abilities.length > 1 ?
        i.text += `It may have the abilities ${abilities[0]} and ${abilities[1]} and ` :
        i.text += `Its ability is ${abilities} and `;

        items.length === 0 ?
        i.text += `it cannot come with any items.` :
        items.length === 1 ?
        i.text += `It comes with the item ${items}. ` : 
        i.text += `It comes with the items ${items[0]} and ${items[1]}. `;

        i.lang = 'en-US';
        i.rate = 1.5;
        speechSynthesis.speak(i);
    }, [info]);

    return (
        <div>
            {!loaded ?
            <div>Loading...</div> :
            <div>
                <img src={image} alt='pokémon'/>
            </div>}
            <div>
                {image === info.sprites.front_default ?
                (<button onClick={() => setImage(info.sprites.front_shiny)}>Shiny</button>) : 
                (<button onClick={() => setImage(info.sprites.front_default)}>Default</button>)}
            </div>
        </div>
    )
}


export default PokemonList;