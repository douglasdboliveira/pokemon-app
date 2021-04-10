import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState('');
  const [id, setId] = useState('');
  const [pokemonImage, setPokemonImage] = useState('');
  const [currentPageUrl, setCurrentPageUrl] = useState('');

  useEffect(() => {
    if(currentPageUrl) {
      axios.get(currentPageUrl).then(res => {
        setPokemon(res.data.species.name);
        setId(res.data.id);
        setPokemonImage(res.data.sprites.front_default);
      });
    }
  }, [currentPageUrl]);

  const choosePokemon = () => {
    let pokemonName = prompt('Nome do pokémon: ');
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }

  const showShinyVersion = () => {
    setPokemonImage(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`);
  }

  return (
    <>
      {pokemon ? 
      <PokemonList 
        pokemon={pokemon} 
        pokemonImage={pokemonImage} /> : 
      null}
      <div>
        <button onClick={choosePokemon}>Escolher</button>
        <button onClick={showShinyVersion}>Shiny</button>
      </div>
    </>
  );
}

export default App;
