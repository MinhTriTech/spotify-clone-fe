import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/manager/playlists/";

export const fetchPlaylists = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Fetch playlists error:", error);
        throw error;
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
