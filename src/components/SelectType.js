import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../index.css';
import * as pokemonActions from '../actions/pokemons';

class SelectType extends Component {
  componentDidMount() {
    this.props.fechTypes();
  }

  handleChange = event => {
    const url = event.target.value;
    this.props.onChange(url);
  };

  render() {
    return (
      <div>
        <select className="type-selector" name="Types" onChange={this.handleChange} autoFocus>
          <option disabled selected>
            Select pokemon type
          </option>
          {this.props.types.map(type => (
            <option key={type.url} value={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    types: state.pokemons.types,
  };
};

export default connect(mapStateToProps, pokemonActions)(SelectType);
