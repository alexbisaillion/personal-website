import React, { Component } from 'react';
import './SideProject.css';

class SideProject extends Component {
  render() {
    return (
      <div className="side-project-container">
        <div className="side-project-header">
          <span>{this.props.name}</span>
          <div>
            {this.props.technologies.map(item =>
              <img className="technology-image" src={item.image} height="100px" width="100px" style={{fill: item.colour}}></img>
            )}
          </div>
        </div>
        <span>{this.props.description}</span>
        <span style={{alignSelf: "center"}}>View on <a href={this.props.github}>GitHub</a></span>
      </div>
    )
  }
}

export default SideProject;