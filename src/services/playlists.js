import axios from '../axios';

export const fetchTopTracks = async () => {
  return await axios.get('api/music/songs/');
};

const fecthPlaylists = async () => {
  return await axios.get('api/music/playlistsSuggested');
};

export const fecthArtists = async () => {
  return await axios.get('api/music/artists/suggested');
};

const getSongsOfLikedSong = async () => {
  return await axios.get(`api/music/songs/favorites`);
};

const getSongsOfPlaylist = async (id) => {
  return await axios.get(`api/music/playlists/${id}/songs`);
};

const createPlaylist = async (title, image) => {
  const res = await axios.post('api/music/playlists/create/', {
    title: title,
    image: image,
  });
  return res.data.playlist;
};

const deletePlaylist = async (id) => {
  return await axios.delete(`api/music/playlists/${id}/delete/`);
};

const getPlaylist = async (id) => {
  return await axios.get(`api/music/playlists/${id}/`);
};

const addPlaylistItems = async (playlist_id, song_id) => {
  return await axios.post('/api/music/playlists/add-song/', {
    playlist_id,
    song_id,
  });  
};

const removePlaylistItems = async (playlist_id, song_id) => {
  return await axios.delete('/api/music/playlists/remove-song/', {
    data: {
      playlist_id,
      song_id,
    },
  });
};

const changePlaylistDetails = async (playlist_id, data) => {
  const formData = new FormData();

  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  return await axios.put(`/api/music/playlists/${playlist_id}/update/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const playlistService = {
  fetchTopTracks,
  fecthPlaylists,
  fecthArtists,
  
  getSongsOfLikedSong,
  getSongsOfPlaylist,

  createPlaylist,
  deletePlaylist,
  getPlaylist,
  addPlaylistItems,
  removePlaylistItems,
  changePlaylistDetails
};
