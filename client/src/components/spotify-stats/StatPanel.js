import React, { Component } from 'react';
import List from './List';
import ListEntry from './ListEntry';
import LoadingIcon from '../LoadingIcon';
import './StatPanel.css'

const ranges = {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
}

class StatPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], numResults: 50, timeRange: ranges.SHORT_TERM, itemType: props.itemType, isLoading: true, info: {}};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.TopAlbums = this.TopAlbums.bind(this);
    this.TopYears = this.TopYears.bind(this);
    this.TopGenres = this.TopGenres.bind(this);
    this.MostMainstream = this.MostMainstream.bind(this);
    this.MostObscure = this.MostObscure.bind(this);
  }

  componentDidMount() {
    fetch(`/${this.state.itemType}?timeRange=${this.state.timeRange}&numResults=${this.state.numResults}`)
      .then(res => res.json())
      .then(response => this.setState({ items: response.items, isLoading: false, info: response.info }));
  }

  updateResults(event) {
    fetch(`/${this.state.itemType}?timeRange=${this.state.timeRange}&numResults=${this.state.numResults}`).then(res => res.json()).then(response => this.setState({ items: response.items, info: response.info }));
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

  TopAlbums() {
    return (
      <div className="stat-panel-section">
        <span className="stat-panel-section-header">Top Albums</span>
        <div className="stat-panel-info-list">
          {this.state.info.topAlbums.map(album =>
            <div className="stat-panel-album" key={album}>
              <img src={album.split("|")[2]} alt="art" className="stat-panel-album-image"/>              
              <span key={album} className="stat-panel-album-title">{album.split("|")[0] + " - " + album.split("|")[1]}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  TopYears() {
    return (
      <div className="stat-panel-section">
        <span className="stat-panel-section-header">Top Years</span>
        <div className="stat-panel-info-list">
          {this.state.info.topYears.map(year =>
            <span key={year}>{year}</span>
          )}
        </div>
      </div>
    )
  }

  TopGenres() {
    return (
      <div className="stat-panel-section">
        <span className="stat-panel-section-header">Top Genres</span>
        <div className="stat-panel-info-list">
          {this.state.info.topGenres.map(genre =>
            <span key={genre} style={{textTransform: "capitalize"}}>{genre}</span>
          )}
        </div>
      </div>
    )
  }

  MostMainstream() {
    return (
      <div className="stat-panel-section">
        <span className="stat-panel-section-header">Most Mainstream</span>
        <div className="stat-panel-popularity">
          <img src={this.state.info.mostPopularArtist.image} alt="art" className="stat-panel-popularity-image"/>
          <span>{this.state.info.mostPopularArtist.artist}</span>
        </div>
      </div>
    )
  }

  MostObscure() {
    return (
      <div className="stat-panel-section">
        <span className="stat-panel-section-header">Most Obscure</span>
        <div className="stat-panel-popularity">
          <img src={this.state.info.leastPopularArtist.image} alt="art" className="stat-panel-popularity-image"/>
          <span>{this.state.info.leastPopularArtist.artist}</span>
        </div>
      </div>
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

    let header = <span className="stat-panel-info-header">{this.state.itemType === "artists" ? "Top Artists" : "Top Tracks"}</span>
    return (
      <div className="stat-section-container">
        <div className="stat-panel-info-container">
          {header}
          {this.resultsForm()}
          {this.state.itemType === "tracks" &&
            <this.TopAlbums></this.TopAlbums>
          }
          {this.state.itemType === "tracks" &&
            <this.TopYears></this.TopYears>
          }
          {this.state.itemType === "artists" &&
            <this.TopGenres></this.TopGenres>
          }
          {this.state.itemType === "artists" &&
            <this.MostMainstream></this.MostMainstream>
          }
          {this.state.itemType === "artists" &&
            <this.MostObscure></this.MostObscure>
          }
        </div>
        <List>
          {this.state.items.map(item =>
            <ListEntry art={item.image} artist={item.artist} track={item.title} key={item.id} url={item.url}></ListEntry>
          )}
        </List>
      </div>
    );
  }
}

export default StatPanel;