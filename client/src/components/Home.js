import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import LoadingIcon from './LoadingIcon';
import Soundwave from './Soundwave';
import './Home.css'

class Home extends Component {
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
    fetch(`/stats?type=currentTrack`)
      .then(res => res.json())
      .then(currentTrack => this.setState({ currentTrack: currentTrack, infoWidth: this.info.current.offsetWidth, isLoading: false}));
  }

  render() {
    let currentlyPlaying;
    if (this.state.isLoading) {
      currentlyPlaying = <div className="currentlyPlaying" ref={this.info} style={{height: "260px"}}><LoadingIcon height="100px" width="100px"></LoadingIcon></div>
    } else {
      let gradient = `linear-gradient(to right, ${this.state.currentTrack.colour}, black, black, ${this.state.currentTrack.colour})`
      currentlyPlaying = (
        <div className="currentlyPlaying" style={{background: gradient}} ref={this.info}>
          <span style={{ fontSize: "1em", marginRight: "30px"}}>{this.state.currentTrack.isPlaying ? "I'm currently listening to..." : "I last listened to..."}</span>
          <img src={this.state.currentTrack.art} alt="art" className="trackArt"/>
          <div className="trackInformation">
            <span className="trackArtist">{this.state.currentTrack.artist}</span>
            <span style={{ fontSize: "1em"}}><i>{this.state.currentTrack.track}</i></span>
          </div>
          <Soundwave colour={this.state.currentTrack.colour} infoWidth={this.state.infoWidth * 0.15} isPlaying={this.state.currentTrack.isPlaying} height="40%"></Soundwave>
        </div>
      )
    }
    return (
      <div className="home-container">
        <div className="section">
          <span className="sectionHeader">Alex Bisaillion</span>
          <p>Hi there! I'm Alex Bisaillion, a third-year computer science student at Carleton University. This is my personal website, where I experiment with web development. Enjoy your stay!</p>
        </div>
        <div className="section">
          <Link to="/music/" className="sectionHeader">Music</Link>
          <p>This page showcases my music listening habits, including my currently playing track, recent listening history, and top artists and songs for varying time ranges. It was built using the Spotify API.</p>
        </div>
        {currentlyPlaying}
      </div>
    );
  }
}
  
export default Home;