import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import './StatPanel.css';

const ranges = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
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
        <Row>
          <Col xs={4}>
            <select name="timeRange" value={this.state.timeRange} onChange={this.handleInputChange}>
              <option value="short_term">Short Term</option>
              <option value="medium_term">Medium Term</option>
              <option value="long_term">Long Term</option>
            </select>
          </Col>
          <Col xs={4}>
            <input name="numResults" type="number" value={this.state.numResults} onChange={this.handleInputChange}></input>
          </Col>
          <Col xs={4}>
            <input type="submit" value="Update" />
          </Col>
        </Row>
      </form>
    )
  }

  listEntry(item) {
    return (
      <div class="entry" key={item.id}>
        <Row className="align-items-center border border-dark no-gutters">
          <Col xs={4}>
            <img src={item.image} alt="art"/>
          </Col>
          <Col xs={8}>
            <h3>{item.artist}</h3>
            {this.state.itemType === "tracks" &&
              <p><i>{item.title}</i></p>
            }
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return (
      <div className="StatPanel">
        <Container fluid={true}>
          {this.resultsForm()}
          <div class="resultList">
            {this.state.items.map(item =>
              this.listEntry(item)
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default StatPanel;