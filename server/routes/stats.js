var express = require('express');
var router = express.Router();
var statGenerator = require('../spotify/statGenerator');

/* GET stats listing. */
router.get('/', function(req, res, next) {
  if(req.query.type === "tracks") {
    if (req.query.numResults) {
      statGenerator.getTopTracks(req.query.timeRange, req.query.numResults).then(
        function (data) {
          console.log("Completed successfully.");
          res.json(data);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      )
    }
  } else if (req.query.type === "artists") {
    if (req.query.numResults) {
      statGenerator.getTopArtists(req.query.timeRange, req.query.numResults).then(
        function (data) {
          console.log("Completed successfully.");
          res.json(data);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      )
    }
  } else if (req.query.type === "feed") {
    console.log('making request');
    if (req.query.numResults) {
      statGenerator.getFeed(req.query.numResults).then(
        function (data) {
          console.log("Completed successfully.");
          res.json(data);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      )
    }
  } else if (req.query.type === "currentTrack") {
    statGenerator.getCurrentTrack().then(
      function (data) {
        console.log("Completed successfully.");
        res.json(data);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    )
  } 
});

module.exports = router;
