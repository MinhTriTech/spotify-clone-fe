import axios from '../axios';

/**
 * @description Get a playlist owned by a Spotify user.
 * @param playlistId The Spotify ID for the playlist.
 */
const getPlaylist = async (playlistId) => {
  return axios.get(`/playlists/${playlistId}`);
};

/**
 * @description Get full details of the items of a playlist owned by a Spotify user.
 */
const getPlaylistItems = async (playlistId, params = { limit: 50 }) => {
  return axios.get(`/playlists/${playlistId}/tracks`, { params });
};

/**
 * @description Get a list of the playlists owned or followed by the current Spotify user.
 */
const getMyPlaylists = async (params = {}) => {
  return axios.get('/me/playlists', { params });
};

/**
 * @description Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
 */
const getFeaturedPlaylists = async (params = {}) => {
  return axios.get('/browse/featured-playlists', { params });
};

/**
 * @description Add one or more items to a user's playlist.
 */
const addPlaylistItems = async (playlistId, uris, snapshot_id) => {
  return axios.post(`/playlists/${playlistId}/tracks`, {
    uris,
    snapshot_id,
  });
};

/**
 * @description Remove one or more items from a user's playlist.
 */
const removePlaylistItems = async (playlistId, uris, snapshot_id) => {
  return axios.delete(`/playlists/${playlistId}/tracks`, {
    data: {
      tracks: uris.map((uri) => ({ uri })),
      snapshot_id,
    },
  });
};

/**
 * @description Either reorder or replace items in a playlist depending on the request's parameters. 
 */
const reorderPlaylistItems = async (
  playlistId,
  uris,
  rangeStart,
  insertBefore,
  rangeLength,
  snapshotId
) => {
  return axios.put(
    `/playlists/${playlistId}/tracks`,
    {
      range_start: rangeStart,
      insert_before: insertBefore,
      range_length: rangeLength,
      snapshot_id: snapshotId,
    },
    { params: { uris } }
  );
};

/**
 * @description Change a playlist's name and public/private state.
 */
const changePlaylistDetails = async (playlistId, data) => {
  return axios.put(`/playlists/${playlistId}`, data);
};

/**
 * @description Replace the image used to represent a specific playlist.
 */
const changePlaylistImage = async (playlistId, image, content) => {
  return axios.put(`/playlists/${playlistId}/images`, image, {
    headers: { 'Content-Type': content },
  });
};

/**
 * @description Create a playlist for a Spotify user.
 */
const createPlaylist = async (userId, data) => {
  return axios.post(`/users/${userId}/playlists`, data);
};

/**
 * @description Recommendations are generated based on the available information for a given seed entity.
 */
const getRecommendations = async (params) => {
  return axios.get('/recommendations', { params });
};

/**
 * @description Get a list of the playlists owned or followed by a Spotify user.
 */
const getPlaylists = async (userId, params) => {
  return axios.get(`/users/${userId}/playlists`, { params });
};

export const playlistService = {
  getPlaylist,
  getPlaylists,
  getMyPlaylists,
  createPlaylist,
  getPlaylistItems,
  addPlaylistItems,
  getRecommendations,
  changePlaylistImage,
  removePlaylistItems,
  getFeaturedPlaylists,
  reorderPlaylistItems,
  changePlaylistDetails,
};
