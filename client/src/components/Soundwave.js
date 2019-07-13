import React, { Component } from 'react';
import './Soundwave.css'

class Soundwave extends Component {
  render() {
    return (
      <div id='bars'>
        <div className='bar' style={{background: this.props.colour}}></div>
        <div className='bar' style={{background: this.props.colour}}></div>
        <div className='bar' style={{background: this.props.colour}}></div>
        <div className='bar' style={{background: this.props.colour}}></div>
        <div className='bar' style={{background: this.props.colour}}></div>
        <div className='bar' style={{background: this.props.colour}}></div>
        <div className='bar' style={{background: this.props.colour}}></div>
        <div className='bar' style={{background: this.props.colour}}></div>
        <div className='bar' style={{background: this.props.colour}}></div>
        <div className='bar' style={{background: this.props.colour}}></div>
      </div>
    );
  }
}
  
export default Soundwave;