import React, { Component } from 'react';
import logo from '../logo.svg';
import '../index.css';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img src={logo} alt="logo" />
        <p>Pokedex</p>
      </div>
    );
  }
}

export default Header;
