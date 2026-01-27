import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Game from './Game';

function App() {
  
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=151"; //For options on changing generations, url would need to be a dependency in useEffect
  const [pokemonList, setPokemonList] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [display, setDisplay] = useState("menu");
  const [gameOver, setGameOver] = useState(false);

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
        console.log(results);
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


  function handleSubmit(e) {
    e.preventDefault();
    const difficulty = e.target.difficulty.value;
    console.log(difficulty);
    setDifficulty(difficulty);
    setDisplay("game");
  }

  // Return statements

  if(display === "menu") {
    return (
      <div id="app">
        <form className='menu' onSubmit={handleSubmit}>
          <p>Select your difficulty level:</p>
          <div>
            <input type="radio" name="difficulty" id="easy" value="easy"/>
            <label htmlFor="easy">Easy</label>
          </div>
          <div>
            <input type="radio" name="difficulty" id="medium" value="medium"/>
            <label htmlFor="medium">Medium</label>
          </div>
          <div>
            <input type="radio" name="difficulty" id="hard" value="hard"/>
            <label htmlFor="hard">Hard</label>
          </div>
          <button type="submit">Set</button>
        </form>
      </div>

    )
  }

  return (
    <div id='app'>
      <header>
        <h1>Memory Game</h1>
      </header>
      
      <Game pokemonList = {pokemonList} gameOver = {gameOver} setGameOver = {setGameOver} difficulty = {difficulty}/>
    </div>
  )
}

export default App
