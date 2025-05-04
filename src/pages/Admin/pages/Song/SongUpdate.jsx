import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo } from "../../components";
import { useState, useEffect } from "react";
import { fetchAlbums } from "../../../../services_admin/album";
import axios from "axios";

const SongUpdate = () => {
    const { id } = useParams(); // Lấy song_id từ URL
    const [mainArtist, setMainArtist] = useState("");
    const [featuredArtists, setFeaturedArtists] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        image: null,
        file_path: null,
        video_url: null,
        content_type: "",
    });
    const [existingImage, setExistingImage] = useState(""); // Lưu URL ảnh hiện tại
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Gọi API lấy danh sách nghệ sĩ
        const fetchArtists = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/manager/artists/");
                const data = await response.json();
                console.log("Artists data:", data);
                setArtists(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách nghệ sĩ:", error);
                setError("Không thể tải danh sách nghệ sĩ.");
            }
        };

        // Gọi API lấy danh sách album
        const fetchAllAlbums = async () => {
            try {
                const data = await fetchAlbums();
                console.log("Albums data:", data);
                setAlbums(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách album:", error);
                setError("Không thể tải danh sách album.");
            }
        };

        // Gọi API lấy thông tin bài hát hiện tại
        const fetchSong = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/manager/songs/${id}/detail/`);
                const song = response.data;
                console.log("Song data:", song);

                // Điền dữ liệu bài hát vào form
                setFormData({
                    title: song.title || "",
                    image: null, // File mới sẽ được chọn lại, không lưu file cũ
                    file_path: null,
                    video_url: null,
                    content_type: song.content_type || "",
                });
                setSelectedAlbum(song.album ? String(song.album.id) : "");
                setExistingImage(song.image || thumbnail); // Lưu URL ảnh hiện tại

                // Lấy ca sĩ chính và ca sĩ phụ
                const artistSongsResponse = await axios.get(`http://127.0.0.1:8000/api/manager/artist_songs/?song_id=${id}`);
                const artistSongs = artistSongsResponse.data;
                console.log("ArtistSongs data:", artistSongs);

                const main = artistSongs.find((as) => as.main_artist);
                const featured = artistSongs.filter((as) => !as.main_artist);

                setMainArtist(main ? String(main.artist_id) : "");
                setFeaturedArtists(featured.map((as) => String(as.artist_id)));
            } catch (error) {
                console.error("Lỗi khi tải thông tin bài hát:", error);
                setError("Không thể tải thông tin bài hát.");
            }
        };

        fetchArtists();
        fetchAllAlbums();
        fetchSong();
    }, [id]);

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

        // Kiểm tra dữ liệu đầu vào
        if (!mainArtist) {
            setError("Vui lòng chọn ca sĩ chính");
            return;
        }
        if (!formData.title || !formData.content_type) {
            setError("Vui lòng điền đầy đủ thông tin bắt buộc");
            return;
        }

        // Tạo FormData để gửi file
        const data = new FormData();
        data.append("title", formData.title);
        if (formData.image) data.append("image", formData.image);
        if (formData.file_path) data.append("file_path", formData.file_path);
        if (formData.video_url) data.append("video_url", formData.video_url);
        data.append("content_type", formData.content_type);
        if (selectedAlbum) {
            const albumId = Number(selectedAlbum);
            if (!isNaN(albumId) && albumId > 0) {
                data.append("album", albumId);
            }
        }

        try {
            // Gửi yêu cầu cập nhật bài hát
            console.log("Đang cập nhật bài hát...");
            const songResponse = await axios.put(`http://127.0.0.1:8000/api/manager/songs/${id}/update/`, data, { headers: { "Content-Type": "multipart/form-data" } });
            console.log("Bài hát đã được cập nhật:", songResponse.data);

            // Lấy danh sách liên kết nghệ sĩ hiện tại
            const artistSongsResponse = await axios.get(`http://127.0.0.1:8000/api/manager/artist_songs/?song_id=${id}`);
            const currentArtistSongs = artistSongsResponse.data;
            const currentArtistIds = currentArtistSongs.map((as) => String(as.artist_id));

            // Danh sách nghệ sĩ mới (ca sĩ chính + ca sĩ phụ)
            const newArtistIds = [mainArtist, ...featuredArtists].filter((id) => id);

            // Xử lý ca sĩ chính
            const mainArtistData = {
                artist_id: Number(mainArtist),
                song_id: Number(id),
                main_artist: true,
            };
            console.log("Dữ liệu gửi cho ca sĩ chính:", mainArtistData);

            // Tìm ca sĩ chính hiện tại (nếu có)
            const oldMainArtist = currentArtistSongs.find((as) => as.main_artist);

            if (oldMainArtist) {
                if (String(oldMainArtist.artist_id) === mainArtist) {
                    // Nếu ca sĩ chính không thay đổi, chỉ cập nhật thông tin
                    await axios.put(`http://127.0.0.1:8000/api/manager/artist_songs/${oldMainArtist.id}/update/`, mainArtistData, { headers: { "Content-Type": "application/json" } });
                    console.log("Đã cập nhật ca sĩ chính:", oldMainArtist.id);
                } else {
                    // Nếu đổi ca sĩ chính, xóa ca sĩ chính cũ
                    await axios.delete(`http://127.0.0.1:8000/api/manager/artist_songs/${oldMainArtist.id}/delete/`);
                    console.log("Đã xóa ca sĩ chính cũ:", oldMainArtist.id);

                    // Thêm ca sĩ chính mới
                    const addMainResponse = await axios.post(`http://127.0.0.1:8000/api/manager/artist_songs/add/`, mainArtistData, { headers: { "Content-Type": "application/json" } });
                    console.log("Đã thêm ca sĩ chính mới:", addMainResponse.data);
                }
            } else {
                // Nếu chưa có ca sĩ chính, thêm mới
                const addMainResponse = await axios.post(`http://127.0.0.1:8000/api/manager/artist_songs/add/`, mainArtistData, { headers: { "Content-Type": "application/json" } });
                console.log("Đã thêm ca sĩ chính mới (không có cũ):", addMainResponse.data);
            }

            // Cập nhật hoặc thêm ca sĩ phụ
            for (const artistId of featuredArtists) {
                const featuredArtistData = {
                    artist_id: Number(artistId),
                    song_id: Number(id),
                    main_artist: false,
                };
                console.log("Dữ liệu gửi cho ca sĩ phụ:", featuredArtistData);
                const existingFeaturedArtist = currentArtistSongs.find((as) => !as.main_artist && String(as.artist_id) === artistId);
                if (existingFeaturedArtist) {
                    // Cập nhật nếu ca sĩ phụ đã tồn tại
                    await axios.put(`http://127.0.0.1:8000/api/manager/artist_songs/${existingFeaturedArtist.id}/update/`, featuredArtistData, { headers: { "Content-Type": "application/json" } });
                    console.log("Đã cập nhật ca sĩ phụ:", existingFeaturedArtist.id);
                } else {
                    // Thêm ca sĩ phụ mới
                    const addFeaturedResponse = await axios.post(`http://127.0.0.1:8000/api/manager/artist_songs/add/`, featuredArtistData, { headers: { "Content-Type": "application/json" } });
                    console.log("Đã thêm ca sĩ phụ mới:", addFeaturedResponse.data);
                }
            }

            setSuccess("Bài hát đã được cập nhật thành công!");
            // Reset form (nếu muốn quay lại trang danh sách) hoặc giữ nguyên để tiếp tục chỉnh sửa
        } catch (error) {
            console.error("Lỗi khi cập nhật bài hát:", error);
            console.error("Chi tiết response:", error.response?.data);
            let errorMessage = "Lỗi khi cập nhật bài hát: ";
            if (error.response?.data?.error) {
                errorMessage += error.response.data.error;
            } else if (error.response?.data?.artist_id) {
                errorMessage += "Lỗi ca sĩ - " + error.response.data.artist_id;
            } else if (error.response?.data?.song_id) {
                errorMessage += "Lỗi bài hát - " + error.response.data.song_id;
            } else if (error.message) {
                errorMessage += error.message;
            } else {
                errorMessage += "Đã xảy ra lỗi không xác định";
            }
            setError(errorMessage);
        }
    };

    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div className="h-full w-fit flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/song" className="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại chi tiết bài hát {formData.title}
                    </Link>
                </div>
                <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <button type="submit" form="at-form-update" className="w-fit px-4 py-2 ml-4 bg-black border border-spotifyGreen text-spotifyGreen font-gilroy rounded-sm cursor-pointer hover:bg-spotifyGreen hover:text-white text-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Cập nhật
                    </button>
                </div>
            </div>

            <form id="at-form-update" onSubmit={handleSubmit} className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
                <h1 className="font-bold text-xl">Chỉnh sửa bài hát</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                {error && <div className="w-full text-red-500">{error}</div>}
                {success && <div className="w-full text-green-500">{success}</div>}
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={existingImage} alt="ảnh đại diện" className="h-56 w-56" />
                        <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" name="image" onChange={handleInputChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                            <span className="transition-all duration-300 text-spotifyGray group-hover:text-white pointer-events-none">Thay ảnh bìa</span>
                        </div>
                    </div>

                    <div className="w-[78%]">
                        <InputCombo type="text" placeholder="Nhập tên bài hát" label="Tên bài hát" name="title" value={formData.title} onChange={handleInputChange} required />

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="file_path">Đường dẫn bài hát</label>
                            <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-start transition-all duration-300">
                                <input type="file" name="file_path" onChange={handleInputChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                <span className="text-spotifyGray pointer-events-none">Thay đường dẫn</span>
                            </div>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="video_url">Đường dẫn video</label>
                            <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-start transition-all duration-300">
                                <input type="file" name="video_url" onChange={handleInputChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                <span className="text-spotifyGray pointer-events-none">Thay đường dẫn</span>
                            </div>
                        </div>

                        <InputCombo type="text" placeholder="Nhập loại nội dung bài hát" label="Loại nội dung bài hát" name="content_type" value={formData.content_type} onChange={handleInputChange} required />

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="album">Thuộc Album</label>
                            <select name="album" value={selectedAlbum} className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled>
                                    - Chọn album -
                                </option>
                                {albums.map((album) => (
                                    <option key={album.album_id} value={album.album_id}>
                                        {album.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="main_artist">
                                Ca sĩ chính <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="main_artist"
                                value={mainArtist}
                                onChange={(e) => {
                                    console.log("Ca sĩ chính được chọn:", e.target.value);
                                    setMainArtist(e.target.value);
                                }}
                                className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
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
                            <select
                                name="featured_artists"
                                multiple
                                value={featuredArtists}
                                onChange={(e) => {
                                    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value).filter((val) => val && !isNaN(Number(val)));
                                    console.log("Ca sĩ phụ được chọn:", selectedValues);
                                    setFeaturedArtists(selectedValues);
                                }}
                                className="bg-black mt-2 w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {artists
                                    .filter((artist) => artist.artist_id != mainArtist)
                                    .map((artist) => (
                                        <option key={artist.artist_id} value={artist.artist_id}>
                                            {artist.name}
                                        </option>
                                    ))}
                            </select>
                            <small className="text-spotifyGray">Giữ phím Ctrl để chọn nhiều ca sĩ phụ</small>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SongUpdate;
