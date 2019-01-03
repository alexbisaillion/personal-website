// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import './App.css';
import github from './github.svg';
import linkedin from './linkedin.svg';
import gmail from './gmail.svg';

class App extends Component {
  state = {tracks: []}

  componentDidMount() {
    fetch('/stats')
      .then(res => res.json())
      .then(tracks => this.setState({ tracks }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Alex Bisaillion</h1>
          <h3>Computer Science student at Carleton University</h3>
          <table cellSpacing="60">
            <tbody>
              <tr>
                <td>
                  <a href="https://github.com/alexbisaillion" target="_blank" rel="noopener noreferrer">
                    <img src={github} className="App-logo" alt="logo" />
                  </a>
                </td>
                <td>
                  <a href="https://www.linkedin.com/in/alexbisaillion/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} className="App-logo" alt="logo" />
                  </a>
                </td>
                <td>
                  <a href="mailto:webdesign@example.com">
                    <img src={gmail} className="App-logo" alt="logo" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              {this.state.tracks.map(track =>
                <tr key={track.id}>
                  <td><img src={track.art} height="150" width="150"/></td>
                  <td>
                    <p><font size = "24">{track.artist}</font></p>
                    <p><i>{track.title}</i></p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default App;