import React, { Component } from 'react';
import StatPanel from './StatPanel';
import './Music.css'
import CurrentTrack from './CurrentTrack';
import RecentTracks from './RecentTracks';

class Music extends Component {
  render() {
    return (
      <div className="music-container">
        <CurrentTrack></CurrentTrack>
        <RecentTracks></RecentTracks>
        <StatPanel itemType="tracks" />
        <StatPanel itemType="artists" />
      </div>
    );
  }
}
  
export default Music;