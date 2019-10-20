import React, { Component } from 'react';
import './ListEntry.css'

const seenLive = ["The Weeknd", "6LACK", "Belly", "Rae Sremmurd", "Kendrick Lamar", "DRAM", "YG", "ScHoolboy Q", "Jay Rock", "Ab-Soul", "SiR", "Lance Skiiiwalker", "Travis Scott", "Sheck Wes"];

class ListEntry extends Component {
  render() {
    let formattedArtist;
    if (seenLive.includes(this.props.artist)) {
      formattedArtist = <span className="list-entry-artist-live">{this.props.artist}</span>;
    } else {
      formattedArtist = <span className="list-entry-artist">{this.props.artist}</span>;
    }

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
          <span className="list-entry-timestamp">{this.props.timestamp}</span>
        }
      </div>
    );
  }
}
  
export default ListEntry;