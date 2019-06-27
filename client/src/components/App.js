import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home';
import Music from './Music';
//import './Style.css';
//import NavigationBar from './NavigationBar';
import './NavigationBar.css'


class App extends Component {
  render() {
    return (
      <Router>
          <ul>
            <li><a href="/">Home</a></li>
            <li>
              <a href="https://github.com/alexbisaillion">
                <svg width={25} height={25}>       
                  <image xlinkHref="https://simpleicons.org/icons/github.svg" height={25} width={25}/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/alexbisaillion/">
                <svg width={25} height={25}>       
                  <image xlinkHref="https://simpleicons.org/icons/linkedin.svg" height={25} width={25}/>
                </svg>
              </a>
            </li>
            <li>
              <a href="mailto:a.bisaillion@gmail.com">
                <svg width={25} height={25}>       
                  <image xlinkHref="https://simpleicons.org/icons/gmail.svg" height={25} width={25}/>
                </svg>
              </a>
            </li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about/">About</Link></li>
          </ul>
          <div id="content">
            <Route path="/" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
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

function Users() {
  return <h2>Users</h2>;
}

export default App;