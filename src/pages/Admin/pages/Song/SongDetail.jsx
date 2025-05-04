import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo, ButtonAdmin } from "../../components";
import { useEffect, useState } from "react";
import { deleteSong, fetchSongById } from "../../../../services_admin/song";
import { fetchSongs } from "../../../../services_admin/song";
import axios from "axios";
import { fetchAlbums } from "../../../../services_admin/album";
import { deleteAlbumSong } from "../../../../services_admin/albumSong";
import { set } from "lodash";

const SongDetail = () => {
    const { id } = useParams();
    const [song, setSong] = useState(null);
    const [mainArtist, setMainArtist] = useState("");
    const [featuredArtists, setFeaturedArtists] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API lấy danh sách nghệ sĩ
        const fetchArtists = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/manager/artists/");
                const data = await response.json();
                setArtists(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách nghệ sĩ:", error);
            }
        };

        // Gọi API lấy danh sách album
        const fetchAllAlbums = async () => {
            try {
                const data = await fetchAlbums();
                setAlbums(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách album:", error);
            }
        };

        // Gọi API lấy thông tin bài hát
        const loadSong = async () => {
            try {
                const data = await fetchSongById(id);
                setSong(data);
                setSelectedAlbum(data.album ? String(data.album.id) : "");

                // Lấy ca sĩ chính và ca sĩ phụ
                const artistSongsResponse = await axios.get(`http://127.0.0.1:8000/api/manager/artist_songs/?song_id=${id}`);
                const artistSongs = artistSongsResponse.data;
                console.log("ArtistSongs data:", artistSongs);

                // Kiểm tra xem có bản ghi nào khớp với song_id không
                const validArtistSongs = artistSongs.filter((as) => String(as.song_id) === String(id));
                if (validArtistSongs.length > 0) {
                    const main = validArtistSongs.find((as) => as.main_artist);
                    const featured = validArtistSongs.filter((as) => !as.main_artist);
                    setMainArtist(main ? String(main.artist_id) : "");
                    setFeaturedArtists(featured.map((as) => String(as.artist_id)));
                } else {
                    // Nếu không có bản ghi hợp lệ, để trống
                    setMainArtist("");
                    setFeaturedArtists([]);
                    console.log("Không tìm thấy ArtistSongs hợp lệ cho song_id:", id);
                }
            } catch (error) {
                console.error("UI fetch song by id fail!", error);
                throw error;
            }
        };

        fetchArtists();
        fetchAllAlbums();
        loadSong();
    }, [id]);

    const loadSongs = async () => {
        try {
            const data = await fetchSongs();
            // setSongs(data); // Chú ý: setSongs không được định nghĩa, có thể bỏ hoặc sửa
        } catch (error) {
            console.error("Error loading songs:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài hát này? (Thao tác này không thể hoàn tác)");
        if (confirmDelete) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/manager/artist_songs/delete_by_song/?song_id=${id}`);
                await axios.delete(`http://127.0.0.1:8000/api/manager/album_songs/delete_by_song/?song_id=${id}`);
                await deleteSong(id);
                alert("Đã xóa bài hát thành công!");
                await loadSongs();
                navigate("/admin/song");
            } catch (err) {
                console.error(err);
                alert("Xóa bài hát thất bại!");
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/admin/song/${id}/update`);
    };

    if (!song) return <div className="text-white">Đang tải dữ liệu...</div>;

    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/song" className="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách bài hát
                    </Link>
                </div>
                <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <ButtonAdmin onClick={() => handleDelete(song.song_id)} icon={faXmark} title="Xóa" color="red-500" textHover="white" />
                    <ButtonAdmin onClick={() => handleUpdate(song.song_id)} icon={faPenToSquare} title="Cập nhật" color="spotifyGreen" textHover="white" />
                </div>
            </div>

            <div className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
                <h1 className="font-bold text-xl">Thông tin bài hát</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={song.image || thumbnail} alt="ảnh đại diện" className="h-56 w-56" />
                        <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" disabled className="absolute top-0 left-0 w-full h-full opacity-0 cursor-not-allowed" />
                            <span className="transition-all duration-300 text-spotifyGray pointer-events-none">Ảnh bìa (chỉ xem)</span>
                        </div>
                    </div>
                    <div className="w-[78%]">
                        <InputCombo type="text" placeholder="Tên bài hát" label="Tên bài hát" name="title" value={song.title || ""} readOnly />

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="file_path">Đường dẫn bài hát</label>
                            <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-start transition-all duration-300">
                                <input type="text" value={song.file_path || ""} readOnly className="bg-black w-full h-full text-white cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="video_url">Đường dẫn video</label>
                            <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-start transition-all duration-300">
                                <input type="text" value={song.video_url || ""} readOnly className="bg-black w-full h-full text-white cursor-not-allowed" />
                            </div>
                        </div>

                        <InputCombo type="text" placeholder="Loại nội dung bài hát" label="Loại nội dung bài hát" name="content_type" value={song.content_type || ""} readOnly />

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="album">Thuộc Album</label>
                            <select name="album" value={selectedAlbum} disabled className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm cursor-not-allowed">
                                <option value="" disabled>
                                    - Chọn album -
                                </option>
                                {albums.map((album) => (
                                    <option key={album.id} value={album.id}>
                                        {album.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="main_artist">
                                Ca sĩ chính <span className="text-red-500">*</span>
                            </label>
                            <select name="main_artist" value={mainArtist} disabled className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm cursor-not-allowed">
                                <option value="">- Chọn ca sĩ chính -</option>
                                {artists.map((artist) => (
                                    <option key={artist.artist_id} value={artist.artist_id}>
                                        {artist.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full px-6 mb-2">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SongDetail;
