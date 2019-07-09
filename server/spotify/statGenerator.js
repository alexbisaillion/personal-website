let SpotifyWebApi = require('spotify-web-api-node');
let credentials = require('../spotify/credentials');

let spotifyApi = new SpotifyWebApi({
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
    let data = await spotifyApi.getMyCurrentPlayingTrack();
    if (data.statusCode === 204) {
      console.log("good");
      data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 });
      console.log(data);
      return createLastTrackResponse(data);
    } else {
      return createCurrentTrackResponse(data);
    }
  },
  getRecentTracks: async function (numResults) {
    await refreshCredentials();
    const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: numResults });
    return createRecentTracksResponse(data);
  },
  getFeed: async function (numResults) {
    await refreshCredentials();
    const recentTracks = await spotifyApi.getMyRecentlyPlayedTracks({ limit: numResults });
    const currentTrack = await spotifyApi.getMyCurrentPlayingTrack();
    return createFeedResponse(recentTracks, currentTrack);
  },
};

function createTopTracksResponse(data) {
  let tracks = [];
  for (let i = 0; i < data.body.items.length; i++) {
    tracks.push({id : i, artist: data.body.items[i].artists[0].name, image: data.body.items[i].album.images[1].url, title: data.body.items[i].name});
  }
  return tracks;
}

function createTopArtistsResponse(data) {
  let artists = [];
  for (let i = 0; i < data.body.items.length; i++) {
    artists.push({id : i, artist: data.body.items[i].name, image: data.body.items[i].images[1].url});
  }
  return artists;
}

function createCurrentTrackResponse(data) {
  return ({artist: data.body.item.artists[0].name, track: data.body.item.name, album: data.body.item.album.name, art: data.body.item.album.images[0].url, isPlaying: data.body.is_playing})
}

function createLastTrackResponse(data) {
  return ({artist: data.body.items[0].track.artists[0].name, track: data.body.items[0].track.name, art: data.body.items[0].track.album.images[0].url, isPlaying: false});
}

function createRecentTracksResponse(data) {
  let tracks = [];
  for (let i = 0; i < data.body.items.length; i++) {
    tracks.push({id : i, artist: data.body.items[i].track.artists[0].name, title: data.body.items[i].track.name, art: data.body.items[i].track.album.images[1].url, date: data.body.items[i].played_at});
  }
  return tracks;
}

function createFeedResponse(recentTracks, currentTrack) {
  return { recentTracks: createRecentTracksResponse(recentTracks), currentTrack: createCurrentTrackResponse(currentTrack) }
}
