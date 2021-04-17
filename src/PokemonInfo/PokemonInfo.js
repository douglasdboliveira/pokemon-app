import React, { useEffect, useState } from 'react';
import './PokemonInfo.css';

function PokemonInfo({ info }) {
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
    }, [info]);

    return (
        <>
            <div className="pokemon-info">
                <div className="displayed-info">
                    {!loaded ?
                    <div>Loading...</div> :
                    <img className="pokemon-image"src={image} alt='pokémon'/>}
                    <table>
                        <thead>
                            <tr>
                                <th>#{info.id}</th>
                                <th>{info.name.toUpperCase()}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Type</th>
                                    <th>
                                        {info.types.length > 1 ?
                                        `${info.types[0].type.name}/${info.types[1].type.name}` :
                                        info.types[0].type.name}
                                    </th>
                                </tr>
                            <tr>
                                <th>Ability</th>
                                <th>
                                    {info.abilities.length > 1 ?
                                    `${info.abilities[0].ability.name}/${info.abilities[1].ability.name}` :
                                    info.abilities[0].ability.name}
                                </th>
                            </tr>
                            <tr>
                                <th>Held Items</th>
                                <th>
                                    {info.held_items.length > 1 ?
                                    `${info.held_items[0].item.name}/${info.held_items[1].item.name}` :
                                    info.held_items[0] ? info.held_items[0].item.name : 'none'}
                                </th>
                            </tr>
                            <tr>
                                <th>Height</th>
                                <th>{info.height/10} m</th>
                            </tr>
                            <tr>
                                <th>Weight</th>
                                <th>{info.weight} kg</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="shiny-default-button">
                {image === info.sprites.front_default ?
                (<button onClick={() => setImage(info.sprites.front_shiny)}>Shiny</button>) : 
                (<button onClick={() => setImage(info.sprites.front_default)}>Default</button>)}
            </div>
        </>
    )
}


export default PokemonInfo;