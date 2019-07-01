var SpotifyWebApi = require('spotify-web-api-node');
var credentials = require('../spotify/credentials');

var spotifyApi = new SpotifyWebApi({
    clientId: credentials.CLIENT_ID,
    clientSecret: credentials.CLIENT_SECRET
});

async function refreshCredentials() {
    spotifyApi.setRefreshToken(credentials.REFRESH_TOKEN);
    const data = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(data.body['access_token']);
}

module.exports = {
    getTopTracks: async function (timeRange, numResults) {
        await refreshCredentials();
        const data = await spotifyApi.getMyTopTracks({ time_range: timeRange, limit: numResults });
        return createTopTracksResponse(data);
    },
    getTopArtists: async function (timeRange, numResults) {
        await refreshCredentials();
        const data = await spotifyApi.getMyTopArtists({ time_range: timeRange, limit: numResults });
        return createTopArtistsResponse(data);
    },
    getCurrentTrack: async function () {
        await refreshCredentials();
        const data = await spotifyApi.getMyCurrentPlayingTrack();
        return createCurrentTrackResponse(data);
    },
    getRecentTracks: async function (numResults) {
        await refreshCredentials();
        const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: numResults });
        return createRecentTracksResponse(data);
    },
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
    var tracks = [];
    for (let i = 0; i < data.body.items.length; i++) {
        tracks.push({id : i, artist: data.body.items[i].track.artists[0].name, title: data.body.items[i].track.name, art: data.body.items[i].track.album.images[1].url});
    }
    return tracks;
}
