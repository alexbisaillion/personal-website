import React, { Component } from 'react';
import './RecentTracks.css'
import List from './List';
import ListEntry from './ListEntry';

class RecentTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {recentTracks: [], numResults: 50 };
  }

  componentDidMount() {
    fetch(`/stats?type=recentTracks&numResults=${this.state.numResults}`)
      .then(res => res.json())
      .then(res => this.setState({ recentTracks: res }));
  }

  render() {
    return (
      <div className="recent-tracks-container">
        <div></div>
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