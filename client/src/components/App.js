import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
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
    console.log("rendering");
    return (
      <Container fluid={true}>
        <Row>
          <Col xs={2}>
            <Row><Button onClick={() => this.setState({ content : "home"})} color="black"><h2>Home</h2></Button></Row>
            <Row><Button onClick={() => this.setState({ content : "music"})} color="black"><h2>Music</h2></Button></Row>
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