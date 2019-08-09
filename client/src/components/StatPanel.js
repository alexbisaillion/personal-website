import React, { Component } from 'react';
import List from './List';
import ListEntry from './ListEntry';
import LoadingIcon from './LoadingIcon';
import './StatPanel.css'

const ranges = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
}

class StatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], numResults: 50, timeRange: ranges.SHORT_TERM, itemType: props.itemType, isLoading: true};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateResults = this.updateResults.bind(this);
  }

  componentDidMount() {
    fetch(`/stats?type=${this.state.itemType}&timeRange=${this.state.timeRange}&numResults=${this.state.numResults}`)
      .then(res => res.json())
      .then(items => this.setState({ items: items, isLoading: false }));
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

  render() {
    if (this.state.isLoading) {
      return (
        <div className="stat-section-container" ref={this.info}>
          <div className="stat-panel-loading">
            <LoadingIcon height="100px" width="100px"></LoadingIcon>
          </div>
        </div>
      )
    }
    return (
      <div className="stat-section-container">
        <div>{this.resultsForm()}</div>
        <List>
          {this.state.items.map(item =>
            <ListEntry art={item.image} artist={item.artist} track={item.title} key={item.id}></ListEntry>
          )}
        </List>
      </div>
    );
  }
}

export default StatPanel;