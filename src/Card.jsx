import { useEffect } from "react";
import cardBack from "./assets/cardBack.png";

function Card({pokemonList, id, handleClick}) {

    const pokemon = pokemonList.find(p => p.id == id);

    return(
        <>
            <div className={`card`} onClick={handleClick}>
                <div className="cardInner">
                    <div className="cardFront">
                        <img src={pokemon.sprite} alt={pokemon.name} />
                    </div>
                    <div className="cardBack"></div>
                </div>
            </div>
        </>
    )
}

export default Card;