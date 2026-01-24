import { useEffect } from "react";

function Card({pokemonList, id}) {

    const pokemon = pokemonList.find(p => p.id == id);

    return(
        <>
            <div className="card">
                <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
        </>
    )
}

export default Card;