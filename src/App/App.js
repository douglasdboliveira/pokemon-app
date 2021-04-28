import React, { useState, useEffect, useRef } from 'react';
import PokemonInfo from '../PokemonInfo/PokemonInfo';
import axios from 'axios';
import './App.css';

function App() {
  const [info, setInfo] = useState({});
  const [chosen, setChosen] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState('');
  const [disabledElement, setDisabledElement] = useState(false);
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
    setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    disableButton();
  }

  const disableButton = () => {
    setDisabledElement(true);
    setTimeout(() => setDisabledElement(false), 7000);
  }

  return (
    <>
      <audio ref={audioEl}><source src="whos-that-pokemon.mp3" type="audio/mpeg"></source></audio>
      {chosen ?
      <PokemonInfo 
        info={info}
        disableButton={disableButton} /> :
        null}
      <button onClick={choosePokemon} disabled={disabledElement}>Sort</button>
    </>
  );
}

export default App;