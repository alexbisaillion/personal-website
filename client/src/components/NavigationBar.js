import React, { Component } from 'react';
import './NavigationBar.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class NavigationBar extends Component {
  render() {
    return (
      <ul>
        <li><a href="/">Alex Bisaillion</a></li>
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
        <li><Link to="/music/">Music</Link></li>
      </ul>
    );
  }
}

export default NavigationBar;
