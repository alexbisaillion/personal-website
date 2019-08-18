import React, { Component } from 'react';
import SideProject from './SideProject';
import './SideProjectPage.css';
import reactImg from '../img/react.svg'
import nodeImg from '../img/node-dot-js.svg';
import css3Img from '../img/css3.svg';
import html5Img from '../img/html5.svg';
import javascriptImg from '../img/javascript.svg';
import javaImg from '../img/java.svg';
import pythonImg from '../img/python.svg';

class Technology {
  constructor(name, colour, image) {
    this.name = name;
    this.colour = colour;
    this.image = image;
  }
}

const react = new Technology("React", "#61DAFB", reactImg);
const nodeJS = new Technology("Node.js", "#339933", nodeImg);
const css3 = new Technology("CSS3", "#1572B6", css3Img);
const html5 = new Technology("HTML5", "#E34F26", html5Img);
const javascript = new Technology("JavaScript", "#F7DF1E", javascriptImg);
const java = new Technology("Java", "#007396", javaImg);
const python = new Technology("Python", "#3776AB", pythonImg);

let websiteTechnologies = [react, nodeJS, css3, html5, javascript];
let websiteDescription = "This is what you're currently viewing! This client side of this website is built in React, while the server side is written in Node.js. The server handles requests made to the Spotify API for the music page. This website extensively uses CSS3 features, including flexboxes, grids, and gradients. Additionally, some aspects of HTML5 are incorporated into the website, such as inline svg images. Some modern JavaScript features used in the website include classes, anonymous functions, and arrow functions.";
let websiteGithub = "https://github.com/alexbisaillion/website";
let musicManagerTechnologies = [java, python];
let musicManagerDescription = "This is a JavaFX application I built to automate my music library of local files. It allows for archive and audio files to be sorted into a music library, added to iTunes, converted into MP3 and AAC format via iTunes, and have the converted files moved around within the local file system. Supported archive file types include .zip, .rar, and .7z, while supported audio file types include all that are supported by iTunes, including .m4a, .mp3, .aac, .wav, and .aiff.\nThe application is written in Java, with JavaFX driving the user interface, while Python is used to communicate to the iTunes COM interface.";
let musicManagerGithub = "https://github.com/alexbisaillion/LocalMusicManager";

class SideProjectPage extends Component {
  render() {
    return (
      <div className="side-project-page-container">
        <SideProject technologies={websiteTechnologies} name="Personal Website" description={websiteDescription} github={websiteGithub}></SideProject>
        <SideProject technologies={musicManagerTechnologies} name="Local Music Manager" description={musicManagerDescription} github={musicManagerGithub}></SideProject>
      </div>
    )
  }
}

export default SideProjectPage;