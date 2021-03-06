import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { PokemonCard } from "../../components/PokemonCard";

export async function fetchPokemon(
  pokemonName,
  loadingChange,
  pokemonLoadChange
) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
  console.log(url);
  const { data: result } = await axios(url);
  pokemonLoadChange(result);
  loadingChange(false);
}

export const SinglePokemonContainer = ({ pokemonName }) => {
  const [isLoading, onLoadingStateChange] = useState(true); // hooks
  const [pokemon, onPokemonDataLoad] = useState({});
  useEffect(() => {
    // like componentDidMount..
    fetchPokemon(pokemonName, onLoadingStateChange, onPokemonDataLoad);
  }, [pokemonName]);
  return isLoading ? <div>Loading</div> : <PokemonCard {...{ pokemon }} />;
};

SinglePokemonContainer.propTypes = {
  pokemonName: PropTypes.string.isRequired
};
