import React, { Component } from 'react';
import './ListEntry.css'

const seenLive = require('../../data/live');

class ListEntry extends Component {
  render() {
    let formattedArtist;
    if (seenLive.includes(this.props.artist)) {
      formattedArtist = <div className="list-entry-artist-live">{this.props.artist}</div>;
    } else {
      formattedArtist = <div className="list-entry-artist">{this.props.artist}</div>;
    }

    return (
      <div className="list-entry-container" key={this.props.id}>
        <a href={this.props.url} target="_blank" rel="noopener noreferrer">
          <img src={this.props.art} alt="art" className="list-entry-image"/>
        </a>
        <div className="list-entry-info-container">
          {formattedArtist}
          {this.props.track &&
            <div className="list-entry-track">{this.props.track}</div>
          }
        </div>
        {this.props.timestamp &&
          <div className="list-entry-timestamp">{this.props.timestamp}</div>
        }
      </div>
    );
  }
}
  
export default ListEntry;