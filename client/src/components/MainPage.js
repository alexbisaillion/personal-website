import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Intro from './Intro';
import StatPanel from './StatPanel';

class MainPage extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col xs={12}><Intro /></Col>
        </Row>
        <Row>
          <Col xs={6}><StatPanel itemType="tracks" /></Col>
          <Col xs={6}><StatPanel itemType="artists" /></Col>
        </Row>
      </Container>
    );
  }
}
  
  export default MainPage;