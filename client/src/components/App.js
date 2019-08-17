import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Music from './Music';
import Home from './Home';
import './App.css'
import NavigationBar from './NavigationBar';


class App extends Component {
  render() {
    return (
      <Router>
          <NavigationBar></NavigationBar>
          <div id="content">
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/music/" component={Music} />
          </div>
      </Router>
      
    )
  }
}

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default App;