import React, { useState, useEffect, useRef } from 'react';
import PokemonInfo from '../PokemonInfo/PokemonInfo';
import axios from 'axios';
import './App.css';

function App() {
  const [info, setInfo] = useState({});
  const [chosen, setChosen] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState('');
  const audioEl = useRef(null);

  useEffect(() => {
    if(currentPageUrl) {
      axios.get(currentPageUrl).then(res => {
        setInfo(res.data);
        setChosen(true);
      });
    }
  }, [currentPageUrl]);

  useEffect(() => {
    document.body.style.backgroundImage = "url(background.png)";
  }, [])
  
  const choosePokemon = () => {
    const pokemon = Math.floor((Math.random() * 897) + 1);
    audioEl.current.play();
    document.body.style.backgroundImage = "url(background.png)";
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  }

  return (
    <>
      <audio ref={audioEl}><source src="whos-that-pokemon.mp3" type="audio/mpeg"></source></audio>
      {chosen ?
      <PokemonInfo 
        info={info} /> :
        null}
      <button onClick={choosePokemon}>Sort</button>
    </>
  );
}

export default App;