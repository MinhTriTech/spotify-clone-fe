import axios from '../axios';

export const fetchArtist = async (id) => {
  return await axios.get(`api/music/artists/${id}/`).then((res) => res.data);
};

export const artistService = {
  fetchArtist,
};
