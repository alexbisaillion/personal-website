import React, { Component } from 'react';
import StatPanel from './StatPanel';
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
        <div width="100%" style={{textAlign: "center", marginBottom: "50px"}}>
          <h2>POWERED BY</h2>
          <a href="https://www.spotify.com/" target="_blank" rel="noopener noreferrer">
            <img src='/img/Spotify_Logo_RGB_Green.png' width="200px" alt="spotify-logo"/>
          </a>
        </div>
      </div>
    );
  }
}
  
export default Music;