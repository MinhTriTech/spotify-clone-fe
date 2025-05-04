import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/manager/playlists/";

export const fetchPlaylists = async (params = {}) => {
    try {
        const response = await axios.get(`${API_URL}search`, {
            params, // Truyền tham số tìm kiếm và trang
        });
        if (!response.data) {
            throw new Error("No data returned from API");
        }
        return {
            results: response.data.results || [],
            count: response.data.count || 0, // Tổng số danh sách phát
        };
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch playlists");
    }
};

export const fetchPlaylistById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
    } catch (error) {
        console.error("Fetch playlist by id: " + id + "error", error);
        throw error;
    }
};

export const addPlaylist = async (playlistData) => {
    try {
        const response = await axios.post(`${API_URL}add/`, playlistData, {
            headers: {
                "Content-Type": "multipart/form-data", // Phải là multipart để upload file
            },
        });
        return response.data;
    } catch (error) {
        console.error("Add playlist error:", error);
        throw error;
    }
};

export const updatePlaylist = async (id, playlistData) => {
    try {
        const response = await axios.put(`${API_URL}${id}/update/`, playlistData, {
            headers: {
                "Content-Type": "multipart/form-data", // Update cũng cần gửi đúng content-type
            },
        });
        return response.data;
    } catch (error) {
        console.error("Update playlist error:", error);
        throw error;
    }
};

// Hàm xóa bài hát
export const deletePlaylist = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}${id}/delete/`);
        return response.data;
    } catch (error) {
        console.error("Delete playlist error:", error);
        throw error;
    }
};
