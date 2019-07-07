import React, { Component } from 'react';
import StatPanel from './StatPanel';
import Radio from './Radio';
import './Music.css'
import CurrentTrack from './CurrentTrack';

class Music extends Component {
  render() {
    return (
      <div className="music-container">
        <CurrentTrack></CurrentTrack>
        <div className="scroll-area">
          <h1>I'm currently listening to...</h1> 
          <Radio></Radio>
        </div>
        <div className="scroll-area">
          <StatPanel itemType="tracks" />
        </div>
        <div className="scroll-area">
          <StatPanel itemType="artists" />
        </div>
      </div>
    );
  }
}
  
export default Music;