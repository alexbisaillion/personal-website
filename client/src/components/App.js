import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home';
import Music from './Music';
import './Style.css';
import NavigationBar from './NavigationBar';

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
     <Router>
      <div>
        <NavigationBar></NavigationBar>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/music/">Music</Link>
          </li>
        </ul>
        <Container fluid={true}>
          <Row>
            <Col xs={12}>
              <Route path="/" exact component={Home} />
              <Route path="/home/" component={Home} />
              <Route path="/music/" component={Music} />
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
    )
  }
}
function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
  export default App;