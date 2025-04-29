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


export const playlistService = {
  fetchTopTracks,
  getFeaturedPlaylists,
  getSongsOfFeaturedPlaylists,
};
