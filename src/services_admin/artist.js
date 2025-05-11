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

// Hàm lấy nghệ sĩ theo ID
export const fetchArtistById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Fetch artist by ID ${id} error:`, error);
    throw error;
  }
};

// Hàm thêm artist
export const addArtist = async (artistData) => {
  try {
    const response = await axios.post(`${API_URL}add/`, artistData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
    const response = await axios.put(`${API_URL}${id}/update/`, artistData, {
      headers: {
        "Content-Type": "multipart/form-data", // Hỗ trợ upload file
      },
    });
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

// Hàm đếm số lượng nghệ sĩ
export const countArtists = async () => {
  try {
    const response = await axios.get(`${API_URL}count/`);
    return response.data;
  } catch (error) {
    console.error('Count artists error:', error);
    throw error;
  }
};

// Hàm tìm kiếm nghệ sĩ theo tên (có phân trang)
export const searchArtists = async (name, page = 1, pageSize = 6) => {
  try {
    const response = await axios.get(`${API_URL}search/`, {
      params: {
        name,
        page,
        page_size: pageSize,
      },
    });
    return response.data; // trả về: { count, next, previous, results }
  } catch (error) {
    console.error('Search artists error:', error);
    throw error;
  }
};
