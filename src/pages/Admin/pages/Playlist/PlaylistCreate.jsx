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
    const [selectedUser, setSelectedUser] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        image: null,
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/manager/songs/");
                setSongs(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách bài hát:", error);
            }
        };

        const loadUsers = async () => {
            try {
                // const response = await axios.get("http://127.0.0.1:8000/api/manager/users/");
            } catch (error) {
                console.error("Lỗi khi tải danh sách người dùng: ", error);
            }
        };

        loadSongs();
    }, []);

    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div class="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/song" class="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách danh sách phát
                    </Link>
                </div>
                <div class="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <button type="submit" form="pl-form-create" class="w-[11%] 2xl:w-[7%] px-4 py-2 ml-4 bg-black border border-spotifyGreen text-spotifyGreen font-gilroy rounded-sm cursor-pointer hover:bg-spotifyGreen hover:text-white text-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Lưu
                    </button>
                </div>
            </div>

            <form style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} id="pl-form-create" className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Thông tin danh sách phát</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                {error && <div className="w-full text-red-500">{error}</div>}
                {success && <div className="w-full text-green-500">{success}</div>}
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={thumbnail} alt="ảnh đại diện" className="h-56 w-56" />
                        <div class="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                            <span class=" transition-all duration-300 text-spotifyGray group-hover:text-white pointer-events-none">Chọn ảnh bìa</span>
                        </div>
                    </div>

                    <div className="w-[78%]">
                        <InputCombo type="text" placeholder="Nhập tên danh sách phát" label="Tên danh sách phát" name="name" />
                        <div className="w-full px-6 mb-2">
                            <label for="artist">Người tạo</label>
                            <select name="artist" class="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled selected>
                                    - Chọn người tạo -
                                </option>
                                <option value="1">HAITHUHIEU</option>
                            </select>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="song_id">Bài hát</label>
                            <select name="song_id" multiple value={selectedSongs} onChange={(e) => setSelectedSongs(Array.from(e.target.selectedOptions, (option) => option.value))} className="bg-black mt-2 w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                {songs.map((song) => (
                                    <option key={song.song_id} value={song.song_id}>
                                        {song.title}
                                    </option>
                                ))}
                            </select>
                            <small className="text-spotifyGray">Giữ phím Ctrl để chọn nhiều ca sĩ phụ</small>
                        </div>
                    </div>

                    {/* name="featured_artists" multiple value={featuredArtists} onChange={(e) => setFeaturedArtists(Array.from(e.target.selectedOptions, (option) => option.value))} */}
                </div>
            </form>
        </>
    );
};

export default PlaylistCreate;
