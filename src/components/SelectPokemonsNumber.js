import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import * as pokemonActions from '../actions/pokemons';

class SelectPokemonsNumber extends Component {
  handleChange = event => {
    const perPage = event.target.value;
    this.props.onChange(perPage);
  };

  render() {
    return (
      <select
        className="number-selector"
        onChange={this.handleChange}
        value={this.props.value}
        autoFocus
      >
        <option disabled selected>
          How many pokemons you would like to see?
        </option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    );
  }
}

const mapStateToProps = state => {
  return {
    perPage: state.pokemons.perPage,
  };
};

export default connect(mapStateToProps, pokemonActions)(SelectPokemonsNumber);
