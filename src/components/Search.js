import React, { Component } from 'react';
import '../index.css';

class Search extends Component {
  render() {
    return (
      <div className="search">
        <input className="search-input" type="text" name="search" placeholder="Search..." />
      </div>
    );
  }
}

export default Search;
