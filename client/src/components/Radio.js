import React, { Component } from 'react';
import './Radio.css'

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {currentTrack: {}, recentTracks: [], numResults: 5 };
  }

  componentDidMount() {
    fetch(`/stats?type=feed&numResults=${this.state.numResults}`)
      .then(res => res.json())
      .then(res => this.setState({ currentTrack: res.currentTrack, recentTracks: res.recentTracks }));
  }

  currentTrack() {
    let status;
    if (this.state.currentTrack.isPlaying) {
      status = <h1 className="live">LIVE</h1>;
    } else {
      status = <h1 className="offline">OFFLINE</h1>;
    }

    return (
      <div className="current-track-container">
        <img src={this.state.currentTrack.art} alt="art"/>
        <div className="current-track-info-container">
          {status}
          <div className="current-track-text">
            <h2>{this.state.currentTrack.artist}</h2>
            <p><i>{this.state.currentTrack.track}</i></p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="radio-container">
        {this.currentTrack()}
      </div>
    );
  }
}
  
export default Radio;