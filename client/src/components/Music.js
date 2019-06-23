import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import StatPanel from './StatPanel';

class Music extends Component {
  render() {
    return (
      <Row>
        <Col xs={6}><StatPanel itemType="tracks" /></Col>
        <Col xs={6}><StatPanel itemType="artists" /></Col>
      </Row>
    );
  }
}
  
export default Music;