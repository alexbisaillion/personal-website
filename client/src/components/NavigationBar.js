import React, { Component } from 'react';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import { ReactComponent as GitHub } from '../img/github.svg';
import { ReactComponent as LinkedIn } from '../img/linkedin.svg'; 
import { ReactComponent as Gmail } from '../img/gmail.svg'; 

class NavigationBar extends Component {
  render() {
    return (
      <div className="topnav">
        <Link to="/">Alex Bisaillion</Link>
        <Link to="/music/">Music</Link>
        <div className="topnav-right">
          <a href="https://github.com/alexbisaillion">
            <GitHub width={25} height={25}></GitHub>
          </a>
          <a href="https://www.linkedin.com/in/alexbisaillion/">
            <LinkedIn width={25} height={25}></LinkedIn>
          </a>
          <a href="mailto:a.bisaillion@gmail.com">
            <Gmail width={25} height={25}></Gmail>
          </a>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
