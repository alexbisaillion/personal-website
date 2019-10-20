const express = require('express');
const path = require('path');
const statGenerator = require('./spotify/statGenerator');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/tracks', (req, res) => {
  if (req.query.numResults && req.query.timeRange) {
    statGenerator.getTopTracks(req.query.timeRange, req.query.numResults).then(
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
    statGenerator.getTopArtists(req.query.timeRange, req.query.numResults).then(
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
  statGenerator.getCurrentTrack().then(
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
    statGenerator.getRecentTracks(req.query.numResults).then(
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

app.get('*', (req, res) => {
  res.status(400).send("Resource not found.");
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log(`Server listening on ${port}...`);
