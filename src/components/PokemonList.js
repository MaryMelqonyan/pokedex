import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import Pokemon from './Pokemon';
import SelectType from './SelectType';
import Search from './Search';
import Pagination from './Pagination';
import Loading from './Loading';
import * as pokemonActions from '../actions/pokemons';

class PokemonList extends Component {
  state = { search: '' };
  // fetchPokemons = pageNumber => {
  //   fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${(pageNumber - 1) * 20}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.props.endFetchingPokemons(data);
  //     });
  // };

  fetchNextPokemons = () => {
    this.fetchPokemons(this.props.pageNumber + 1);
    this.props.startFetchingPokemons(this.props.pageNumber + 1);
  };

  fetchPrevPokemons = () => {
    this.fetchPokemons(this.props.pageNumber - 1);
    this.props.startFetchingPokemons(this.props.pageNumber - 1);
  };

  componentDidMount() {
    // this.fetchPokemons(this.props.pageNumber);
    this.props.fetchPokemonsList();
  }

  handleSearch = event => {
    this.setState({ search: event.target.value });
  };

  handleTypeSelect = url => {
    this.props.fetchPokemonsListByType(url);
  };

  render() {
    if (!this.props.pokemons) {
      return <Loading />;
    }

    const pokemons = this.props.pokemons;

    const filteredPokemons = pokemons.filter(pokemon => pokemon.name.startsWith(this.state.search));

    // const filteredPokemons = pokemons.filter(pokemon => {
    //   let typeIncluded = true;
    //   if (this.state.type) {
    //     typeIncluded = false;
    //     if (singlePokemons[pokemon.name]) {
    //       typeIncluded = singlePokemons[pokemon.name].types
    //         .map(t => t.type.name)
    //         .includes(this.props.type);
    //     }
    //   }
    //   return pokemon.name.startsWith(this.state.search) && typeIncluded;
    // });

    return (
      <div>
        <Search onSearch={this.handleSearch} value={this.state.search} />
        <SelectType onChange={this.handleTypeSelect} value={this.props.type} />
        <div className="pokemons">
          {filteredPokemons.map(pokemon => <Pokemon key={pokemon.url} name={pokemon.name} />)}
          <Pagination
            onNextClick={this.fetchNextPokemons}
            onPrevClick={this.fetchPrevPokemons}
            nextShown={this.props.pageNumber !== this.props.totalPages}
            previousShown={this.props.pageNumber !== 1}
            pageNumber={this.props.pageNumber}
            totalPage={this.props.totalPages}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageNumber: state.pokemons.pageNumber,
    pokemons: state.pokemons.pokemons,
    totalPages: state.pokemons.totalPages,
    singlePokemons: state.pokemons.singlePokemons,
    types: state.pokemons.types,
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     startFetchingPokemons: pageNumber => {
//       dispatch(startFetchingPokemons(pageNumber));
//     },
//     endFetchingPokemons: response => {
//       dispatch(endFetchingPokemons(response));
//     },

//   };
// };

export default connect(mapStateToProps, pokemonActions)(PokemonList);
