import { faMusic, faUser, faFileAudio, faImages, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { DashboardItem, DashboardChart } from "../../components";
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
            const response = await axios.get("http://127.0.0.1:8000/api/manager/artists/count/");
            setCountArtists(response.data.total_artists);
        };

        const loadAllAlbums = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/manager/albums/count/");
            setCountAlbums(response.data.total_albums);
        };

        const loadAllSongs = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/manager/songs/count/");
            setCountSongs(response.data.total_songs);
        };

        const loadAllPlaylist = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/manager/playlists/count/");
            setCountPlaylists(response.data.total_playlists);
        };

        const loadAllUser = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/manager/users/count/");
            setCountUsers(response.data.total_users);
        };

        const loadTopFavoriteSongs = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/manager/songs/top-favourite/");
            setTopFavorite(response.data);
            console.log("haha: ", response.data);
        };

        const loadTopFollowedArtists = async () => {
            const response = await axios.get("http://127.0.0.1:8000/api/manager/artists/top-followed/");
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
                                    <img src={artist.image || ""} alt="Ảnh đại diện" className="bg-violet-500 aspect-square h-12 w-14 object-cover" />
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
                                    <img src={artist.image || ""} alt="Ảnh đại diện" className="bg-violet-500 aspect-square h-12 w-14 object-cover" />
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
                                        <img src={song.image || ""} alt="Ảnh bìa" className="bg-violet-500 h-12 w-14 aspect-square object-cover" />
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
                                    <img src={song.image || ""} alt="Ảnh bìa" className="bg-violet-500 h-12 w-14 aspect-square object-cover" />
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

            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="w-full bg-black px-4 py-4 rounded-md h-72">
                <h1 className="text-lg font-spotify text-white ml-6">Bài hát theo loại</h1>
                <div className="bg-gray-300 w-full h-px mt-2 mb-6"></div>
                <DashboardChart />
            </div>
        </div>
    );
};
export default Dashboard;
