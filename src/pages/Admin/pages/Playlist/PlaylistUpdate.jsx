import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { updatePlaylist } from "../../../../services_admin/playlist";
import { ButtonAdmin } from "../../components";
import { deletePlaylistSong } from "../../../../services_admin/playlistSong";
const PlaylistUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        image: null,
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                setLoading(true);

                // Lấy thông tin playlist
                const playlistResponse = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/playlists/${id}/`);
                setPlaylist(playlistResponse.data);
                setFormData({
                    title: playlistResponse.data.title,
                    image: null,
                });
                setPreviewImage(playlistResponse.data.image);

                // Lấy danh sách bài hát trong playlist
                const songsResponse = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/playlist_songs/`, {
                    params: { playlist_id: id },
                });

                // Nếu có dữ liệu bài hát, lấy thông tin chi tiết của từng bài hát
                if (Array.isArray(songsResponse.data) && songsResponse.data.length > 0) {
                    const songDetails = await Promise.all(
                        songsResponse.data.map(async (playlistSong) => {
                            try {
                                const songResponse = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/songs/${playlistSong.song_id}/`);
                                return {
                                    ...playlistSong,
                                    songDetails: songResponse.data,
                                };
                            } catch (error) {
                                console.error(`Lỗi khi lấy thông tin bài hát ID ${playlistSong.song_id}:`, error);
                                return {
                                    ...playlistSong,
                                    songDetails: { title: "Không thể tải thông tin" },
                                };
                            }
                        })
                    );
                    setPlaylistSongs(songDetails);
                    // Set selected songs based on existing playlist songs
                    setSelectedSongs(songDetails.map((song) => song.song_id));
                }

                // Lấy tất cả bài hát để hiển thị trong dropdown
                const allSongsResponse = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/songs/`);
                setAllSongs(allSongsResponse.data);

                setLoading(false);
            } catch (error) {
                console.error("Lỗi khi tải thông tin playlist:", error);
                setError("Không thể tải thông tin playlist. " + (error.response?.data?.error || error.message));
                setLoading(false);
            }
        };

        if (id) {
            fetchPlaylistDetails();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                image: file,
            }));

            // Create a preview URL for the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSongSelection = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setSelectedSongs(selectedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("title", formData.title);
            if (formData.image) {
                formDataToSend.append("image", formData.image);
            }

            await updatePlaylist(id, formDataToSend);

            await deletePlaylistSong(id);

            if (selectedSongs.length > 0) {
                for (const songId of selectedSongs) {
                    await axios.post(`${import.meta.env.VITE_API_URL}api/manager/playlist_songs/`, {
                        playlist_id: id,
                        song_id: songId,
                    });
                }
            }

            alert("Cập nhật danh sách phát thành công!");
            navigate(`/admin/playlist/${id}`);
        } catch (error) {
            console.error("Lỗi khi cập nhật playlist:", error);
            setError("Không thể cập nhật playlist. " + (error.response?.data?.error || error.message));
        }
    };

    if (loading) {
        return (
            <div className="text-white w-full h-screen flex items-center justify-center bg-black">
                <p>Đang tải thông tin playlist...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 w-full h-screen flex items-center justify-center bg-black">
                <p>{error}</p>
            </div>
        );
    }

    if (!playlist) {
        return (
            <div className="text-white w-full h-screen flex items-center justify-center bg-black">
                <p>Không tìm thấy playlist</p>
            </div>
        );
    }

    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to={`/admin/playlist/${id}/detail`} className="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại chi tiết danh sách phát
                    </Link>
                </div>
                <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <ButtonAdmin onClick={handleSubmit} icon={faSave} title="Lưu thay đổi" color="spotifyGreen" textHover="white" />
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Cập nhật danh sách phát</h1>
                <div className="w-full h-px bg-spotifyGray"></div>

                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <div className="relative">
                            <img src={previewImage || thumbnail} alt="Ảnh bìa playlist" className="h-56 w-56 object-cover" />
                            <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="absolute top-0 left-0 opacity-0 h-56 w-56 cursor-pointer" />
                            <div className="absolute top-0 left-0 h-56 w-56 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <p className="text-white text-center">Nhấn để thay đổi ảnh</p>
                            </div>
                        </div>
                        <div className="mt-2 text-spotifyGray">
                            <p>Ngày tạo: {new Date(playlist.created_at).toLocaleDateString("vi-VN")}</p>
                        </div>
                    </div>

                    <div className="w-[78%]">
                        <div className="w-full px-6 mb-4">
                            <label htmlFor="title" className="block mb-2">
                                Tên danh sách phát
                            </label>
                            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="bg-black w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:border-spotifyGreen" required />
                        </div>

                        <div className="w-full px-6 mb-4">
                            <label className="block mb-2">Người tạo</label>
                            <div className="bg-black w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm flex items-center cursor-not-allowed">{playlist.created_by_id ? "ID: " + playlist.created_by_id : "Không có thông tin người tạo"}</div>
                            <small className="text-spotifyGray">Thông tin người tạo (không thể thay đổi)</small>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="songs" className="block mb-2">
                                Danh sách bài hát
                            </label>
                            <select id="songs" name="songs" multiple value={selectedSongs} onChange={handleSongSelection} className="bg-black w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:border-spotifyGreen">
                                {allSongs.map((song) => (
                                    <option key={song.song_id} value={song.song_id}>
                                        {song.title}
                                    </option>
                                ))}
                            </select>
                            <small className="text-spotifyGray">Giữ Ctrl để chọn nhiều bài hát</small>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default PlaylistUpdate;
