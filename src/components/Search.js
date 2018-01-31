import React, { Component } from 'react';
import '../index.css';

class Search extends Component {
  render() {
    return (
      <div className="search">
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder="Search..."
          onChange={this.props.onSearch}
          value={this.props.value}
        />
      </div>
    );
  }
}

export default Search;
