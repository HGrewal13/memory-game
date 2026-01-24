import { useEffect, useState } from "react";
import Card from "./Card";

function Game({pokemonList}) {

    const [randomIds, setRandomIds] = useState([]);
    const [previouslyChosen, setPreviouslyChosen] = useState([]);
    const [score, setScore] = useState(0);

    function randomNumberGenerator() {
        return Math.floor(Math.random() * 151) + 1;
    }

    function choosePokemon() {
        const chosen = [];
        for(let i = 0; i < 8; i++) {
            let id = randomNumberGenerator();
            
            while(chosen.includes(id)) {
                id = randomNumberGenerator();
            }
            chosen.push(id);
        }
        setRandomIds(chosen);
    }

    useEffect(() => {
        if(pokemonList.length > 0) {
            choosePokemon();
        }
    }, [pokemonList, score])

    function handleClick(id) {
        if(previouslyChosen.includes(id)) {
            console.log("Game Over");
        }
        console.log("Good");
        setPreviouslyChosen(prev => [...prev, id]);
        setScore(score => score + 1);
    }

    // RETURN STATEMENTS 
    if(pokemonList.length === 0) {
        return(<h1>Loading...</h1>)
    }

    return(
        <div className="cardDisplay">
            {randomIds.map(id => {
                return <Card key = {id} pokemonList={pokemonList} id = {id} handleClick = {() => handleClick(id)}/>
            })}
        </div>
    )
    
}

export default Game;