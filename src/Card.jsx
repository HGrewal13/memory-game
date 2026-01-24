import { useEffect } from "react";

function Card({pokemonList, id, handleClick}) {

    const pokemon = pokemonList.find(p => p.id == id);

    return(
        <>
            <div className="card" onClick={handleClick}>
                <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
        </>
    )
}

export default Card;