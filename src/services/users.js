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

export const saveTracks = async (id) => {
  return await axios.post('api/music/songs/favorites/add/', { song_id: id });
};

export const deleteTracks = async (id) => {
  return await axios.delete('/api/music/songs/favorites/remove/', {
    data: { song_id: id },
  });
};

export const followArtists = async (id) => {
  return await axios.post('api/music/artists/follow/', { artist_id: id });
};

export const unfollowArtists = async (id) => {
  return await axios.delete('api/music/artists/unfollow/', {
    data: { artist_id: id }
  });
};

export const getSavedTracks = async () => {
  return await axios.get('api/music/songs/favorites');
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
  return await axios.get(`api/music/users/${id}`);
};

export const unfollowPlaylist = async (playlistId) => {
  return await axios.delete(`/playlists/${playlistId}/followers`);
};

export const followPlaylist = async (playlistId) => {
  return await axios.put(`/playlists/${playlistId}/followers`);
};

export const followUsers = async (ids) => {
  return await axios.put('/me/following', { type: 'user', ids });
};

export const unfollowUsers = async (ids) => {
  return await axios.delete('/me/following', { params: { type: 'user', ids: ids.join(',') } });
};

export const userService = {
  getUser,
  saveTracks,
  fetchQueue,
  deleteTracks,
  getSavedTracks,
  fetchTopArtists,
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
