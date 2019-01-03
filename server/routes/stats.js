var express = require('express');
var router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: 'redacted',
    clientSecret: 'redacted'
});

var refreshToken = 'redacted';
spotifyApi.setRefreshToken(refreshToken);

/* GET stats listing. */
router.get('/', function(req, res, next) {

    spotifyApi.refreshAccessToken().then(
        function(data) {
            console.log('The access token has been refreshed!');
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
    
            spotifyApi.getMyTopTracks({time_range: 'medium_term', limit : 50, offset : 0 })
                .then(function(data) {
                    var tracks = [];
                    for (let i = 0; i < data.body.items.length; i++) {
                        tracks.push({id : i, artist: data.body.items[i].artists[0].name, title: data.body.items[i].name, art: data.body.items[i].album.images[0].url});
                    }
                    res.json(tracks);
                }, function(err) {
                    console.log("Something went wrong!", err);
            });
    
        },
        function(err) {
            console.log('Could not refresh access token', err);
        }
    );
});

module.exports = router;
