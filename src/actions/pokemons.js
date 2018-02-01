import axios from 'axios';

export const START_FETCHING_POKEMONS = 'START_FETCHING_POKEMONS';
export const END_FETCHING_POKEMONS = 'END_FETCHING_POKEMONS';
export const END_FETCHING_SINGLE_POKEMON = 'END_FETCHING_SINGLE_POKEMON';
export const END_FETCHING_TYPES = 'END_FETCHING_TYPES';

const API = 'https://pokeapi.co/api/v2';

export const startFetchingPokemons = pageNumber => {
  return {
    type: START_FETCHING_POKEMONS,
    pageNumber,
  };
};

export const endFetchingPokemons = response => {
  console.log("endFetchingPokemons", response)
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

export const endFetchingTypes = response => {
  return {
    type: END_FETCHING_TYPES,
    response,
  };
};

export const fetchPokemonsList = () => {
  return dispatch => {
    axios
      .get(`${API}/pokemon`, { params: { limit: 10 } })
      .then(response => {
        dispatch(endFetchingPokemons(response.data))
      });
  };
};

export const fetchPokemonsListByType = url => {
  return dispatch => {
    axios
      .get(url, { params: { limit: 10 } })
      .then(response => {
        const pokemons = response.data.pokemon.map(item => item.pokemon).slice(0, 10)
        dispatch(endFetchingPokemons({results: pokemons}))
      });
  };
};

export const fetchSinglePokemon = name => {
  return dispatch =>
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + name, { params: { limit: 10 } })
      .then(response => {

        dispatch(endFetchingSinglePokemon(response.data))
      });
};

export const fechTypes = () => {
  return dispatch => {
    axios
      .get(`${API}/type`, { params: { limit: 10 } })
      .then(response => {

        dispatch(endFetchingTypes(response.data.results))
      });
  };
};

