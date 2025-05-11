import axios from '../axios';

export const getMyLikeSongs = async () => {
  return await axios.get('api/music/songs/favorites/');
};

export const getMyPlaylists = async () => {
  return await axios.get('api/music/playlists/user/');
};

const getFollowedArtists = async () => {
  return await axios.get(`api/music/artists/followed/`);
};

const checkLiked = async (id) => {
  return await axios.get(`api/music/songs/${id}/is-favorite/`);
};


export const libraryService = {
  getMyLikeSongs,
  getMyPlaylists,
  getFollowedArtists,
  checkLiked,
};
