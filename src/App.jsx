import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './Game';

function App() {
  
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=151"; //For options on changing generations, url would need to be a dependency in useEffect
  const [pokemonList, setPokemonList] = useState([]);

  // API CALL & STORE INFORMATION INTO POKEMONLIST STATE VARIABLE
  useEffect(() => {
    fetch(url)
      .then(response => {
        if(!response.ok) {
          throw new Error("No response");
        }
        return response.json();
      })
      .then(data => {
        const results = data.results;

        const list = results.map(result => {
          const id = parseInt(result.url.split("/").at(-2));
          const spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return {name: result.name, id: id, sprite: spriteURL}
        })
        setPokemonList(list);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation: ", error);
      })
  }, [])

  return (
    <>
      <h1>Memory Game</h1>
      <Game pokemonList = {pokemonList}/>
    </>
  )
}

export default App
