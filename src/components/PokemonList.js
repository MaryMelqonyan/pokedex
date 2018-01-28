import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import Pokemon from './Pokemon';
import Pagination from './Pagination';
import Loading from './Loading';
import { startFetchingPokemons, endFetchingPokemons } from '../actions/pokemons';

class PokemonList extends Component {
  fetchPokemons = pageNumber => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${(pageNumber - 1) * 20}`)
      .then(response => response.json())
      .then(data => {
        this.props.endFetchingPokemons(data);
      });
  };

  fetchNextPokemons = () => {
    this.fetchPokemons(this.props.pageNumber + 1);
    this.props.startFetchingPokemons(this.props.pageNumber + 1);
  };

  fetchPrevPokemons = () => {
    this.fetchPokemons(this.props.pageNumber - 1);
    this.props.startFetchingPokemons(this.props.pageNumber - 1);
  };

  componentDidMount() {
    this.fetchPokemons(this.props.pageNumber);
  }

  render() {
    if (!this.props.pokemons) {
      return <Loading />;
    }

    const pokemons = this.props.pokemons;
    return (
      <div className="users">
        {pokemons.map(pokemon => <Pokemon key={pokemon.url} name={pokemon.name} />)}
        <Pagination
          onNextClick={this.fetchNextPokemons}
          onPrevClick={this.fetchPrevPokemons}
          nextShown={this.props.pageNumber !== this.props.totalPages}
          previousShown={this.props.pageNumber !== 1}
          pageNumber={this.props.pageNumber}
          totalPage={this.props.totalPages}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    pageNumber: state.pokemons.pageNumber,
    pokemons: state.pokemons.pokemons,
    totalPages: state.pokemons.totalPages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startFetchingPokemons: (pageNumber) => {
      dispatch(startFetchingPokemons(pageNumber));
    },
    endFetchingPokemons: (response) => {
      dispatch(endFetchingPokemons(response));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
