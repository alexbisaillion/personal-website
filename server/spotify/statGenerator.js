let SpotifyWebApi = require('spotify-web-api-node');
let credentials = require('../spotify/credentials');
let vibrant = require('node-vibrant');

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
    let parsedData;
    if (data.statusCode === 204) {
      data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 1 });
      parsedData = createLastTrackResponse(data);
    } else {
      parsedData = createCurrentTrackResponse(data);
    }
    const colour = await vibrant.from(parsedData.art).getPalette();
    //let maxColour = colour.Vibrant.population > colour.Muted.population ? colour.Vibrant.hex : colour.Muted.hex;
    let maxColour = colour.Vibrant.hex;
    let maxPopulation = colour.Vibrant.population;
    Object.keys(colour).forEach(function(key) {
      if (colour[key].population > maxPopulation) {
        maxColour = colour[key].hex;
      }
    });
    parsedData.colour = maxColour;
    return parsedData;
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
  let genres = {};
  for (let i = 0; i < data.body.items.length; i++) {
    artists.push({id : i, artist: data.body.items[i].name, image: data.body.items[i].images[1].url});
    for (let j = 0; j < data.body.items[i].genres.length; j++) {
      let genre = data.body.items[i].genres[j];
      genres[genre] = genres[genre] ? genres[genre] + 1 : 1;
    }
  }

  let genresSorted = Object.keys(genres).sort(
    function(a,b) {
      return genres[b] - genres[a];
    }
  )
  console.log(genresSorted.slice(0, 5));
  return artists;
}

function createCurrentTrackResponse(data) {
  return ({artist: data.body.item.artists[0].name, track: data.body.item.name, album: data.body.item.album.name, art: data.body.item.album.images[0].url, isPlaying: data.body.is_playing, date: data.body.timestamp})
}

function createLastTrackResponse(data) {
  return ({artist: data.body.items[0].track.artists[0].name, track: data.body.items[0].track.name, art: data.body.items[0].track.album.images[0].url, date: data.body.items[0].played_at});
}

function createRecentTracksResponse(data) {
  let tracks = [];
  let artists = {};
  let years = {};
  console.log(data.body.items[0]);
  for (let i = 0; i < data.body.items.length; i++) {
    let currentArtist = data.body.items[i].track.artists[0].name;
    let currentYear = new Date(data.body.items[i].track.album.release_date);
    tracks.push({id : i, artist: currentArtist, title: data.body.items[i].track.name, art: data.body.items[i].track.album.images[1].url, date: data.body.items[i].played_at});
    artists[currentArtist] = artists[currentArtist] ? artists[currentArtist] + 1 : 1;
    years[currentYear.getFullYear()] = years[currentYear.getFullYear()] ? years[currentYear.getFullYear()] + 1 : 1;

  }
  let artistsSorted = Object.keys(artists).sort(
    function(a,b) {
      return artists[b] - artists[a];
    }
  )
  let yearsSorted = Object.keys(years).sort(
    function(a,b) {
      return years[b] - years[a];
    }
  )
  console.log(artistsSorted.slice(0, 5));
  console.log(yearsSorted.slice(0, 5));
  return ({tracks: tracks, topArtists: artistsSorted.slice(0, 5), topYears: yearsSorted.slice(0, 5)})
}

function createFeedResponse(recentTracks, currentTrack) {
  return { recentTracks: createRecentTracksResponse(recentTracks), currentTrack: createCurrentTrackResponse(currentTrack) }
}
