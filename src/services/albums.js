import axios from '../axios';

const getAlbum = async (id) => {
  return await axios.get(`api/music/albums/${id}`);
};

const getSongsOfAlbum = async (id) => {
  return await axios.get(`api/music/albums/${id}/songs/`);
};


export const albumsService = {
  getAlbum,
  getSongsOfAlbum,
};
