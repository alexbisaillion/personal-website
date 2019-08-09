import React, { Component } from 'react';
import './LoadingIcon.css'

class LoadingIcon extends Component {
  render() {
    return (
      <div className="spinner" style={{"height" : this.props.height, "width" : this.props.width}}></div>
    )
  }
}

export default LoadingIcon;
