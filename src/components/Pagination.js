import React, { Component } from 'react';
import '../index.css';

class Pagination extends Component {
  render() {
    return (
      <div className="prevnext">
        <button
          onClick={this.props.onNextClick}
          className="next btn"
          style={{ visibility: this.props.nextShown ? 'visible' : 'hidden' }}
        >
          Next ❯
        </button>
        <button
          onClick={this.props.onPrevClick}
          className="prev btn"
          style={{ visibility: this.props.previousShown ? 'visible' : 'hidden' }}
        >
          ❮ Previous
        </button>
        <div className="page-number">
          {this.props.pageNumber} page of {this.props.totalPage}
        </div>
      </div>
    );
  }
}

export default Pagination;
