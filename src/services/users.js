import axios from '../axios';

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

export const getUser = async (id) => {
  return await axios.get(`api/music/users/${id}`);
};

export const unfollowPlaylist = async (playlistId) => {
  return await axios.delete(`/playlists/${playlistId}/followers`);
};

export const followPlaylist = async (playlistId) => {
  return await axios.put(`/playlists/${playlistId}/followers`);
};

export const userService = {
  getUser,
  saveTracks,
  deleteTracks,
  getSavedTracks,
  followPlaylist,
  unfollowPlaylist,
  followArtists,
  unfollowArtists,
};
