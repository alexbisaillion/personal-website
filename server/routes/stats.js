var express = require('express');
var router = express.Router();
var statGenerator = require('../spotify/statGenerator');

/* GET stats listing. */
router.get('/', function(req, res, next) {
    if (req.query.timeRange && req.query.numResults) {
        if(req.query.type === "tracks") {
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
        else if (req.query.type === "artists") {
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
    }
});

module.exports = router;
