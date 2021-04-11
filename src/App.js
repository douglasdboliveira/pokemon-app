import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';

function App() {
  const [info, setInfo] = useState({});
  const [chosen, setChosen] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState('');

  useEffect(() => {
    if(currentPageUrl) {
      axios.get(currentPageUrl).then(res => {
        setInfo(res.data);
        setChosen(true);
      });
    }
  }, [currentPageUrl]);
  
  const choosePokemon = () => {
    let pokemonName = prompt('Nome do pokémon: ');
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }

  return (
    <>
      {chosen ?
      <PokemonList 
        info={info} /> :
        null}
        <button onClick={choosePokemon}>Choose</button>
    </>
  );
}

export default App;