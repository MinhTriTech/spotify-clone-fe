import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo } from "../../components";
import { useState, useEffect } from "react";
import { fetchAlbums } from "../../../../services_admin/album";
import axios from "axios";

const SongCreate = () => {
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
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Gọi API lấy danh sách nghệ sĩ
        const fetchArtists = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}api/manager/artists/`);
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

        fetchArtists();
        fetchAllAlbums();
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

        // Kiểm tra xem có ca sĩ chính được chọn không
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
            data.append("album", selectedAlbum);
            console.log("album đang chọn: ", selectedAlbum);
        }

        try {
            // Gửi yêu cầu tạo bài hát
            console.log("Đang tạo bài hát...");
            const songResponse = await axios.post(`${import.meta.env.VITE_API_URL}api/manager/songs/add/`, data, { headers: { "Content-Type": "multipart/form-data" } });

            if (!songResponse.data || !songResponse.data.song || !songResponse.data.song.song_id) {
                throw new Error("Không nhận được ID bài hát từ server");
            }

            const songId = songResponse.data.song.song_id;
            console.log("Bài hát đã được tạo với ID:", songId);

            const albumSongData = {
                album_id: selectedAlbum,
                song_id: songId,
            };

            const albumSongResponse = await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}api/manager/album_songs/add/`,
                data: albumSongData,
                headers: { "Content-Type": "application/json" },
            });

            console.log("Kết quả liên kết album:", albumSongResponse.data);

            // Gửi yêu cầu lưu ca sĩ chính - SỬA LỖI Ở ĐÂY
            console.log("Đang liên kết ca sĩ chính với ID:", mainArtist, "cho bài hát ID:", songId);
            const mainArtistData = {
                artist_id: Number(mainArtist),
                song_id: songId,
                main_artist: 1,
            };

            console.log("Dữ liệu gửi cho ca sĩ chính:", JSON.stringify(mainArtistData));

            const mainArtistResponse = await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_URL}api/manager/artist_songs/add/`,
                data: mainArtistData,
                headers: { "Content-Type": "application/json" },
            });

            console.log("Kết quả liên kết ca sĩ chính:", mainArtistResponse.data);

            // Gửi yêu cầu lưu các ca sĩ phụ
            if (featuredArtists.length > 0) {
                console.log("Bắt đầu liên kết", featuredArtists.length, "ca sĩ phụ");
                for (const artistId of featuredArtists) {
                    const featuredArtistData = {
                        artist_id: Number(artistId),
                        song_id: songId,
                        main_artist: 0,
                    };

                    console.log("Dữ liệu gửi cho ca sĩ phụ:", JSON.stringify(featuredArtistData));

                    const response = await axios({
                        method: "post",
                        url: `${import.meta.env.VITE_API_URL}api/manager/artist_songs/add/`,
                        data: featuredArtistData,
                        headers: { "Content-Type": "application/json" },
                    });

                    console.log("Kết quả liên kết ca sĩ phụ:", response.data);
                }
            }

            setSuccess("Bài hát đã được tạo thành công!");
            // Reset form
            setFormData({ title: "", image: null, file_path: null, video_url: null, content_type: "" });
            setMainArtist("");
            setFeaturedArtists([]);
            setSelectedAlbum("");
        } catch (error) {
            console.error("Lỗi đầy đủ:", error);
            console.error("Chi tiết response:", error.response?.data);

            // Hiển thị thông báo lỗi chi tiết hơn
            let errorMessage = "Lỗi khi tạo bài hát: ";

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
                <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/song" className="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách bài hát
                    </Link>
                </div>
                <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <button type="submit" form="at-form-create" className="w-[11%] 2xl:w-[7%] px-4 py-2 ml-4 bg-black border border-spotifyGreen text-spotifyGreen font-gilroy rounded-sm cursor-pointer hover:bg-spotifyGreen hover:text-white text-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Lưu
                    </button>
                </div>
            </div>

            <form id="at-form-create" onSubmit={handleSubmit} className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
                <h1 className="font-bold text-xl">Thông tin bài hát</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                {error && <div className="w-full text-red-500">{error}</div>}
                {success && <div className="w-full text-green-500">{success}</div>}
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={thumbnail} alt="ảnh đại diện" className="h-56 w-56" />
                        <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" name="image" onChange={handleInputChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                            <span className="transition-all duration-300 text-spotifyGray group-hover:text-white pointer-events-none">Chọn ảnh bìa</span>
                        </div>
                    </div>

                    <div className="w-[78%]">
                        <InputCombo type="text" placeholder="Nhập tên bài hát" label="Tên bài hát" name="title" value={formData.title} onChange={handleInputChange} required />

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="file_path">Đường dẫn bài hát</label>
                            <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-start transition-all duration-300">
                                <input type="file" name="file_path" onChange={handleInputChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                <span className="text-spotifyGray pointer-events-none">Chọn đường dẫn</span>
                            </div>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="video_url">Đường dẫn video</label>
                            <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-start transition-all duration-300">
                                <input type="file" name="video_url" onChange={handleInputChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                <span className="text-spotifyGray pointer-events-none">Chọn đường dẫn</span>
                            </div>
                        </div>

                        <InputCombo type="text" placeholder="Nhập loại nội dung bài hát" label="Loại nội dung bài hát" name="content_type" value={formData.content_type} onChange={handleInputChange} required />

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="album">Thuộc Album</label>
                            <select name="album" value={selectedAlbum} onChange={(e) => setSelectedAlbum(e.target.value)} className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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
                                    console.log("Ca sĩ được chọn:", e.target.value);
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
                            <select name="featured_artists" multiple value={featuredArtists} onChange={(e) => setFeaturedArtists(Array.from(e.target.selectedOptions, (option) => option.value))} className="bg-black mt-2 w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
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

export default SongCreate;
