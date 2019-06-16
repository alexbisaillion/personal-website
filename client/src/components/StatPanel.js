import React, { Component } from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import './StatPanel.css';
import 'bootstrap/dist/css/bootstrap.css';

const ranges = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
}

const timeRangeDisplayName = {
  "short_term" : "Short Term",
  "medium_term" : "Medium Term",
  "long_term" : "Long Term"
}

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
        <select name="timeRange" value={this.state.timeRange} onChange={this.handleInputChange}>
          <option value="short_term">Short Term</option>
          <option value="medium_term">Medium Term</option>
          <option value="long_term">Long Term</option>
        </select>
        <input name="numResults" type="number" value={this.state.numResults} onChange={this.handleInputChange}></input>
        <input type="submit" value="Update" />
      </form>
    )
  }

  render() {
    return (
      <div className="StatPanel">
        {this.resultsForm()}
        <table cellPadding="20">
          <tbody>
            {this.state.items.map(item =>
              <tr key={item.id}>
                <td style={{width: "150px"}}><img src={item.image} height="150" width="150" alt="art"/></td>
                <td>
                  <p><font size = "24">{item.artist}</font></p>
                  {this.state.itemType === "tracks" &&
                    <p><i>{item.title}</i></p>
                  }
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StatPanel;