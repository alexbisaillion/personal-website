import React, { Component } from 'react';
import './Soundwave.css'

class Soundwave extends Component {
  render() {
    let bars = [];
    let numBars = Math.ceil(this.props.infoWidth / 35);
    for (let i = 0; i < numBars; i++) {
      if (this.props.isPlaying) {
        bars.push(<div className='bar' style={{background: this.props.colour, animationDuration: `${getRandomInt(600, 700)}ms`}} key={i}></div>);
      } else {
        bars.push(<div className='bar' style={{background: this.props.colour}} key={i}></div>);
      }
    }
    return (
      <div id='bars' style={{height: this.props.height}}>
        {bars}
      </div>
    );
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default Soundwave;