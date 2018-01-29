import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import Loading from './Loading';
import { endFetchingSinglePokemon } from '../actions/pokemons';

class Pokemon extends Component {
  componentDidMount() {
    if (this.props.pokemon) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.name}`)
      .then(response => response.json())
      .then(data => {
        this.props.endFetchingSinglePokemon(data);
      });
  }

  render() {
    const pokemon = this.props.pokemon;
    if (!pokemon) {
      return (
        <div className="pokemon">
          <Loading />
        </div>
      );
    }

    const pokemonTypes = pokemon.types.map(t => t.type.name).join(', ');
    return (
      <div className="pokemon">
        {pokemon.sprites.front_default && (
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        )}
        <span className="pokemon-name">
          <b>Name:</b> {pokemon.name}
        </span>
        <span className="pokemon-type">
          <b>Type:</b> {pokemonTypes}
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    pokemon: state.pokemons.singlePokemons[props.name],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    endFetchingSinglePokemon: response => {
      dispatch(endFetchingSinglePokemon(response));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
