import React, { Component } from 'react';
import '../index.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loader" />
        <p>Loading...</p>
      </div>
    );
  }
}

export default Loading;
