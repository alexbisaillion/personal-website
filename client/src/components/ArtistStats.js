import React, { Component } from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import './ArtistStats.css';
import 'bootstrap/dist/css/bootstrap.css';


const ranges = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
}

class ArtistStats extends Component {
  constructor(props) {
    super(props);
    this.state = {artists: [], numResults: 50, timeRange: ranges.SHORT_TERM};
  }

  componentDidMount() {
    fetch(`/stats?type=artists&timeRange=${this.state.timeRange}&numResults=${this.state.numResults}`)
      .then(res => res.json())
      .then(artists => this.setState({ artists }));
  }

  updateTimeRange(newTimeRange) {
    fetch(`/stats?type=artists&timeRange=${newTimeRange}&numResults=${this.state.numResults}`).then(res => res.json()).then(artists => this.setState({ artists }));
    this.setState({timeRange: newTimeRange});
    console.log('Time range was updated.');
  }

  updateNumResults(newNumResults) {
    fetch(`/stats?type=artists&timeRange=${this.state.timeRange}&numResults=${newNumResults}`).then(res => res.json()).then(artists => this.setState({ artists }));
    this.setState({numResults: newNumResults});
    console.log('Number of results was updated.');
  }

  render() {
    return (
      <div className="ArtistStats">
          <DropdownButton id="dropdown-basic-button" title={this.state.timeRange}>
            <Dropdown.Item href="#" onClick={() => this.updateTimeRange("short_term")}>Short Term</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.updateTimeRange("medium_term")}>Medium Term</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.updateTimeRange("long_term")}>Long Term</Dropdown.Item>
          </DropdownButton>
          <input value={this.state.numResults} onChange={event => this.updateNumResults(event.target.value.replace(/\D/,''))}/>
        <table cellPadding="20">
          <tbody>
            {this.state.artists.map(artist =>
              <tr key={artist.id}>
                <td style={{width: "150px"}}><img src={artist.image} height="150" width="150" alt="art"/></td>
                <td>
                  <p><font size = "24">{artist.name}</font></p>
                  <p><i>{artist.name}</i></p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ArtistStats;