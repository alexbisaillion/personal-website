import React, { Component } from 'react';
import './List.css'

class List extends Component {
  render() {
    return (
      <div className="list-container">
        {this.props.children}
      </div>
    );
  }
}
  
export default List;