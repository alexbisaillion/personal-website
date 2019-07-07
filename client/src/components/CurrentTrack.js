import React, { Component } from 'react';
import './CurrentTrack.css'

class CurrentTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {currentTrack: {} };
  }

  componentDidMount() {
    fetch(`/stats?type=currentTrack`)
      .then(res => res.json())
      .then(res => this.setState({ currentTrack: res }));
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
        <div className="current-track-info-container">
          <div className="current-track-artist">{this.state.currentTrack.artist}</div>
          <div className="current-track-title">{this.state.currentTrack.track}</div>
        </div>
        <img src={this.state.currentTrack.art} alt="art" className="current-track-image"/>
      </div>
    );
  }

  render() {
    return (this.currentTrack());
  }
}
  
export default CurrentTrack;