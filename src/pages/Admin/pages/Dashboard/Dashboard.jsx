import { faMusic, faUser, faFileAudio, faImages, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { DashboardItem } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {
    const navigate = useNavigate();
    const handleRowClick = () => {
        navigate("admin/user/detail");
    };

    const [countArtists, setCountArtists] = useState(0);
    const [countAlbums, setCountAlbums] = useState(0);
    const [countSongs, setCountSongs] = useState(0);
    const [countPlaylists, setCountPlaylists] = useState(0);
    const [countUsers, setCountUsers] = useState(0);
    const [topFavorite, setTopFavorite] = useState([]);
    const [topFollowed, setTopFollowed] = useState([]);

    useEffect(() => {
        const loadAllArtists = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/artists/count/`);
            setCountArtists(response.data.total_artists);
        };

        const loadAllAlbums = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/albums/count/`);
            setCountAlbums(response.data.total_albums);
        };

        const loadAllSongs = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/songs/count/`);
            setCountSongs(response.data.total_songs);
        };

        const loadAllPlaylist = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/playlists/count/`);
            setCountPlaylists(response.data.total_playlists);
        };

        const loadAllUser = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/users/count/`);
            setCountUsers(response.data.total_users);
        };

        const loadTopFavoriteSongs = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/songs/top-favourite/`);
            setTopFavorite(response.data);
            console.log("haha: ", response.data);
        };

        const loadTopFollowedArtists = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}api/manager/artists/top-followed/`);
            setTopFollowed(response.data);
        };

        loadAllArtists();
        loadAllAlbums();
        loadAllPlaylist();
        loadAllUser();
        loadAllSongs();
        loadTopFavoriteSongs();
        loadTopFollowedArtists();
    }, []);

    const artists = topFollowed.artists || [];
    const firstHalfArtists = artists.slice(0, 3);
    const secondHalfArtists = artists.slice(3, 6);

    const songs = topFavorite.songs || [];
    const firstHalfSongs = songs.slice(0, 3);
    const secondHalfSongs = songs.slice(3, 6);

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="w-full h-24 flex gap-6">
                <DashboardItem icon={faIdBadge} title="Nghệ sĩ" number={countArtists} />
                <DashboardItem icon={faImages} title="Albums" number={countAlbums} />
                <DashboardItem icon={faMusic} title="Bài hát" number={countSongs} />
                <DashboardItem icon={faFileAudio} title="Danh sách phát" number={countPlaylists} />
                <DashboardItem icon={faUser} title="Người dùng" number={countUsers} />
            </div>

            <div className="w-full flex gap-4 h-72">
                <div className="w-[50%] bg-black rounded-md px-4 py-4" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
                    <h1 className="text-lg font-spotify text-white ml-6">
                        Ca sĩ được yêu thích nhất{" "}
                        <Link to="/admin/artist" className="float-right mr-6 text-spotifyGreen font-spotify text-base hover:underline cursor-pointer">
                            Xem tất cả
                        </Link>
                    </h1>
                    <div className="bg-gray-300 w-full h-px mt-2"></div>
                    <div className="w-full px-4 py-4 flex gap-4 text-white">
                        <div className="w-[50%] flex flex-col gap-6">
                            {firstHalfArtists.map((artist) => (
                                <div key={artist.artist_id} className=" w-full h-12 flex">
                                    <img src={artist.image || ""} alt="Ảnh đại diện" className="bg-violet-500 h-12 w-14" />
                                    <div className="w-full my-auto ml-2">
                                        <p className="font-gilroy_md">{artist.name}</p>
                                        <p className="overflow-auto text-blue-600">{artist.bio || "không có tiểu sử"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-[50%] flex flex-col gap-6">
                            {secondHalfArtists.map((artist) => (
                                <div key={artist.artist_id} className=" w-full h-12 flex">
                                    <img src={artist.image || ""} alt="Ảnh đại diện" className="bg-violet-500 h-12 w-14" />
                                    <div className="w-full my-auto ml-2">
                                        <p className="font-gilroy_md">{artist.name}</p>
                                        <p className="overflow-auto text-blue-600">{artist.bio || "không có tiểu sử"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-[50%] bg-black rounded-md px-4 py-4" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
                    <h1 className="text-lg font-spotify text-white ml-6">
                        Bài hát được yêu thích nhất{" "}
                        <Link to="/admin/song" className="float-right mr-6 text-spotifyGreen font-spotify text-base hover:underline cursor-pointer">
                            Xem tất cả
                        </Link>
                    </h1>
                    <div className="bg-gray-300 w-full h-px mt-2"></div>
                    <div className="w-full px-4 py-4 flex gap-4 text-white">
                        <div className="w-[50%] flex flex-col gap-6">
                            <div className="w-[50%] flex flex-col gap-6">
                                {firstHalfSongs.map((song) => (
                                    <div key={song.song_id} className=" w-full h-12 flex">
                                        <img src={song.image || ""} alt="Ảnh bìa" className="bg-violet-500 h-12 w-14" />
                                        <div className="w-full my-auto ml-2">
                                            <p className="font-gilroy_md whitespace-nowrap overflow-hidden">{song.title}</p>
                                            <p className="text-blue-600 whitespace-nowrap overflow-hidden">{song.artists[song.artists.length - 1]?.name || "không có tác giả"}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-[50%] flex flex-col gap-6">
                            {secondHalfSongs.map((song) => (
                                <div key={song.song_id} className=" w-full h-12 flex">
                                    <img src={song.image || ""} alt="Ảnh bìa" className="bg-violet-500 h-12 w-14" />
                                    <div className="w-full my-auto ml-2">
                                        <p className="font-gilroy_md whitespace-nowrap overflow-hidden">{song.title}</p>
                                        <p className="text-blue-600 whitespace-nowrap overflow-hidden">{song.artists[song.artists.length - 1]?.name || "không có tác giả"}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="w-full bg-black px-4 py-4 rounded-md h-fit">
                <h1 className="text-lg font-spotify text-white ml-6">
                    Người dùng mới <span className="float-right mr-6 text-spotifyGreen font-spotify text-base hover:underline cursor-pointer">Xem tất cả</span>
                </h1>
                <div className="bg-gray-300 w-full h-px mt-2 mb-2"></div>
                <div className="bg-black overflow-auto max-h-[calc(100vh-250px)] px-1 py-1 shadow-md rounded-lg">
                    <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
                        <thead className="bg-spotifyGreen sticky top-0 z-10 shadow-md">
                            <tr className="text-left text-white h-12">
                                <th className="p-4 text-center">ID</th>
                                <th className="p-4">Họ và tên</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Trạng thái</th>
                                <th className="p-4 text-center">Quyền</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 cursor-pointer">
                            <tr onClick={handleRowClick} className="transition-all duration-300  hover:bg-gray-900 h-16 group">
                                <td className="p-4 text-center">1</td>
                                <td className="p-4">haha</td>
                                <td className="p-4 text-violet-500 group-hover:underline">HAITHUHIEU</td>
                                <td className="p-4">ai biết đại đại đi</td>
                                <th className="p-4 text-center">0</th>
                            </tr>
                            <tr onClick={handleRowClick} className="hover:bg-gray-900 h-16 group">
                                <td className="p-4 text-center">2</td>
                                <td className="p-4">Dai12312312312</td>
                                <td className="p-4 text-violet-500 group-hover:underline">HAITHUHIEU</td>
                                <td className="p-4">ai biết đại đại đi</td>
                                <td className="p-4 text-center">1</td>
                            </tr>
                            <tr onClick={handleRowClick} className="hover:bg-gray-900 h-16 group">
                                <td className="p-4 text-center">2</td>
                                <td className="p-4">Dai12312312312</td>
                                <td className="p-4 text-violet-500 group-hover:underline">HAITHUHIEU</td>
                                <td className="p-4">ai biết đại đại đi</td>
                                <td className="p-4 text-center">1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
