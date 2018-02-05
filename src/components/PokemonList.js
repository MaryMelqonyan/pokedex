import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import Pokemon from './Pokemon';
import SelectType from './SelectType';
import Search from './Search';
import Pagination from './Pagination';
import Loading from './Loading';
import * as pokemonActions from '../actions/pokemons';
import SelectPokemonsNumber from './SelectPokemonsNumber';

class PokemonList extends Component {
  state = { search: '' };

  fetchNextPokemons = () => {
    this.props.updatePageNumber(this.props.pageNumber + 1);
  };

  fetchPrevPokemons = () => {
    this.props.updatePageNumber(this.props.pageNumber - 1);
  };

  componentDidMount() {
    this.props.fetchPokemonsList();
  }

  handleSearch = event => {
    this.setState({ search: event.target.value });
  };

  handleTypeSelect = url => {
    this.props.fetchPokemonsListByType(url);
  };

  handlePageSelect = perPage => {
    this.props.updatePerPage(perPage);
  };

  render() {
    if (!this.props.pokemons) {
      return <Loading />;
    }

    const pokemons = this.props.pokemons;
    const filteredPokemons = pokemons
      .filter(pokemon => pokemon.name.startsWith(this.state.search))
      .slice(
        (this.props.pageNumber - 1) * this.props.perPage,
        this.props.pageNumber * this.props.perPage
      );

    return (
      <div>
        <Search onSearch={this.handleSearch} value={this.state.search} />
        <SelectType onChange={this.handleTypeSelect} value={this.props.type} />
        <SelectPokemonsNumber onChange={this.handlePageSelect} />
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
    perPage: state.pokemons.perPage,
  };
};

export default connect(mapStateToProps, pokemonActions)(PokemonList);
