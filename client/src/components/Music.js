import React, { Component } from 'react';
import StatPanel from './StatPanel';
import './Music.css'

class Music extends Component {
  render() {
    return (
      <div class="music-container">
          <div class="stat-panel-container">
            <div class="stat-panel-art">1</div>
            <div class="stat-panel-text">2</div>
            <div class="stat-panel-text">3</div>
          </div>
          <div class="stat-panel-container">
            <div class="stat-panel-art">1</div>
            <div class="stat-panel-text">2</div>
            <div class="stat-panel-text">3</div>
          </div>
      </div>
    );
  }
}
  
export default Music;