import React, { Component } from 'react';
import ImageZoom from 'react-medium-image-zoom'
import './SideProject.css';
import { ReactComponent as GitHub } from '../img/github.svg';

class SideProject extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: this.props.name,
      description: this.props.description,
      technologies: this.props.technologies,
      github: this.props.github,
      images: this.props.images,
      hoverItem: ""
    };
  }

  render() {
    console.log(this.state);
    return (
      <div className="side-project-container">
        <div className="side-project-header">
          <span>{this.state.name}</span>
        </div>
        <div className="side-project-body">

          <div className="side-project-info">
            {this.state.description}
            <br></br>

            <div className="side-project-icons">
              {this.state.technologies.map(item =>
                <item.image 
                  onMouseEnter = {() => this.setState({hoverItem: item.name})}
                  onMouseLeave = {() => this.setState({hoverItem: ""})}
                  height = "60px"
                  width = "60px"
                  style = {{
                    fill: this.state.hoverItem === item.name ? item.colour : "white",
                    filter: this.state.hoverItem === item.name ? `drop-shadow(0px 15px 20px ${item.colour})` : "",
                    transform: this.state.hoverItem === item.name ? "translateY(-7px)" : "",
                    title: item.name,
                    transition: "all 0.3s ease 0s",
                  }}
                  title = {item.name}
                  key = {item.name}
                >
                </item.image>
              )}
            </div>
            <a href={this.state.github} target="_blank" rel="noopener noreferrer">
              <div className="side-project-github">
                  <span>VIEW ON GITHUB</span>
                  <GitHub width={50} height={50}></GitHub>
              </div>
            </a>
          </div>

          <div className="side-project-image-grid">
            {this.state.images.map(item =>
              <ImageZoom
                image={{
                  src: item,
                  alt: 'sideproject',
                  className: 'img',
                  style: { width: '100%' }
                }}
                zoomImage={{
                  src: item,
                  alt: 'sideproject'
                }}
                defaultStyles={{
                  overlay: {
                    backgroundColor: 'none'
                  }
                }}
              key={item}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default SideProject;