import axios from '../axios';

const initialState = {
  artist: null,
  tracks: [],
  album: null,
  otherAlbums: [],
  loading: true,
  following: false,
  order: 'ALL',
  view: 'LIST',
};

export const fetchTopTracks = async (params) => {
  return await axios.get('/me/top/tracks', { params });
};

export const fetchTopArtists = async (params) => {
  return await axios.get('/me/top/artists', { params });
};

export const fetchFollowedArtists = async (params = {}) => {
  return await axios.get('/me/following', { params: { ...params, type: 'artist' } });
};

export const fetchQueue = async () => {
  return await axios.get('/me/player/queue');
};

export const checkSavedTracks = async (ids) => {
  return await axios.get('/me/tracks/contains', { params: { ids: ids.join(',') } });
};

export const saveTracks = async (ids) => {
  return await axios.put('/me/tracks', { ids });
};

export const deleteTracks = async (ids) => {
  return await axios.delete('/me/tracks', { data: { ids } });
};

export const checkFollowedPlaylist = async (playlistId) => {
  return await axios.get(`/playlists/${playlistId}/followers/contains`).catch(() => {
    return { data: false };
  });
};

export const checkFollowingArtists = async (ids) => {
  return await axios.get('/me/following/contains', { params: { type: 'artist', ids: ids.join(',') } });
};

export const checkFollowingUsers = async (ids) => {
  return await axios.get('/me/following/contains', { params: { type: 'user', ids: ids.join(',') } });
};

export const getUser = async (id) => {
  return await axios.get(`/users/${id}`);
};

export const unfollowPlaylist = async (playlistId) => {
  return await axios.delete(`/playlists/${playlistId}/followers`);
};

export const followPlaylist = async (playlistId) => {
  return await axios.put(`/playlists/${playlistId}/followers`);
};

export const followArtists = async (ids) => {
  return await axios.put('/me/following', { type: 'artist', ids });
};

export const unfollowArtists = async (ids) => {
  return await axios.delete('/me/following', { params: { type: 'artist', ids: ids.join(',') } });
};

export const followUsers = async (ids) => {
  return await axios.put('/me/following', { type: 'user', ids });
};

export const unfollowUsers = async (ids) => {
  return await axios.delete('/me/following', { params: { type: 'user', ids: ids.join(',') } });
};

export const getSavedTracks = async (params = {}) => {
  return await axios.get('/me/tracks', { params });
};

export const userService = {
  getUser,
  saveTracks,
  fetchQueue,
  deleteTracks,
  getSavedTracks,
  fetchTopArtists,
  fetchTopTracks,
  checkSavedTracks,
  followPlaylist,
  checkFollowingUsers,
  followUsers,
  unfollowUsers,
  fetchFollowedArtists,
  checkFollowedPlaylist,
  unfollowPlaylist,
  checkFollowingArtists,
  followArtists,
  unfollowArtists,
};
