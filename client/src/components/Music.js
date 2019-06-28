import React, { Component } from 'react';
import StatPanel from './StatPanel';
import './Music.css'

class Music extends Component {
  render() {
    return (
      <div className="music-container">
        <StatPanel itemType="tracks" />
        <StatPanel itemType="artists" />
      </div>
    );
  }
}
  
export default Music;