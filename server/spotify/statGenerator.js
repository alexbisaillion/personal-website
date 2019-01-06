var SpotifyWebApi = require('spotify-web-api-node');
var credentials = require('../spotify/credentials');

var spotifyApi = new SpotifyWebApi({
    clientId: credentials.CLIENT_ID,
    clientSecret: credentials.CLIENT_SECRET
});

function refreshCredentials() {
    spotifyApi.setRefreshToken(credentials.REFRESH_TOKEN);
    return spotifyApi.refreshAccessToken().then(function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    });
}

module.exports = {
    getTopTracks: function (timeRange, numResults) {
        return refreshCredentials().then(function() {
            return spotifyApi.getMyTopTracks({time_range: timeRange, limit : numResults, offset : 0 });
        }).then(function(data) {
            return createTopTrackResponse(data);
        })
    },
    getTopArtists: function (timeRange, numResults) {
        return refreshCredentials().then(function() {
            return spotifyApi.getMyTopArtists({time_range: timeRange, limit : numResults, offset : 0 });
        }).then(function(data) {
            return createTopArtistResponse(data);
        })
    },
};

function createTopTrackResponse(data) {
    var tracks = [];
    for (let i = 0; i < data.body.items.length; i++) {
        tracks.push({id : i, artist: data.body.items[i].artists[0].name, title: data.body.items[i].name, art: data.body.items[i].album.images[0].url});
    }
    return tracks;
}

function createTopArtistResponse(data) {
    var artists = [];
    for (let i = 0; i < data.body.items.length; i++) {
        artists.push({id : i, name: data.body.items[i].name, image: data.body.items[i].images[0].url});
    }
    return artists;
}