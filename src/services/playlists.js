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

const createPlaylist = async (title, image) => {
  const res = await axios.post('api/music/playlists/create/', {
    title: title,
    image: image,
  });
  return res.data.playlist;
};

export const playlistService = {
  // Trang home
  fetchTopTracks,
  getFeaturedPlaylists,
  getSongsOfFeaturedPlaylists,

  // Navbar bên trái
  createPlaylist,
};
