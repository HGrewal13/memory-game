import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=151"; //For options on changing generations, url would need to be a dependency in useEffect
  const [pokemonList, setPokemonList] = useState([]);

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
        
        results.forEach(result => {
          const id = result.url.split("/").at(-2);
          const spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          setPokemonList(...pokemonList, {name: result.name, id: id, sprite: spriteURL});
        })

        
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation: ", error);
      })
  }, [])

  return (
    <>
      <h1>Memory Game</h1>
    </>
  )
}

export default App
