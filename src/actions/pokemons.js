export const START_FETCHING_POKEMONS = 'START_FETCHING_POKEMONS';
export const END_FETCHING_POKEMONS = 'END_FETCHING_POKEMONS';
export const END_FETCHING_SINGLE_POKEMON = 'END_FETCHING_SINGLE_POKEMON';

export const startFetchingPokemons = pageNumber => {
  return {
    type: START_FETCHING_POKEMONS,
    pageNumber,
  };
};

export const endFetchingPokemons = response => {
  return {
    type: END_FETCHING_POKEMONS,
    response,
  };
};

export const endFetchingSinglePokemon = response => {
  return {
    type: END_FETCHING_SINGLE_POKEMON,
    response,
  };
};
