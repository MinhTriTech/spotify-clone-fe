import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/manager/songs/";

// Lấy tất cả bài hát
export const fetchSongs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Fetch songs error:", error);
        throw error;
    }
};

export const fetchSongById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
    } catch (error) {
        console.error("Fetch song by id: " + id + "error", error);
        throw error;
    }
};

// Lấy bài hát theo ID
export const fetchSongById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Fetch song by ID ${id} error:`, error);
    throw error;
  }
};

// Thêm bài hát
export const addSong = async (songData) => {

    try {
        const response = await axios.post(`${API_URL}add/`, songData, {
            headers: {
                "Content-Type": "multipart/form-data", // Phải là multipart để upload file
            },
        });
        return response.data;
    } catch (error) {
        console.error("Add song error:", error);
        throw error;
    }
};

// Cập nhật bài hát
export const updateSong = async (id, songData) => {

    try {
        const response = await axios.put(`${API_URL}${id}/update/`, songData, {
            headers: {
                "Content-Type": "multipart/form-data", // Update cũng cần gửi đúng content-type
            },
        });
        return response.data;
    } catch (error) {
        console.error("Update song error:", error);
        throw error;
    }

};

// Xóa bài hát
export const deleteSong = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}/delete/`);
        return response.data;
    } catch (error) {
        console.error("Delete song error:", error);
        throw error;
    }
};
