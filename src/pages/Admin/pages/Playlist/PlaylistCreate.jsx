import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo } from "../../components";
import { useEffect, useState } from "react";
import axios from "axios";

const PlaylistCreate = () => {
    const [songs, setSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        image: null,
        created_by_id: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/songs/`);
                console.log("Songs data:", response.data);
                if (Array.isArray(response.data)) {
                    setSongs(response.data);
                } else {
                    console.error("Dữ liệu songs không phải mảng:", response.data);
                    setSongs([]);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách bài hát:", error);
                setError("Không thể tải danh sách bài hát.");
                setSongs([]);
            }
        };

        const loadUsers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/users/`);
                console.log("Users data:", response.data);
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error("Dữ liệu users không phải mảng:", response.data);
                    setUsers([]);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách người dùng:", error);
                setError("Không thể tải danh sách người dùng.");
                setUsers([]);
            }
        };

        loadSongs();
        loadUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.title || !formData.created_by_id) {
            setError("Vui lòng điền tên playlist và chọn người tạo.");
            return;
        }

        if (selectedSongs.length === 0) {
            setError("Vui lòng chọn ít nhất một bài hát cho playlist.");
            return;
        }

        const data = new FormData();
        data.append("title", formData.title);
        if (formData.image) data.append("image", formData.image);
        data.append("created_by_id", formData.created_by_id);

        try {
            // Bước 1: Tạo playlist mới
            const playlistResponse = await axios.post(`${import.meta.env.VITE_API_URL}api/manager/playlists/add/`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Playlist created:", playlistResponse.data);

            // Lấy ID của playlist vừa tạo
            const playlistId = playlistResponse.data.playlist.playlist_id;

            // Bước 2: Thêm bài hát vào playlist
            const addSongsPromises = selectedSongs.map(async (songId) => {
                const playlistSongData = {
                    playlist_id: playlistId,
                    song_id: songId,
                };

                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}api/manager/playlist_songs/add/`, playlistSongData);
                    console.log(`Đã thêm bài hát ID ${songId} vào playlist:`, response.data);
                    return response.data;
                } catch (error) {
                    console.error(`Lỗi khi thêm bài hát ID ${songId} vào playlist:`, error.response?.data || error.message);
                    throw error;
                }
            });

            // Chờ tất cả các request thêm bài hát hoàn thành
            await Promise.all(addSongsPromises);

            setSuccess(`Tạo playlist thành công với ${selectedSongs.length} bài hát!`);
            setFormData({ title: "", image: null, created_by_id: "" });
            setSelectedSongs([]);
        } catch (error) {
            console.error("Lỗi:", error.response?.data || error.message);
            setError("Không thể tạo playlist hoặc thêm bài hát: " + (error.response?.data?.error || error.message));
        }
    };

    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/playlist" className="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách danh sách phát
                    </Link>
                </div>
                <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <button type="submit" form="pl-form-create" className="w-[11%] 2xl:w-[7%] px-4 py-2 ml-4 bg-black border border-spotifyGreen text-spotifyGreen font-gilroy rounded-sm cursor-pointer hover:bg-spotifyGreen hover:text-white text-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Lưu
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} id="pl-form-create" className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Thông tin danh sách phát</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                {error && <div className="w-full text-red-500">{error}</div>}
                {success && <div className="w-full text-green-500">{success}</div>}
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={formData.image ? URL.createObjectURL(formData.image) : thumbnail} alt="ảnh đại diện" className="h-56 w-56" />
                        <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" name="image" onChange={handleInputChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                            <span className="transition-all duration-300 text-spotifyGray group-hover:text-white pointer-events-none">Chọn ảnh bìa</span>
                        </div>
                    </div>

                    <div className="w-[78%]">
                        <InputCombo type="text" placeholder="Nhập tên danh sách phát" label="Tên danh sách phát" name="title" value={formData.title} onChange={handleInputChange} required />
                        <div className="w-full px-6 mb-2">
                            <label htmlFor="created_by_id">Người tạo</label>
                            <select name="created_by_id" value={formData.created_by_id} onChange={handleInputChange} className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="">- Chọn người tạo -</option>
                                {Array.isArray(users) && users.length > 0 ? (
                                    users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.username}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        Không có người dùng
                                    </option>
                                )}
                            </select>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="song_id">Bài hát</label>
                            <select
                                multiple
                                className="bg-black mt-2 w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
                                    setSelectedSongs(selected);
                                }}
                                value={selectedSongs}
                            >
                                {Array.isArray(songs) && songs.length > 0 ? (
                                    songs.map((song) => (
                                        <option key={song.song_id} value={song.song_id}>
                                            {song.title}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        Không có bài hát nào
                                    </option>
                                )}
                            </select>
                            <small className="text-spotifyGray">Giữ phím Ctrl để chọn nhiều bài hát</small>
                            <div className="mt-2">
                                <p>Đã chọn {selectedSongs.length} bài hát</p>
                                {selectedSongs.length > 0 && (
                                    <div className="mt-1 text-spotifyGray">
                                        Bài hát đã chọn:{" "}
                                        {selectedSongs
                                            .map((id) => {
                                                const song = songs.find((s) => s.song_id === id);
                                                return song ? song.title : id;
                                            })
                                            .join(", ")}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default PlaylistCreate;
