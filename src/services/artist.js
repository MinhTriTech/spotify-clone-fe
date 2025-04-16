import axios from '../axios';

/**
 * @description Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
const fetchArtist = (id) => axios.get(`/artists/${id}`);

/**
 * @description Get Spotify catalog information for several artists based on their Spotify IDs.
 */
const fetchArtists = (ids) =>
  axios.get(`/artists`, { params: { ids: ids.join(',') } });

/**
 * @description Get Spotify catalog information about an artist's albums.
 */
const fetchArtistAlbums = (
  id,
  params = {
    /** @description The number of album objects to return. */
    limit: undefined,
    /** @description The index of the first album to return. */
    offset: undefined,
    /** @description A comma-separated list of keywords that will be used to filter the response. */
    include_groups: undefined,
    /** @description The country for which the release date will be formatted. */
    market: undefined,
  }
) => axios.get(`/artists/${id}/albums`, { params });

/**
 * @description Get Spotify catalog information about an artist's top tracks by country.
 */
const fetchArtistTopTracks = (id) =>
  axios.get(`/artists/${id}/top-tracks`);

/**
 * @description Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.
 */
const fetchSimilarArtists = (id) =>
  axios.get(`/artists/${id}/related-artists`);

export const artistService = {
  fetchArtist,
  fetchArtists,
  fetchArtistAlbums,
  fetchArtistTopTracks,
  fetchSimilarArtists,
};
