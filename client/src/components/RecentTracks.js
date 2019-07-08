import React, { Component } from 'react';
import moment from 'moment';
import './RecentTracks.css'

class RecentTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {recentTracks: [], numResults: 10 };
  }

  componentDidMount() {
    fetch(`/stats?type=recentTracks&numResults=${this.state.numResults}`)
      .then(res => res.json())
      .then(res => this.setState({ recentTracks: res }));
  }

  recentTracks() {
    return (
      <div className="recent-track-list-container">
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
        <p className="playedAt">{moment(new Date(track.date)).fromNow()}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="recent-tracks-container">
        <div></div>
        {this.recentTracks()}
      </div>
    );
  }
}
  
export default RecentTracks;