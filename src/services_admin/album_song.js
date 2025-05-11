import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}api/manager/album_songs/`;

// Lấy tất cả liên kết album-song
export const fetchAlbumSongs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Fetch album songs error:', error);
    throw error;
  }
};

// Lấy các bài hát KHÔNG nằm trong album nhưng thuộc artist chủ album đó
export const fetchSongsNotInAlbumByArtist = async (albumId) => {
  try {
    const response = await axios.get(`${API_URL}not-in-album-by-artist/?album_id=${albumId}`);
    return response.data;
  } catch (error) {
    console.error(`Fetch songs not in album ${albumId} by album's artist error:`, error);
    throw error;
  }
};

// Lấy liên kết album-song theo album_id
export const fetchAlbumSongsByAlbum = async (albumId) => {
  try {
    const response = await axios.get(`${API_URL}?album_id=${albumId}`);
    return response.data;
  } catch (error) {
    console.error(`Fetch album songs for album ${albumId} error:`, error);
    throw error;
  }
};

// Thêm bài hát vào album
export const addAlbumSong = async (albumSongData) => {
  try {
    const response = await axios.post(`${API_URL}add/`, albumSongData);
    return response.data;
  } catch (error) {
    console.error('Add album song error:', error);
    throw error;
  }
};

// Xóa liên kết album-song
export const deleteAlbumSong = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/delete/`);
    return response.data;
  } catch (error) {
    console.error('Delete album song error:', error);
    throw error;
  }
};