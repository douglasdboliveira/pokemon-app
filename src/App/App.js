import React, { useState, useEffect, useRef } from 'react';
import PokemonInfo from '../PokemonInfo/PokemonInfo';
import axios from 'axios';
import './App.css';

function App() {
  const [info, setInfo] = useState({});
  const [chosen, setChosen] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState('');
  const choosePokemonInput = useRef(null);

  useEffect(() => {
    if(currentPageUrl) {
      axios.get(currentPageUrl).then(res => {
        setInfo(res.data);
        setChosen(true);
      });
    }
  }, [currentPageUrl]);
  
  const choosePokemon = () => {
    let pokemonName = choosePokemonInput.current.value;
    pokemonName = pokemonName.toLowerCase();
    pokemonName = pokemonName.split(' ').join('-');
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }

  return (
    <>
      <div className="search-container">
        <input 
          ref={choosePokemonInput} 
          className="search-input"
          type="text" 
          placeholder="What pokémon are you looking for?" />
        <input type="submit" onClick={choosePokemon} value="Choose"/>
      </div>
      {chosen ?
      <PokemonInfo 
        info={info}
        choosePokemon={choosePokemon} /> :
        null}
    </>
  );
}

export default App;