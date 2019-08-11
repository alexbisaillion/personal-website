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
  let years = {};
  let albums = {}
  for (let i = 0; i < data.body.items.length; i++) {
    tracks.push({id : i, artist: data.body.items[i].artists[0].name, image: data.body.items[i].album.images[1].url, title: data.body.items[i].name});
    let currentYear = new Date(data.body.items[i].album.release_date);
    let currentAlbum = data.body.items[i].artists[0].name + "|" + data.body.items[i].album.name + "|" + data.body.items[i].album.images[1].url;
    years[currentYear.getFullYear()] = years[currentYear.getFullYear()] ? years[currentYear.getFullYear()] + 1 : 1;
    albums[currentAlbum] = albums[currentAlbum] ? albums[currentAlbum] + 1 : 1;
  }
  let yearsSorted = Object.keys(years).sort(
    function(a,b) {
      return years[b] - years[a];
    }
  )
  let albumsSorted = Object.keys(albums).sort(
    function(a,b) {
      return albums[b] - albums[a];
    }
  )
  return {items: tracks, info: {topYears: yearsSorted.slice(0, 3), topAlbums: albumsSorted.slice(0, 3)}};
}

function createTopArtistsResponse(data) {
  let artists = [];
  let genres = {};
  let mostPopularArtist = { artist: "", popularity: -1 };
  let leastPopularArtist = { artist: "", popularity: 101 };
  for (let i = 0; i < data.body.items.length; i++) {
    artists.push({id : i, artist: data.body.items[i].name, image: data.body.items[i].images[1].url});
    for (let j = 0; j < data.body.items[i].genres.length; j++) {
      let genre = data.body.items[i].genres[j];
      genres[genre] = genres[genre] ? genres[genre] + 1 : 1;
    }
    if (data.body.items[i].popularity > mostPopularArtist.popularity) {
      mostPopularArtist = { artist: data.body.items[i].name, popularity: data.body.items[i].popularity, image: data.body.items[i].images[1].url }
    }
    if (data.body.items[i].popularity < leastPopularArtist.popularity) {
      leastPopularArtist = { artist: data.body.items[i].name, popularity: data.body.items[i].popularity, image: data.body.items[i].images[1].url }
    }
  }
  let genresSorted = Object.keys(genres).sort(
    function(a,b) {
      return genres[b] - genres[a];
    }
  )
  return {items: artists, info: {topGenres: genresSorted.slice(0, 10), mostPopularArtist: mostPopularArtist, leastPopularArtist: leastPopularArtist}};
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
  let albums = {}
  for (let i = 0; i < data.body.items.length; i++) {
    let currentArtist = data.body.items[i].track.artists[0].name;
    let currentYear = new Date(data.body.items[i].track.album.release_date);
    let currentAlbum = currentArtist + "|" + data.body.items[i].track.album.name + "|" + data.body.items[i].track.album.images[1].url;
    tracks.push({id : i, artist: currentArtist, title: data.body.items[i].track.name, art: data.body.items[i].track.album.images[1].url, date: data.body.items[i].played_at});
    artists[currentArtist] = artists[currentArtist] ? artists[currentArtist] + 1 : 1;
    years[currentYear.getFullYear()] = years[currentYear.getFullYear()] ? years[currentYear.getFullYear()] + 1 : 1;
    albums[currentAlbum] = albums[currentAlbum] ? albums[currentAlbum] + 1 : 1;
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
  let albumsSorted = Object.keys(albums).sort(
    function(a,b) {
      return albums[b] - albums[a];
    }
  )
  return ({tracks: tracks, topArtists: artistsSorted.slice(0, 3), topYears: yearsSorted.slice(0, 3), topAlbums: albumsSorted.slice(0, 3)})
}

function createFeedResponse(recentTracks, currentTrack) {
  return { recentTracks: createRecentTracksResponse(recentTracks), currentTrack: createCurrentTrackResponse(currentTrack) }
}
