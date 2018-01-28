import React, {Component} from 'react';
import Header from './Header';
import Search from './Search';
import PokemonList from './PokemonList';


class App extends Component {
  render () {
    return  (
      <div>
        <Header />
        <Search />
        <PokemonList />
      </div>
    )
  }
}

export default App;
