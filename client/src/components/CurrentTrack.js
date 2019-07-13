import React, { Component } from 'react';
import * as Vibrant from 'node-vibrant'
import './CurrentTrack.css'
import Soundwave from './Soundwave';

class CurrentTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {currentTrack: {}, dominantColour: "black" };
  }

  async componentDidMount() {
    const currentTrack = await fetch(`/stats?type=currentTrack`);
    const currentTrackJSON = await currentTrack.json();
    const colour = await Vibrant.from(currentTrackJSON.art).getPalette();
    this.setState({ currentTrack: currentTrackJSON, dominantColour: colour.Vibrant.hex});
  }

  render() {
    let gradient = `linear-gradient(to right, black, black, ${this.state.dominantColour})`;
    return (
      <div className="current-track-container" style={{background: gradient}}>
        <div className="current-track-info-container">
          <div className="current-track-artist">{this.state.currentTrack.artist}</div>
          <div className="current-track-title">{this.state.currentTrack.track}</div>
          <Soundwave colour={this.state.dominantColour}></Soundwave>
        </div>
        <img src={this.state.currentTrack.art} alt="art" className="current-track-image"/>
      </div>
    );
  }
}
  
export default CurrentTrack;