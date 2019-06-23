import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import Home from './Home';
import Music from './Music';
import './Style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content };
    this.getContent = this.getContent.bind(this);
  }

  getContent() {
    if (this.state.content === "home") {
      return <Home></Home>;
    } else if (this.state.content === "music") {
      return <Music></Music>;
    }
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col xs={2}>
            <h2><a href="#">Education</a></h2>
            <h2><a href="#">Projects</a></h2>
            <h2><a href="#">Music</a></h2>
          </Col>
          <Col xs={10}>
            {this.getContent()}
          </Col>
        </Row>
      </Container>
    )
  }
}
    
  export default App;