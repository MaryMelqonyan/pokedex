import axios from 'axios';

export const START_FETCHING_POKEMONS = 'START_FETCHING_POKEMONS';
export const END_FETCHING_POKEMONS = 'END_FETCHING_POKEMONS';
export const END_FETCHING_SINGLE_POKEMON = 'END_FETCHING_SINGLE_POKEMON';
export const END_FETCHING_TYPES = 'END_FETCHING_TYPES';
export const UPDATE_PAGE_NUMBER = 'UPDATE_PAGE_NUMBER';
export const UPDATE_PER_PAGE = 'UPDATE_PER_PAGE';

const API = 'https://pokeapi.co/api/v2';

export const startFetchingPokemons = () => {
  return {
    type: START_FETCHING_POKEMONS,
  };
};

export const endFetchingPokemons = response => {
  return {
    type: END_FETCHING_POKEMONS,
    response,
  };
};

export const updatePageNumber = pageNumber => {
  return {
    type: UPDATE_PAGE_NUMBER,
    pageNumber,
  };
};

export const updatePerPage = perPage => {
  return {
    type: UPDATE_PER_PAGE,
    perPage,
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
    axios.get(`${API}/pokemon/`, { params: { limit: 1000 } }).then(response => {
      dispatch(endFetchingPokemons(response.data));
    });
  };
};

export const fetchPokemonsListByType = url => {
  return dispatch => {
    dispatch(startFetchingPokemons());
    dispatch(updatePageNumber(1));
    axios.get(url).then(response => {
      const pokemons = response.data.pokemon.map(item => item.pokemon);
      dispatch(endFetchingPokemons({ results: pokemons, count: pokemons.length }));
    });
  };
};

export const fetchSinglePokemon = name => {
  return dispatch =>
    axios.get(`${API}/pokemon/` + name).then(response => {
      dispatch(endFetchingSinglePokemon(response.data));
    });
};

export const fechTypes = () => {
  return dispatch => {
    axios.get(`${API}/type`).then(response => {
      dispatch(endFetchingTypes(response.data.results));
    });
  };
};
