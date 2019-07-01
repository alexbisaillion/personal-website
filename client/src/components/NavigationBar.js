import React, { Component } from 'react';
import './NavigationBar.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class NavigationBar extends Component {
  render() {
    return (
      <div class="topnav">
        <Link to="/">Alex Bisaillion</Link>
        <Link to="/music/">Music</Link>
        <div class="topnav-right">
          <a href="https://github.com/alexbisaillion">
            <svg width={25} height={25}>       
              <image xlinkHref="https://simpleicons.org/icons/github.svg" height={25} width={25}/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/alexbisaillion/">
            <svg width={25} height={25}>       
              <image xlinkHref="https://simpleicons.org/icons/linkedin.svg" height={25} width={25}/>
            </svg>
          </a>
          <a href="mailto:a.bisaillion@gmail.com">
            <svg width={25} height={25}>       
              <image xlinkHref="https://simpleicons.org/icons/gmail.svg" height={25} width={25}/>
            </svg>
          </a>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
