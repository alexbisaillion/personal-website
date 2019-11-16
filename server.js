const express = require('express');
const path = require('path');
const routes = require('./spotify/routes');
const sslRedirect = require('heroku-ssl-redirect');
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(sslRedirect());

app.get('/tracks', (req, res) => {
  if (req.query.numResults && req.query.timeRange) {
    routes.getTopTracks(req.query.timeRange, req.query.numResults).then(
      function (data) {
        console.log("Tracks request completed successfully.");
        res.json(data);
      },
      function (err) {
        res.status(500).send("Internal error.")
      }
    )
  } else {
    res.status(400).send("Bad request.");
  }
});

app.get('/artists', (req, res) => {
  if (req.query.numResults && req.query.numResults) {
    routes.getTopArtists(req.query.timeRange, req.query.numResults).then(
      function (data) {
        console.log("Artists request completed successfully.");
        res.json(data);
      },
      function (err) {
        res.status(500).send("Internal error.")
      }
    )
  } else {
    res.status(400).send("Bad request.");
  }
});

app.get('/currentTrack', (req, res) => {
  routes.getCurrentTrack().then(
    function (data) {
      console.log("Current track request completed successfully.");
      res.json(data);
    },
    function (err) {
      res.status(500).send("Internal error.")
    }
  )
});

app.get('/recentTracks', (req, res) => {
  if (req.query.numResults) {
    routes.getRecentTracks(req.query.numResults).then(
      function (data) {
        console.log("Recent tracks request completed successfully.");
        res.json(data);
      },
      function (err) {
        res.status(500).send("Internal error.")
      }
    )
  } else {
    res.status(400).send("Bad request.");
  }
});

app.get('/*', (req, res) => {
  let url = path.join(__dirname, './client/build', 'index.html');
  res.sendFile(url);
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server listening on ${port}...`);
