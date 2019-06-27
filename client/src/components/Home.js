import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import github from '../img/github.svg';
import linkedin from '../img/linkedin.svg';
import gmail from '../img/gmail.svg';
//import './Style.css';

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
      </div>
    );
  }
}
  
export default Home;