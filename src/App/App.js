import React, { useState, useEffect } from 'react';
import PokemonInfo from '../PokemonInfo/PokemonInfo';
import axios from 'axios';
import './App.css';

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
    let pokemon = Math.floor((Math.random() * 897) + 1);
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  }

  return (
    <>
      {chosen ?
      <PokemonInfo 
        info={info}
        choosePokemon={choosePokemon} /> :
        null}
      <button onClick={choosePokemon}>Sort</button>
    </>
  );
}

export default App;