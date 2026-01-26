import { useEffect, useState } from "react";
import Card from "./Card";

function Game({pokemonList, gameOver, setGameOver}) {

    const [randomIds, setRandomIds] = useState([]);
    const [previouslyChosen, setPreviouslyChosen] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [flipped, setFlipped] = useState(false);

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
        setFlipped(true);
        // score will remain the previous value until the function finishes executing and then re-renders the component.
        // this is why highScore trails by 1.
        // state variables never change inside the same render.
        setScore(prev => {
            const newScore = prev + 1;
            setHighScore(hs => Math.max(hs, newScore));
            return newScore;
        });
        setTimeout(() => setFlipped(false), 600);
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
        <div className="game">
            <div className="scoreBoard">
                <p>Score: {score}</p>
                <p>Highscore: {highScore}</p>
            </div>
            <div className="cardDisplay">
                {randomIds.map(id => {
                    return <Card 
                                key = {id} 
                                pokemonList={pokemonList} 
                                id = {id} 
                                handleClick = {() => handleClick(id)}
                                flipped = {flipped}
                            />
                })}
            </div>
        </div>
        
    )
    
}

export default Game;