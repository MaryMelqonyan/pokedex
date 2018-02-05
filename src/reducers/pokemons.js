import {
  END_FETCHING_POKEMONS,
  END_FETCHING_SINGLE_POKEMON,
  END_FETCHING_TYPES,
  UPDATE_PAGE_NUMBER,
  START_FETCHING_POKEMONS,
  UPDATE_PER_PAGE,
} from '../actions/pokemons';

const initialState = {
  pageNumber: 1,
  totalPages: null,
  pokemons: null,
  singlePokemons: {},
  types: [],
  perPage: 20,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_POKEMONS:
      return { ...state, pokemons: null };
    case UPDATE_PAGE_NUMBER:
      return { ...state, pageNumber: action.pageNumber };
    case UPDATE_PER_PAGE:
      return {
        ...state,
        perPage: action.perPage,
        totalPages: Math.ceil(state.pokemons.length / action.perPage),
      };
    case END_FETCHING_POKEMONS:
      return {
        ...state,
        pokemons: action.response.results,
        totalPages: Math.ceil(action.response.count / state.perPage),
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
      };
    default:
      return state;
  }
};
