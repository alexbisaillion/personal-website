import React, { Component } from 'react';
import './SongStats.css';

class SongStats extends Component {
  state = {tracks: []}

  componentDidMount() {
    fetch('/stats?type=tracks&timeRange=medium_term&numResults=5')
      .then(res => res.json())
      .then(tracks => this.setState({ tracks }));
  }

  render() {
    return (
      <div className="SongStats">
        <header className="SongStats-header">
          <table>
            <tbody>
              {this.state.tracks.map(track =>
                <tr key={track.id}>
                  <td><img src={track.art} height="150" width="150" alt="art"/></td>
                  <td>
                    <p><font size = "24">{track.artist}</font></p>
                    <p><i>{track.title}</i></p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default SongStats;