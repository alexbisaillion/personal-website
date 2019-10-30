import React, { Component } from 'react';
import './CurrentTrack.css'
import Soundwave from './Soundwave';
import LoadingIcon from './LoadingIcon';
import refresh from '../img/refresh.svg'

class CurrentTrack extends Component {
  constructor(props) {
    super(props);
    this.state = { currentTrack: {}, infoWidth: 0, isLoading: true };
    this.info = React.createRef();
    this.fetchResults = this.fetchResults.bind(this);
  }

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults() {
    fetch(`/currentTrack`)
      .then(res => res.json())
      .then(currentTrack => this.setState({ currentTrack: currentTrack, infoWidth: this.info.current.offsetWidth, isLoading: false}));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="current-track-container" ref={this.info}>
          <div className="current-track-loading">
            <LoadingIcon height="100px" width="100px"></LoadingIcon>
          </div>
        </div>
      )
    }
    let gradient = `radial-gradient(circle at top right, ${this.state.currentTrack.colour}, #181818, #181818)`
    let status;
    if (this.state.currentTrack.isPlaying) {
      status = <span>Now Playing</span>
    } else if (this.state.currentTrack.date) {
      status = <div className="offline-status"><span>Offline</span><span>{this.state.currentTrack.date}</span></div>
    } else {
      status = <span>Offline</span>
    }
    return (
      <div className="current-track-container" style={{background: gradient}} ref={this.info}>
        <div className="current-track-info-container">
          <span className="current-track-artist">{this.state.currentTrack.artist}</span>
          <span className="current-track-title">{this.state.currentTrack.track}</span>
          <div className="current-track-status">
            <img className="refresh" src={refresh} onClick={() => this.fetchResults()} alt="refresh"></img>
            {status}
          </div>
          <Soundwave colour={this.state.currentTrack.colour} infoWidth={this.state.infoWidth * 0.25} isPlaying={this.state.currentTrack.isPlaying} height="15%"></Soundwave>
        </div>
        <div className="current-track-image-container">
          <img src={this.state.currentTrack.art} alt="art" className="current-track-image"/>
        </div>
      </div>
    );
  }
}
  
export default CurrentTrack;