import React, { Component } from 'react';
import Header from './Header';
import PokemonList from './PokemonList';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <PokemonList />
      </div>
    );
  }
}

export default App;
