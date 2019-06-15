import React, { Component } from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import './StatPanel.css';
import 'bootstrap/dist/css/bootstrap.css';

const ranges = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
}

class StatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], numResults: 50, timeRange: ranges.SHORT_TERM, itemType: props.itemType};
  }

  componentDidMount() {
    fetch(`/stats?type=${this.state.itemType}&timeRange=${this.state.timeRange}&numResults=${this.state.numResults}`)
      .then(res => res.json())
      .then(items => this.setState({ items }));
  }

  updateTimeRange(newTimeRange) {
    fetch(`/stats?type=${this.state.itemType}&timeRange=${newTimeRange}&numResults=${this.state.numResults}`).then(res => res.json()).then(items => this.setState({ items }));
    this.setState({timeRange: newTimeRange});
    console.log('Time range was updated.');
  }

  updateNumResults(newNumResults) {
    fetch(`/stats?type=${this.state.itemType}&timeRange=${this.state.timeRange}&numResults=${newNumResults}`).then(res => res.json()).then(items => this.setState({ items }));
    this.setState({numResults: newNumResults});
    console.log('Number of results was updated.');
  }

  render() {
    return (
      <div className="StatPanel">
          <DropdownButton id="dropdown-basic-button" title={this.state.timeRange}>
            <Dropdown.Item href="#" onClick={() => this.updateTimeRange("short_term")}>Short Term</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.updateTimeRange("medium_term")}>Medium Term</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => this.updateTimeRange("long_term")}>Long Term</Dropdown.Item>
          </DropdownButton>
          <input value={this.state.numResults} onChange={event => this.updateNumResults(event.target.value.replace(/\D/,''))}/>
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