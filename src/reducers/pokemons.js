import {
  START_FETCHING_POKEMONS,
  END_FETCHING_POKEMONS,
  END_FETCHING_SINGLE_POKEMON,
} from '../actions/pokemons';

const initialState = {
  pageNumber: 1,
  totalPages: null,
  pokemons: null,
  singlePokemons: {},
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
    default:
      return state;
  }
};
