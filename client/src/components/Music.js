import React, { Component } from 'react';
import StatPanel from './StatPanel';
import Radio from './Radio';
import './Music.css'

class Music extends Component {
  render() {
    return (
      <div className="music-container">
        <div className="radio">
          <Radio></Radio>
        </div>
        <StatPanel itemType="tracks" />
        <StatPanel itemType="artists" />
      </div>
    );
  }
}
  
export default Music;