import axios from '../axios';

/**
 * @description Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
const fetchCategories = (params = {}) =>
  axios.get('/browse/categories', { params });

/**
 * @description Get a list of Spotify playlists tagged with a particular category.
 */
const fetchCategoryPlaylists = (categoryId, params = {}) =>
  axios.get(`/browse/categories/${categoryId}/playlists`, { params });

/**
 * @description Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
const fetchCategory = (categoryId) =>
  axios.get(`/browse/categories/${categoryId}`);

export const categoriesService = {
  fetchCategories,
  fetchCategoryPlaylists,
  fetchCategory,
};
