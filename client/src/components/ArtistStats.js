import React, { Component } from 'react';
import './ArtistStats.css';

class ArtistStats extends Component {
  state = {artists: []}

  componentDidMount() {
    fetch('/stats?type=artists&timeRange=medium_term&numResults=5')
      .then(res => res.json())
      .then(artists => this.setState({ artists }));
  }

  render() {
    return (
      <div className="ArtistStats">
        <header className="ArtistStats-header">
          <table>
            <tbody>
              {this.state.artists.map(artist =>
                <tr key={artist.id}>
                  <td><img src={artist.image} height="150" width="150" alt="art"/></td>
                  <td>
                    <p><font size = "24">{artist.name}</font></p>
                    <p><i>{artist.name}</i></p>
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

export default ArtistStats;