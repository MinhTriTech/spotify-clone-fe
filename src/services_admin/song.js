import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/manager/songs/";

export const fetchSongs = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}search`, {
            params, // Truyền tham số tìm kiếm và trang
        });
        if (!response.data) {
            throw new Error("No data returned from API");
        }
        return {
            results: response.data.results || [],
            count: response.data.count || 0, // Tổng số bài hát
        };
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch songs");
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

// Hàm thêm bài hát
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

// Hàm cập nhật bài hát
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

// Hàm xóa bài hát
export const deleteSong = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}/delete/`);
        return response.data;
    } catch (error) {
        console.error("Delete song error:", error);
        throw error;
    }
};
