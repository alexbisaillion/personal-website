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

  render() {
    let loadedCurrentTrack;
    if (this.state.currentTrack.art) {
      loadedCurrentTrack = <div><img src={this.state.currentTrack.art} alt="art"/><h1>{this.state.currentTrack.artist} - <i>{this.state.currentTrack.track}</i></h1></div>
    } else {
      loadedCurrentTrack = <h1>Loading!</h1>
    }
    return (
      <div className="radio-container">
        {this.state.currentTrack.art ? (
          <img src={this.state.currentTrack.art} alt="art"/>
        ) : (
          <h1>Loading!</h1>
        )}

        {this.state.currentTrack.artist && this.state.currentTrack.track &&
          <h1>{this.state.currentTrack.artist} - <i>{this.state.currentTrack.track}</i></h1>
        }
      </div>
    );
  }
}
  
export default Radio;