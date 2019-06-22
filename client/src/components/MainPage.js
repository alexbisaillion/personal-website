import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import Intro from './Intro';
import StatPanel from './StatPanel';
import './Style.css';

class MainPage extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col xs={2}>
            <p>Sidebar</p>
          </Col>
          <Col xs={10}>
            <Row>
              <Col xs={12}><Intro /></Col>
            </Row>
            <Row>
              <Col xs={6}><StatPanel itemType="tracks" /></Col>
              <Col xs={6}><StatPanel itemType="artists" /></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
  
export default MainPage;