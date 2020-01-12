import React, { Component } from 'react';
import SideProject from './SideProject';
import './SideProjectPage.css';
import { ReactComponent as ReactImg } from '../img/react.svg'
import { ReactComponent as NodeJSImg } from '../img/node-dot-js.svg';
import { ReactComponent as Css3Img } from '../img/css3.svg';
import { ReactComponent as Html5Img } from '../img/html5.svg';
import { ReactComponent as JavaScriptImg } from '../img/javascript.svg';
import { ReactComponent as JavaImg } from '../img/java.svg';
import { ReactComponent as PythonImg } from '../img/python.svg';

class Technology {
  constructor(name, colour, image) {
    this.name = name;
    this.colour = colour;
    this.image = image;
  }
}

const react = new Technology("React", "#61DAFB", ReactImg);
const nodeJS = new Technology("Node.js", "#339933", NodeJSImg);
const html5 = new Technology("HTML5", "#E34F26", Html5Img);
const css3 = new Technology("CSS3", "#1572B6", Css3Img);
const javascript = new Technology("JavaScript", "#F7DF1E", JavaScriptImg);
const java = new Technology("Java", "#007396", JavaImg);
const python = new Technology("Python", "#3776AB", PythonImg);

let websiteTechnologies = [react, nodeJS, html5, css3, javascript];
let websiteDescription = "This is what you're currently viewing! This client side of this website is built in React, while the server side is written in Node.js. The server handles requests made to the Spotify API for the music page. This website extensively uses CSS3 features, including flexboxes, grids, and gradients. Additionally, some aspects of HTML5 are incorporated into the website, such as inline svg images. Some modern JavaScript features used in the website include classes, anonymous functions, and arrow functions.";
let websiteGithub = "https://github.com/alexbisaillion/personal-website";
let websiteImages = [
  {full: '/img/homeDesktop.png', preview: '/img/homeDesktopPreview.png', width: '100%'},
  {full: '/img/currentTrack.png', preview: '/img/currentTrackPreview.png', width: '100%'},
  {full: '/img/topTracks.png', preview: '/img/topTracksPreview.png', width: '100%'},
  {full: '/img/homeMobile.png', preview: '/img/homeMobilePreview.png', width: '40%'},
];

let splitScrobblerTechnologies = [react, nodeJS, html5, css3, javascript];
let splitScrobblerDescription = "This is a ReactJS web app that helps Last.fm users find duplicate records in their library. Duplicate records often arise from variations in metadata between different streaming services, or updates to the tags of already existing songs, such as adding a feature tag. This tool accesses all relevant information from the user's profile via calls to the Last.fm API made on an Express server. This data is then processed using an algorithm that I wrote that searched for duplicate tracks, albums, or artists. Once the algorithm completes, all results are displayed to the user, along with an external link to that record in the specified user's profile so they can edit it accordingly. The user can also save the results of the search in either CSV or JSON format."
let splitScrobblerGithub = "https://github.com/alexbisaillion/split-scrobbler";
let splitScrobblerImages = [
  {full: '/img/splitScrobblerHome.png', preview: '/img/splitScrobblerHomePreview.png', width: '100%'},
  {full: '/img/splitScrobblerAbout.png', preview: '/img/splitScrobblerAboutPreview.png', width: '100%'},
  {full: '/img/splitScrobblerResults.png', preview: '/img/splitScrobblerResultsPreview.png', width: '100%'},
  {full: '/img/splitScrobblerMobile.png', preview: '/img/splitScrobblerMobilePreview.png', width: '40%'},
];
let splitScrobblerLink = "https://split-scrobbler.herokuapp.com/";

let musicManagerTechnologies = [java, python];
let musicManagerDescription = "This is a JavaFX application I built to automate my music library of local files. It allows for archive and audio files to be sorted into a music library, added to iTunes, converted into MP3 and AAC format via iTunes, and have the converted files moved around within the local file system. Supported archive file types include .zip, .rar, and .7z, while supported audio file types include all that are supported by iTunes, including .m4a, .mp3, .aac, .wav, and .aiff.\nThe application is written in Java, with JavaFX driving the user interface, while Python is used to communicate to the iTunes COM interface.";
let musicManagerGithub = "https://github.com/alexbisaillion/local-music-manager";
let musicManagerImages = [
  {full: '/img/mainScreen.png', preview: '/img/mainScreenPreview.png', width: '100%'},
  {full: '/img/processingDialog.png', preview: '/img/processingDialogPreview.png', width: '100%'},
  {full: '/img/confirmationDialog.png', preview: '/img/confirmationDialogPreview.png', width: '100%'},
  {full: '/img/setupDialog.png', preview: '/img/setupDialogPreview.png', width: '60%'},
];

class SideProjectPage extends Component {
  render() {
    return (
      <div className="side-project-page-container">
        <SideProject technologies={websiteTechnologies} name="Personal Website" description={websiteDescription} images={websiteImages} github={websiteGithub}></SideProject>
        <SideProject technologies={splitScrobblerTechnologies} name="Split Scrobbler" description={splitScrobblerDescription} images={splitScrobblerImages} github={splitScrobblerGithub} link={splitScrobblerLink}></SideProject>
        <SideProject technologies={musicManagerTechnologies} name="Local Music Manager" description={musicManagerDescription} images={musicManagerImages} github={musicManagerGithub}></SideProject>
      </div>
    )
  }
}

export default SideProjectPage;