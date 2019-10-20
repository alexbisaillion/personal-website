import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Music from './Music';
import Home from './Home';
import SideProjectPage from './SideProjectPage';
import './App.css'
import NavigationBar from './NavigationBar';


class App extends Component {
  render() {
    return (
      <Router>
          <NavigationBar></NavigationBar>
          <div id="content">
            <Route path="/" exact component={Home} />
            <Route path="/music/" component={Music} />
            <Route path="/sideprojects/" component={SideProjectPage} />
          </div>
      </Router>
      
    )
  }
}

export default App;