import React, { Component } from 'react';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import { ReactComponent as GitHub } from '../img/github.svg';
import { ReactComponent as LinkedIn } from '../img/linkedin.svg'; 
import { ReactComponent as Gmail } from '../img/gmail.svg'; 

class NavigationBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="dropdown">
          <div className="dropbtn">
            ALEX BISAILLION
          </div>
          <div className="dropdown-content">
            <Link to="/">Home</Link>
            <Link to="/music/">Music</Link>
            <Link to="/sideprojects/">Side Projects</Link>
          </div>
        </div>
        <div className="navbar-right">
          <a href="https://github.com/alexbisaillion" target="_blank">
            <GitHub width={25} height={25}></GitHub>
          </a>
          <a href="https://www.linkedin.com/in/alexbisaillion/" target="_blank">
            <LinkedIn width={25} height={25}></LinkedIn>
          </a>
          <a href="mailto:a.bisaillion@gmail.com" target="_blank">
            <Gmail width={25} height={25}></Gmail>
          </a>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
