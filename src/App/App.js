import React, { useState, useEffect, useRef } from 'react';
import PokemonInfo from '../PokemonInfo/PokemonInfo';
import InitialInfo from '../InitialInfo/InitialInfo';
import axios from 'axios';
import './App.css';

function App() {
  const [info, setInfo] = useState({});
  const [chosen, setChosen] = useState(false);
  const [currentPageUrl, setCurrentPageUrl] = useState('');
  const [disabledChoice, setDisabledChoice] = useState(false);
  const audioEl = useRef(null);

  useEffect(() => {
    document.body.style.backgroundImage = "url(background.jpg)";
  }, [])

  useEffect(() => {
    if(currentPageUrl) {
      axios.get(currentPageUrl).then(res => {
        setInfo(res.data);
        setChosen(true);
      });
    }
  }, [currentPageUrl]);

  const disableChoice = () => {
    const audioDuration = audioEl.current.duration * 1000;

    setDisabledChoice(true);
    setTimeout(() => {
      setDisabledChoice(false);
    }, audioDuration);
  }

  const choosePokemon = () => {
    document.onclick = () => {
      if(!disabledChoice) {
        const pokemon = Math.floor((Math.random() * 897) + 1);
        audioEl.current.play();
        setCurrentPageUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        disableChoice();
      }
    }
  }

  return (
    <>
      <audio ref={audioEl}><source src="whos-that-pokemon.mp3" type="audio/mpeg"></source></audio>
      {chosen ?
      <PokemonInfo 
        info={info}
        disableChoice={disableChoice} /> :
      <InitialInfo />}
      {/* {choosePokemon()} */}
    </>
  );
}

export default App;