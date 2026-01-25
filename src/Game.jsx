import { useEffect, useState } from "react";
import Card from "./Card";

function Game({pokemonList, gameOver, setGameOver}) {

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

    useEffect(() => {
        if(!gameOver) return;

        handleReset();
        setGameOver(false);
    }, [gameOver])

    function handleClick(id) {
        if(previouslyChosen.includes(id)) {
            console.log("Game Over");
            setGameOver(true);
            return;
        }
        console.log("Good");
        setPreviouslyChosen(prev => [...prev, id]);
        setScore(score => score + 1);
    }

    function handleReset() {
        setScore(0);
        setPreviouslyChosen([]);
    }

    // RETURN STATEMENTS 
    if(pokemonList.length === 0) {
        return(<h1>Loading...</h1>)
    }

    return(
        <>
            <div className="scoreBoard">
                <p>Score: </p>
                <p>{score}</p>
            </div>
            <div className="cardDisplay">
                {randomIds.map(id => {
                    return <Card key = {id} pokemonList={pokemonList} id = {id} handleClick = {() => handleClick(id)}/>
                })}
            </div>
        </>
        
    )
    
}

export default Game;