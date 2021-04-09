import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    setLoadingPage(true);

    let cancel;

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(cancelToken => cancel = cancelToken)
    }).then(res => {
      setPokemon(res.data.results.map(pokemon => pokemon.name));
      setPrevPageUrl(res.data.previous);
      setNextPageUrl(res.data.next);
      setLoadingPage(false);
    });

    return () => cancel();
  }, [currentPageUrl]);

  const getPrevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  }

  const getNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  }

  if(loadingPage) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        getPrevPage={prevPageUrl ? getPrevPage : null} 
        getNextPage={nextPageUrl ? getNextPage : null} />
    </>
  );
}

export default App;
