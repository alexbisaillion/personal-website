import React, { Component } from 'react';
import './Radio.css'

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = {currentTrack: {}, recentTracks: [], numResults: 10 };
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
        <img src={this.state.currentTrack.art} alt="art" className="current-track-image"/>
        <div className="current-track-info-container">
          {status}
          <div className="current-track-text">
            <h2>{this.state.currentTrack.artist}</h2>
            <p><i>{this.state.currentTrack.track}</i></p>
          </div>
        </div>
      </div>
    );
  }

  recentTracks() {
    return (
      <div className="recent-track-container">
        {this.state.recentTracks.map(track =>
          this.recentTrackEntry(track)
        )}
      </div>
    );
  }

  recentTrackEntry(track) {
    return (
      <div className="recent-track">
        <img src={track.art} alt="art" className="recent-track-image"/>
        <div className="recent-track-info">
          <h2>{track.artist}</h2>
          <p>{track.title}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="radio-container">
        {this.currentTrack()}
        {this.recentTracks()}
      </div>
    );
  }
}
  
export default Radio;