import React, { Component } from 'react';
import LoadingIcon from './LoadingIcon';
import Soundwave from './Soundwave';
import HomeCard from './HomeCard';

import './Home.css'
const homeCards = require('../data/homeCards');

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
    fetch(`/currentTrack`)
      .then(res => res.json())
      .then(currentTrack => this.setState({ currentTrack: currentTrack, infoWidth: this.info.current.offsetWidth, isLoading: false}));
  }

  render() {
    let currentlyPlaying;

    if (this.state.isLoading) {
      currentlyPlaying = <div className="currentlyPlaying" ref={this.info}><LoadingIcon height="100px" width="100px"></LoadingIcon></div>
    } else {
      let gradient = `radial-gradient(circle at top, #181818, #181818, ${this.state.currentTrack.colour})`
      currentlyPlaying = (
        <div className="currentlyPlaying" style={{background: gradient, borderRadius: "25px", borderStyle: "solid", borderColor: this.state.currentTrack.colour}} ref={this.info}>
          <span style={{ fontSize: "1em" }}>{this.state.currentTrack.isPlaying ? "I'm currently listening to..." : "I last listened to..."}</span>
          <img src={this.state.currentTrack.art} alt="art" className="trackArt"/>
          <div className="trackInformation">
            <span className="trackArtist">{this.state.currentTrack.artist}</span>
            <span style={{ fontSize: "1.25em"}}><i>{this.state.currentTrack.track}</i></span>
          </div>
          <Soundwave colour={this.state.currentTrack.colour} infoWidth={this.state.infoWidth * 0.20} isPlaying={this.state.currentTrack.isPlaying} height="100px"></Soundwave>
        </div>
      )
    }
    return (
      <div className="home-container">
        <div className="introduction">
          <span className="sectionHeader">ALEX BISAILLION</span>
          <p>Hi there! I'm Alex Bisaillion, a third-year computer science student at Carleton University. This is my personal website, where I experiment with web development. Enjoy your stay!</p>
        </div>

        <div className="cards">
          <HomeCard info={homeCards[0]}></HomeCard>
          <HomeCard info={homeCards[1]}></HomeCard>
          <HomeCard info={homeCards[2]}></HomeCard>
        </div>
        {currentlyPlaying}
      </div>
    );
  }
}
  
export default Home;