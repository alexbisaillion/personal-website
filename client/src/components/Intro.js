import React, { Component } from 'react';
import './Intro.css';
import github from '../img/github.svg';
import linkedin from '../img/linkedin.svg';
import gmail from '../img/gmail.svg';

class Intro extends Component {
  render() {
    return (
      <div className="Intro">
        <header className="Intro-header">
          <h1>Alex Bisaillion</h1>
          <h3>Computer Science student at Carleton University</h3>
          <table cellSpacing="60">
            <tbody>
              <tr>
                <td>
                  <a href="https://github.com/alexbisaillion" target="_blank" rel="noopener noreferrer">
                    <img src={github} className="Intro-logo" alt="GitHub" />
                  </a>
                </td>
                <td>
                  <a href="https://www.linkedin.com/in/alexbisaillion/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} className="Intro-logo" alt="LinkedIn" />
                  </a>
                </td>
                <td>
                  <a href="mailto:a.bisaillion@gmail.com">
                    <img src={gmail} className="Intro-logo" alt="Email" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default Intro;