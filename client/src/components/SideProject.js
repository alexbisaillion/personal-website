import React, { Component } from 'react';
import './SideProject.css';

class SideProject extends Component {
  render() {
    return (
      <div className="side-project-container">
        <div className="side-project-header">
          <span>{this.props.name}</span>
          <div className="side-project-icons">
            {this.props.technologies.map(item =>
              <item.image className="technology-image" height="60px" width="60px" style={{fill: item.colour, title: item.name}} title={item.name}></item.image>
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