import axios from '../axios';

/**
 * @description Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand, and Australia markets.
 */
export const querySearch = (params) =>
  axios.get('/search', { params });
