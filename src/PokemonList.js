import React from 'react'

export default function PokemonList({ pokemon, pokemonImage }) {
    return (
        <div>
            {/* <div>{pokemon.map(pokemon => (<div key={pokemon}>{pokemon}</div>))}</div> */}
            <img src={pokemonImage} />
            <div>{pokemon}</div>
        </div>
    )
}
