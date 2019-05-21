import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Intro from './components/Intro';
import SongStats from './components/SongStats';
import ArtistStats from './components/ArtistStats';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Intro />, document.getElementById('intro'));
ReactDOM.render(<SongStats />, document.getElementById('songStats'));
ReactDOM.render(<ArtistStats />, document.getElementById('artistStats'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
