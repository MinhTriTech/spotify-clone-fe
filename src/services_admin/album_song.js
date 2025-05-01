import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/manager/albumsongs/';

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