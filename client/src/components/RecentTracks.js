import React, { Component } from 'react';
import './RecentTracks.css'
import List from './List';
import ListEntry from './ListEntry';
import LoadingIcon from './LoadingIcon';

class RecentTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {recentTracks: [], numResults: 50, topYears: [], topArtists: [], isLoading: true};
  }

  componentDidMount() {
    fetch(`/stats?type=recentTracks&numResults=${this.state.numResults}`)
      .then(res => res.json())
      .then(res => this.setState({ recentTracks: res.tracks, topYears: res.topYears, topArtists: res.topArtists, isLoading: false }));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="recent-tracks-container" ref={this.info}>
          <div className="recent-tracks-loading">
            <LoadingIcon height="100px" width="100px"></LoadingIcon>
          </div>
        </div>
      )
    }
    return (
      <div className="recent-tracks-container">
        <div className="recent-tracks-info-container">
          <span className="recent-track-stat-header">Recent Tracks</span>
          <div className="recent-track-stat">
            <span className="recent-track-section-header">Trending Artists</span>
            <div className="recent-tracks-info-list">
              {this.state.topArtists.map(artist =>
                <span key={artist}>{artist}</span>
              )}
            </div>
          </div>
          <div className="recent-track-stat">
            <span className="recent-track-section-header">Trending Years</span>
            <div className="recent-tracks-info-list">
              {this.state.topYears.map(year =>
                <span key={year}>{year}</span>
              )}
            </div>
          </div>
        </div>
        <List>
          {this.state.recentTracks.map(track =>
            <ListEntry art={track.art} artist={track.artist} track={track.title} timestamp={track.date} key={track.id}></ListEntry>
          )}
        </List>
      </div>
    );
  }
}
  
export default RecentTracks;