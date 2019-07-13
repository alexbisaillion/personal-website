import React, { Component } from 'react';
import moment from 'moment';
import * as Vibrant from 'node-vibrant'
import './ListEntry.css'

const seenLive = ["The Weeknd", "6LACK", "Belly", "Rae Sremmurd", "Kendrick Lamar", "DRAM", "YG", "ScHoolboy Q", "Jay Rock", "Ab-Soul", "SiR", "Lance Skiiiwalker", "Travis Scott", "Sheck Wes"];

class ListEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {dominantColour: "black" };
  }

  async componentDidMount() {
    await Vibrant.from(this.props.art).getPalette().then((palette) => this.setState({ dominantColour: palette.Vibrant.hex }));
  }

  render() {
    //Vibrant.from(this.props.art).getPalette().then((palette) => this.setState({ dominantColour: palette.Vibrant.hex }));

    let formattedArtist;
    if (seenLive.includes(this.props.artist)) {
      formattedArtist = <span className="list-entry-artist-live">{this.props.artist}</span>;
    } else {
      formattedArtist = <span className="list-entry-artist">{this.props.artist}</span>;
    }

    let gradient = `linear-gradient(to right, ${this.state.dominantColour}, black, black, black, black)`;

    return (
      <div className="list-entry-container">
        <img src={this.props.art} alt="art" className="list-entry-image"/>
        <div className="list-entry-info-container">
          {formattedArtist}
          {this.props.track &&
            <span className="list-entry-track">{this.props.track}</span>
          }
        </div>
        {this.props.timestamp &&
          <span className="list-entry-timestamp">{moment(new Date(this.props.timestamp)).fromNow()}</span>
        }
      </div>
    );
  }
}
  
export default ListEntry;