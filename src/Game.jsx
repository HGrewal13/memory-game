import { useEffect, useState } from "react";
import Card from "./Card";

function Game({pokemonList, gameOver, setGameOver, difficulty, setDisplay}) {
    // The pokemon that will be used for this specific instance of the game
    const [gamePokemon, setGamePokemon] = useState([]);
    // Leeps track of how many cards we need per round
    const [cardsPerRound, setCardsPerRound] = useState(0);
    // The pokemon that will be shown for the round. Derived from gamePokemon
    const [roundPokemon, setRoundPokemon] = useState([]);
    // The previous pokemon that the user has clicked
    const [previouslyChosen, setPreviouslyChosen] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const [winStatus, setWinStatus] = useState("");

    const [flipped, setFlipped] = useState(false);

    function randomNumberGenerator() {
        return Math.floor(Math.random() * 151) + 1;
    }

    function randomNumGeneratorControlled(max) {
        return Math.floor(Math.random() * max);
    }

    // For selecting the pokemon that will be used for the current game.
    useEffect(() => {
        function chooseGamePokemon() {
            const chosen = [];
            let totalCardsInPool = 0;

            switch(difficulty) {
                case "easy":
                    totalCardsInPool = 5;
                    setCardsPerRound(3);
                    break;

                case "medium":
                    totalCardsInPool = 10;
                    setCardsPerRound(4);
                    break;
                
                case "hard":
                    totalCardsInPool = 20;
                    setCardsPerRound(6);
                    break;
            }
            // Randomly pick the appropriate number of pokemon for the game
            for(let i = 0; i < totalCardsInPool; i++) {
                let id = randomNumberGenerator();

                while(chosen.includes(id)) {
                    id = randomNumberGenerator();
                }
                chosen.push(id);
            }
            setGamePokemon(chosen);
        }
        chooseGamePokemon();
    }, [pokemonList, difficulty, gameOver]);

    // Is the dependency array correct?
    // It should run this effect when gamePokemon is updated for new games
    // And score updates for next rounds
    useEffect(() => {
        const chosen = [];
        const pool = gamePokemon;
        const totalCardsInPool = gamePokemon.length;
        
        function chooseRoundPokemon() {
            for(let i = 0; i < cardsPerRound; i++) {
                let id = pool[randomNumGeneratorControlled(totalCardsInPool)];
                while(chosen.includes(id)) {
                    id = pool[randomNumGeneratorControlled(totalCardsInPool)];
                }
                chosen.push(id);
            }
            setRoundPokemon(chosen);
        }
        chooseRoundPokemon();
    }, [gamePokemon, score]);

    // For development phase. Delete after
    useEffect(() => {
        function printIds() {
            console.log("Game Pokemon: " + gamePokemon);
            console.log("Round Pokemon" + roundPokemon);
        }

        printIds();
    }, [gamePokemon, roundPokemon]);

    // --------------------------------- Something wrong with the logic below --------------------------------------------------------

    useEffect(() => {
        function handleGameOver() {
            if(!gameOver) return;
            // the reset should come when we click on the play again screen.
            // handleReset();
        }
        handleGameOver();
    }, [gameOver]);

    function handleClick(id) {
        console.log(id);
        if(previouslyChosen.includes(id)) {
            setWinStatus("lose");
            return setGameOver(true);
            // We want to perform a check when gameOver is true. the win or loss status determines the screen
        }

        setPreviouslyChosen(prev => {
            return [...prev, id];
        })
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

    // This immediately shows the win screen because when component mounts, gamePokemon is empty and score = 0
    // fixed with adding gamePokemon.length > 0 check
    useEffect(() => {
        function checkWin() {
            if(gamePokemon.length > 0 && score === gamePokemon.length) {
                setWinStatus("win");
                return setGameOver(true);
            }
        }
        checkWin();
    }, [score]);

    useEffect(() => {
        function handleWinStatus() {
            if(winStatus !== "win" && winStatus !== "lose") return;
            else if(winStatus === "win") {
                setDisplay("win");
            } else if(winStatus === "lose") {
                setDisplay("lose");
            }
        }

        handleWinStatus();
    }, [gameOver]);

    function handleReset() {
        setScore(0);
        setPreviouslyChosen([]);
        setGameOver(false);
    }

    // ----------------------------------------------------------------------------------------------------------------------------------------


    // RENDERING
    if(pokemonList.length === 0) {
        return(<h1>Loading...</h1>)
    }

    

    return(
        <div className="game">
            <div className="scoreBoard">
                <p>Score: {score}/{gamePokemon.length}</p>
                <p>Highscore: {highScore}</p>
                <p>Difficulty: {difficulty}</p>
            </div>

            <div className="cardDisplay">
                {/* We are just feeding the card component the IDs. It will search pokemonList and figure out which one to print */}
                {roundPokemon.map(id => {
                    console.log(id);
                    return <Card pokemonList={pokemonList} id={id} key={id} handleClick={() => handleClick(id)} flipped = {flipped}/>
                })}
            </div>
        </div>

    )
}

export default Game;