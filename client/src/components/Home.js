import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import github from '../img/github.svg';
import linkedin from '../img/linkedin.svg';
import gmail from '../img/gmail.svg';
import './Style.css';

class Home extends Component {
  render() {
    return (
      <div>
        <Row>
          <h1>Alex Bisaillion</h1>
        </Row>
        <Row>
          <h3>Computer Science student at Carleton University</h3>
        </Row>
        <Row>
          <Col xs={4}>
            <a href="https://github.com/alexbisaillion" target="_blank" rel="noopener noreferrer">
              <img src={github} className="imageLink" alt="GitHub" />
            </a>
          </Col>
          <Col xs={4}>
            <a href="https://www.linkedin.com/in/alexbisaillion/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} className="imageLink" alt="LinkedIn" />
            </a>
          </Col>
          <Col xs={4}>
            <a href="mailto:a.bisaillion@gmail.com">
              <img src={gmail} className="imageLink" alt="Email" />
            </a>
          </Col>
        </Row>
      </div>
    );
  }
}
  
export default Home;