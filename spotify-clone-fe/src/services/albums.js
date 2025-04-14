import axios from '../axios';

const fetchNewRelases = (params = {}) =>
  axios.get('/browse/new-releases', { params });

/**
 * @description Get Spotify catalog information for a single album.
 */
const fetchAlbum = (id) => axios.get(`/albums/${id}`);

/**
 * @description Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 */
const fetchAlbums = (ids) =>
  axios.get('/albums', { params: { ids: ids.join(',') } });

/**
 * @description Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
 */
const fetchAlbumTracks = (id, params = {}) =>
  axios.get(`/albums/${id}/tracks`, { params });

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
  fetchNewRelases,
  fetchSavedAlbums,
  fetchAlbumTracks,
  saveAlbums,
  deleteAlbums,
};
