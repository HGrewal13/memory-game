import { useEffect, useState } from "react";
import Card from "./Card";

function Game({pokemonList, gameOver, setGameOver, difficulty}) {

    // an array of all the pokemon that will be part of the full game on given difficulty
    const [gamePokemon, setGamePokemon] = useState([]);
    // an array for the pokemon that will be displayed for the round
    const [roundPokemon, setRoundPokemon] = useState([]);
    const [chosenMons, setChosenMons] = useState([]);



    const [randomIds, setRandomIds] = useState([]);
    const [previouslyChosen, setPreviouslyChosen] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [flipped, setFlipped] = useState(false);

    function randomNumberGenerator() {
        return Math.floor(Math.random() * 151) + 1;
    }

    function randomNumGeneratorControlled(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function choosePokemon() {
        const chosen = [];
        let numberOfCards = 0;
        let totalMons = 0;
        let roundMons = 0;
        
        switch (difficulty) {
            case "easy":
                totalMons = 5;
                roundMons = 3;
                break;
            
            case "medium":
                totalMons = 10;
                roundMons = 4;
                break;
            
            case "hard":
                totalMons = 20;
                roundMons = 5;
                break;
        }

        for(let i = 0; i < totalMons; i++) {
            let id = randomNumberGenerator();
            
            while(chosen.includes(id)) {
                id = randomNumberGenerator();
            }
            chosen.push(id);
        }
        setRandomIds(chosen);
        setGamePokemon(chosen);
    }

    // Choose pokemon for the round from among gamePokemon state
    function chooseRoundPokemon() {
        let totalMons = 0;
        let roundMons = 0;
        switch (difficulty) {
            case "easy":
                totalMons = 5;
                roundMons = 3;
                break;
            
            case "medium":
                totalMons = 10;
                roundMons = 4;
                break;
            
            case "hard":
                totalMons = 20;
                roundMons = 5;
                break;
        }

        console.log("game pokemon: " + gamePokemon);

        const chosen = [];
        for(let i = 0; i < gamePokemon.length - 1; i++) {
            let index = randomNumGeneratorControlled(gamePokemon.length - 1);

            while(chosen.includes(index)) {
                index = randomNumGeneratorControlled(gamePokemon.length - 1);
            }
            chosen.push(index);
        }
        setChosenMons(chosen);
    }

    // useEffect(() => {
    //     if(pokemonList.length > 0) {
    //         choosePokemon();
    //     }
        
    // }, [pokemonList, score])

    useEffect(() => {
        if(pokemonList.length > 0) {
            choosePokemon();
        }
    }, [pokemonList])

    useEffect(() => {
        if(gamePokemon.length > 0) {
            chooseRoundPokemon();
        }
    }, [gamePokemon, score])

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
                {/* {randomIds.map(id => {
                    return <Card 
                                key = {id} 
                                pokemonList={pokemonList} 
                                id = {id} 
                                handleClick = {() => handleClick(id)}
                                flipped = {flipped}
                            />
                })} */}
                {roundPokemon.map(id => {
                    return <Card 
                                key = {gamePokemon[id]} 
                                pokemonList={gamePokemon} 
                                id = {gamePokemon[id]} 
                                handleClick = {() => handleClick(id)}
                                flipped = {flipped}
                            />
                })}
            </div>
        </div>
        
    )
    
}

export default Game;