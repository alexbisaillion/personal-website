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
            return spotifyApi.getMyTopTracks({time_range: timeRange, limit : numResults});
        }).then(function(data) {
            return createTopTracksResponse(data);
        })
    },
    getTopArtists: function (timeRange, numResults) {
        return refreshCredentials().then(function() {
            return spotifyApi.getMyTopArtists({time_range: timeRange, limit : numResults});
        }).then(function(data) {
            return createTopArtistsResponse(data);
        })
    },
    getCurrentTrack: function () {
        return refreshCredentials().then(function() {
            return spotifyApi.getMyCurrentPlayingTrack();
        }).then(function (data) {
            return createCurrentTrackResponse(data);
        });
    },
    getRecentTracks: function (numResults) {
        return refreshCredentials().then(function() {
            return spotifyApi.getMyRecentlyPlayedTracks({limit : numResults});
        }).then(function (data) {
            return createRecentTracksResponse(data);
        });
    }
};

function createTopTracksResponse(data) {
    var tracks = [];
    for (let i = 0; i < data.body.items.length; i++) {
        tracks.push({id : i, artist: data.body.items[i].artists[0].name, image: data.body.items[i].album.images[1].url, title: data.body.items[i].name});
    }
    return tracks;
}

function createTopArtistsResponse(data) {
    var artists = [];
    for (let i = 0; i < data.body.items.length; i++) {
        artists.push({id : i, artist: data.body.items[i].name, image: data.body.items[i].images[1].url});
    }
    return artists;
}

function createCurrentTrackResponse(data) {
    return ({artist: data.body.item.artists[0].name, track: data.body.item.name, album: data.body.item.album.name, art: data.body.item.album.images[1].url, isPlaying: data.body.is_playing})
}

function createRecentTracksResponse(data) {
    console.log(data.body.items);
    var tracks = [];
    for (let i = 0; i < data.body.items.length; i++) {
        tracks.push({id : i, artist: data.body.items[i].track.artists[0].name, title: data.body.items[i].track.name, art: data.body.items[i].track.album.images[1].url});
    }
    return tracks;
}