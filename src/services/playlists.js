import axios from '../axios';

export const fetchTopTracks = async () => {
  return await axios.get('api/music/songs/');
};

const getFeaturedPlaylists = async () => {
  return await axios.get('api/music/playlistsSuggested');
};

const getSongsOfFeaturedPlaylists = async (id) => {
  return await axios.get(`api/music/playlists/${id}/songs`);
};

const getSongsOfLikedSongs = async () => {
  return await axios.get(`api/music/songs/favorites`);
};

const createPlaylist = async (title, image) => {
  const res = await axios.post('api/music/playlists/create/', {
    title: title,
    image: image,
  });
  return res.data.playlist;
};

const getPlaylist = async (id) => {
  return await axios.get(`api/music/playlists/${id}/`);
};

const addPlaylistItems = async (playlist_id, song_id) => {
  return await axios.post('/api/music/playlists/add-song/', {
    playlist_id,
    song_id,
  });  
};

const removePlaylistItems = async (playlist_id, song_id) => {
  return await axios.delete('/api/music/playlists/remove-song/', {
    data: {
      playlist_id,
      song_id,
    },
  });
};

export const playlistService = {
  fetchTopTracks,
  getFeaturedPlaylists,
  getSongsOfFeaturedPlaylists,
  getSongsOfLikedSongs,

  createPlaylist,
  getPlaylist,
  addPlaylistItems,
  removePlaylistItems,
};
