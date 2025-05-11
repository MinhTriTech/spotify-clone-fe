import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}api/manager/albums/`;

// Hàm lấy tất cả albums
export const fetchAlbums = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Fetch albums error:', error);
        throw error;
    }
};

// Hàm lấy nghệ sĩ theo ID
export const fetchAlbumById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Fetch album by ID ${id} error:`, error);
      throw error;
    }
  };

// Hàm thêm album
export const addAlbum = async (albumData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}api/manager/albums/add/`, albumData, {
            headers: {
                "Content-Type": "multipart/form-data", // Vì có thể có ảnh
            },
        });
        return response.data;
    } catch (error) {
        console.error("Add album error:", error);
        throw error;
    }
};

// Hàm cập nhật album
export const updateAlbum = async (id, albumData) => {
    try {
        const response = await axios.put(`${API_URL}${id}/update/`, albumData, {
            headers: {
                "Content-Type": "multipart/form-data", // Để hỗ trợ upload file nếu có
            },
        });
        return response.data;
    } catch (error) {
        console.error('Update album error:', error);
        throw error;
    }
};

// Hàm xóa album
export const deleteAlbum = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}/delete/`);
        return response.data;
    } catch (error) {
        console.error('Delete album error:', error);
        throw error;
    }
};



// Hàm tìm kiếm albums theo title (có phân trang)
export const searchAlbums = async (title, page = 1, pageSize = 6) => {
    try {
        const response = await axios.get(`${API_URL}search/`, {
            params: {
                title,
                page,
                page_size: pageSize,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Search albums error:`, error);
        throw error;
    }
};