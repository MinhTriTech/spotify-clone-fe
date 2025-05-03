import axios from '../axios';

export const fetchAlbum = async (id) => {
  return await axios.get(`api/music/playlists/${id}/songs`);
};

const fetchAlbums = (ids) =>
  axios.get('/albums', { params: { ids: ids.join(',') } });

/**
 * @description Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 */
const fetchSavedAlbums = (params = {}) =>
  axios.get('/me/albums', { params });

/**
 * @description Save one or more albums to the current user's 'Your Music' library.
 */
const saveAlbums = (ids) => axios.put('/me/albums', { ids });

/**
 * @description Remove one or more albums from the current user's 'Your Music' library.
 */
const deleteAlbums = (ids) => axios.delete('/me/albums', { data: { ids } });

export const albumsService = {
  fetchAlbum,
  fetchAlbums,
  fetchSavedAlbums,
  saveAlbums,
  deleteAlbums,
};
