import { useEffect } from "react";
import cardBack from "./assets/cardBack.png";

// function Card({pokemonList, id, handleClick, flipped}) {

//     const pokemon = pokemonList.find(p => p.id == id);

//     return(
//         <>
//             <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
//                 <div className="cardFront">
//                     <img src={pokemon.sprite} alt={pokemon.name} />
//                 </div>
//                 <div className="cardBack"></div>
//             </div>
//         </>
//     )
// }

function Card({pokemonList, id}) {

    const pokemon = pokemonList.find(p => p.id == id);

    return(
        <>
            <div className={`card`}>
                <div className="cardFront">
                    <img src={pokemon.sprite} alt={pokemon.name} />
                </div>
                <div className="cardBack"></div>
            </div>
        </>
    )
}

export default Card;