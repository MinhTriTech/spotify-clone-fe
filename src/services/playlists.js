import axios from '../axios';

export const fetchTopTracks = async () => {
  return await axios.get('api/music/songs/');
};

const getFeaturedPlaylists = async () => {
  return await axios.get('api/music/playlistsSuggested/');
};

export const playlistService = {
  fetchTopTracks,
  getFeaturedPlaylists,
};
