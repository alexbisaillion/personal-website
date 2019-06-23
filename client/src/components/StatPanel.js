import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';

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
        <Row className="mb-2">
          <Col xs={5}>
            <select className="form-control" name="timeRange" value={this.state.timeRange} onChange={this.handleInputChange}>
              <option value="short_term">Short Term</option>
              <option value="medium_term">Medium Term</option>
              <option value="long_term">Long Term</option>
            </select>
          </Col>
          <Col xs={2}>
            <input className="form-control" name="numResults" type="number" value={this.state.numResults} onChange={this.handleInputChange}></input>
          </Col>
          <Col xs={5}>
            <input className="form-control" type="submit" value="Update"/>
          </Col>
        </Row>
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
      <div className="entry" key={item.id}>
        <Row className="align-items-center border border-white">
          <Col xs={4}>
            <img src={item.image} alt="art"/>
          </Col>
          <Col xs={8}>
            {formattedArtist}
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
          <div className="resultList">
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