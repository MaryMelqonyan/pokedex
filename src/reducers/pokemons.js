import {
  START_FETCHING_POKEMONS,
  END_FETCHING_POKEMONS,
  END_FETCHING_SINGLE_POKEMON,
  END_FETCHING_TYPES,
} from '../actions/pokemons';

const initialState = {
  pageNumber: 1,
  totalPages: null,
  pokemons: null,
  singlePokemons: {},
  types: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_POKEMONS:
      return { ...state, pokemons: null, pageNumber: action.pageNumber };
    case END_FETCHING_POKEMONS:
      return {
        ...state,
        pokemons: action.response.results,
        totalPages: Math.ceil(action.response.count / 20),
      };
    case END_FETCHING_SINGLE_POKEMON:
      return {
        ...state,
        singlePokemons: { ...state.singlePokemons, ...{ [action.response.name]: action.response } },
      };
    case END_FETCHING_TYPES:
      return {
        ...state,
        types: action.response,
        // totalPages:
      };
    default:
      return state;
  }
};
