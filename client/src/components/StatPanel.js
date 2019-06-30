import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import './StatPanel.css'

const ranges = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
}

const seenLive = ["The Weeknd", "6LACK", "Belly", "Rae Sremmurd", "Kendrick Lamar", "DRAM", "YG", "ScHoolboy Q", "Jay Rock", "Ab-Soul", "SiR", "Lance Skiiiwalker", "Travis Scott", "Sheck Wes"];

class StatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], numResults: 50, timeRange: ranges.SHORT_TERM, itemType: props.itemType};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  componentDidMount() {
    fetch(`/stats?type=${this.state.itemType}&timeRange=${this.state.timeRange}&numResults=${this.state.numResults}`)
      .then(res => res.json())
      .then(items => this.setState({ items }));
  }

  updateResults(event) {
    fetch(`/stats?type=${this.state.itemType}&timeRange=${this.state.timeRange}&numResults=${this.state.numResults}`).then(res => res.json()).then(items => this.setState({ items }));
    event.preventDefault();
  }

  handleInputChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  resultsForm() {
    return (
      <form onSubmit={this.updateResults}>
        <div className="results-form-container">
          <select name="timeRange" value={this.state.timeRange} onChange={this.handleInputChange}>
            <option value="short_term">Short Term</option>
            <option value="medium_term">Medium Term</option>
            <option value="long_term">Long Term</option>
          </select>
          <input name="numResults" type="number" value={this.state.numResults} onChange={this.handleInputChange} min="1" max="50"></input>
          <input type="submit" value="Update"/>
        </div>
      </form>
    )
  }

  listEntry(item) {
    let formattedArtist;
    if (seenLive.includes(item.artist)) {
      formattedArtist = <h2 style={{color: "#56B5D9"}}>{item.artist}</h2>;
    } else {
      formattedArtist = <h2>{item.artist}</h2>;
    }

    return (
      <div className="record-container" key={item.id}>
        <img src={item.image} className="record-image" alt="art"/> 
        <div className="record-info-container">
          {formattedArtist}
          {this.state.itemType === "tracks" &&
            <p><i>{item.title}</i></p>
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="stat-panel-container">
        {this.resultsForm()}
        <div className="results">
          {this.state.items.map(item =>
            this.listEntry(item)
          )}
        </div>
      </div>
    );
  }
}

export default StatPanel;