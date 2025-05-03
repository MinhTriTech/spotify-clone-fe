import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { deletePlaylist, fetchPlaylists } from "../../../../services_admin/playlist";
import { ButtonAdmin } from "../../components";
import { deletePlaylistSong } from "../../../../services_admin/playlistSong";
const PlaylistDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [creator, setCreator] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const loadPlaylists = async () => {
        const response = await fetchPlaylists;
        return response.data;
    };

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                setLoading(true);

                // Lấy thông tin playlist
                const playlistResponse = await axios.get(`http://127.0.0.1:8000/api/manager/playlists/${id}/`);
                setPlaylist(playlistResponse.data);

                // Lấy người tạo playlist
                if (playlistResponse.data.created_by_id) {
                    const userResponse = await axios.get(`http://127.0.0.1:8000/api/manager/users/${playlistResponse.data.created_by_id}/`);
                    setCreator(userResponse.data);
                }

                // Lấy danh sách bài hát trong playlist
                const songsResponse = await axios.get(`http://127.0.0.1:8000/api/manager/playlist_songs/`, {
                    params: { playlist_id: id },
                });

                // Nếu có dữ liệu bài hát, lấy thông tin chi tiết của từng bài hát
                if (Array.isArray(songsResponse.data) && songsResponse.data.length > 0) {
                    const songDetails = await Promise.all(
                        songsResponse.data.map(async (playlistSong) => {
                            try {
                                const songResponse = await axios.get(`http://127.0.0.1:8000/api/manager/songs/${playlistSong.song_id}/`);
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
                }

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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa danh sách phát này? (Thao tác này không thể hoàn tác)");
        if (confirmDelete) {
            try {
                await deletePlaylist(id);
                await deletePlaylistSong(id);
                alert("Đã xóa danh sách phát thành công!");
                await loadPlaylists();
                navigate("/admin/playlist");
            } catch (err) {
                console.error(err);
                alert("Xóa danh sách phát thất bại!");
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/admin/playlist/${id}/update`);
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
                    <ButtonAdmin onClick={() => handleDelete(playlist.playlist_id)} icon={faXmark} title="Xóa" color="red-500" textHover="white" />
                    <ButtonAdmin onClick={() => handleUpdate(playlist.playlist_id)} icon={faPenToSquare} title="Cập nhật" color="spotifyGreen" textHover="white" />
                </div>
            </div>

            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Thông tin danh sách phát</h1>
                <div className="w-full h-px bg-spotifyGray"></div>

                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={playlist.image || thumbnail} alt="Ảnh bìa playlist" className="h-56 w-56 object-cover" />
                        <div className="mt-2 text-spotifyGray">
                            <p>Ngày tạo: {new Date(playlist.created_at).toLocaleDateString("vi-VN")}</p>
                        </div>
                    </div>

                    <div className="w-[78%]">
                        <div className="w-full px-6 mb-4">
                            <label className="block mb-2">Tên danh sách phát</label>
                            <div className="bg-black w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm flex items-center">{playlist.title}</div>
                        </div>

                        <div className="w-full px-6 mb-4">
                            <label className="block mb-2">Người tạo</label>
                            <div className="bg-black w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm flex items-center">{creator ? creator.username : "Không có thông tin người tạo"}</div>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label className="block mb-2">Danh sách bài hát</label>
                            <select name="playlist_id" multiple value={playlistSongs} disabled className="bg-black mt-2 w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm cursor-not-allowed">
                                {playlistSongs
                                    .filter((pl) => String(pl.playlist_id) === String(playlist.playlist_id))
                                    .map((pl) => (
                                        <option key={pl.song_id} value={pl.song_id}>
                                            {pl.songDetails.title}
                                        </option>
                                    ))}
                            </select>
                            <small className="text-spotifyGray">Danh sách bài hát (chỉ xem)</small>
                        </div>

                        {/* <div className="w-full px-6 mb-2">
                            <label htmlFor="featured_artists">Ca sĩ phụ</label>
                            <select name="featured_artists" multiple value={featuredArtists} disabled className="bg-black mt-2 w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm cursor-not-allowed">
                                {artists
                                    .filter((artist) => String(artist.artist_id) !== String(mainArtist))
                                    .map((artist) => (
                                        <option key={artist.artist_id} value={artist.artist_id}>
                                            {artist.name}
                                        </option>
                                    ))}
                            </select>
                            <small className="text-spotifyGray">Danh sách ca sĩ phụ (chỉ xem)</small>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaylistDetail;
