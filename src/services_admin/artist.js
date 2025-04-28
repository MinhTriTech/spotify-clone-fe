import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/manager/artists/';

// Hàm lấy tất cả artists
export const fetchArtists = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Fetch artists error:', error);
    throw error;
  }
};

// Hàm thêm artist
export const addArtist = async (artistData) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/manager/artists/add/", artistData, {
            headers: {
                "Content-Type": "multipart/form-data", // Đặt Content-Type là multipart/form-data
            },
        });
        return response.data;
    } catch (error) {
        console.error("Add artist error:", error);
        throw error;
    }
};

// Hàm cập nhật artist
export const updateArtist = async (id, artistData) => {
  try {
    const response = await axios.put(`${API_URL}${id}/update/`, artistData);
    return response.data;
  } catch (error) {
    console.error('Update artist error:', error);
    throw error;
  }
};

// Hàm xóa artist
export const deleteArtist = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/delete/`);
    return response.data;
  } catch (error) {
    console.error('Delete artist error:', error);
    throw error;
  }
};