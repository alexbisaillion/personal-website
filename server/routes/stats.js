var express = require('express');
var router = express.Router();
var statGenerator = require('../spotify/statGenerator');

/* GET stats listing. */
router.get('/', function(req, res, next) {
    if (req.query.timeRange && req.query.numTracks) {
        statGenerator.getTopTracks(req.query.timeRange, req.query.numTracks).then(
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
