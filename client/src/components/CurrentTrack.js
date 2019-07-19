import React, { Component } from 'react';
import * as Vibrant from 'node-vibrant'
import './CurrentTrack.css'
import Soundwave from './Soundwave';

class CurrentTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {currentTrack: {}, dominantColour: "black", infoWidth: 0 };
    this.info = React.createRef();
  }

  async componentDidMount() {
    const currentTrack = await fetch(`/stats?type=currentTrack`);
    const currentTrackJSON = await currentTrack.json();
    const colour = await Vibrant.from(currentTrackJSON.art).getPalette();
    let maxColour = colour.Vibrant.hex;
    let maxPopulation = colour.Vibrant.population;
    Object.keys(colour).forEach(function(key) {
      if (colour[key].population > maxPopulation) {
        maxColour = colour[key].hex;
      }
    });
    this.setState({ currentTrack: currentTrackJSON, dominantColour: maxColour, infoWidth: this.info.current.offsetWidth});
  }

  render() {
    let gradient = `radial-gradient(circle at top right, ${this.state.dominantColour}, black, black)`
    return (
      <div className="current-track-container" style={{background: gradient}}>
        <div className="current-track-info-container" ref={this.info}>
          <div className="current-track-artist">{this.state.currentTrack.artist}</div>
          <div className="current-track-title">{this.state.currentTrack.track}</div>
          <Soundwave colour={this.state.dominantColour} infoWidth={this.state.infoWidth * 0.5}></Soundwave>
        </div>
        <img src={this.state.currentTrack.art} alt="art" className="current-track-image"/>
      </div>
    );
  }
}
  
export default CurrentTrack;