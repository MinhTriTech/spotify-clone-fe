import { useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { useEffect, useState } from "react";
import { fetchPlaylists } from "../../../../services_admin/playlist";
const PlaylistTable = () => {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const loadPlaylists = async () => {
            try {
                const data = await fetchPlaylists();
                setPlaylists(data);
            } catch (error) {
                console.error("Error loading songs:", error);
            }
        };

        loadPlaylists();
    }, []);

    const handleDetail = () => {
        navigate("/admin/playlist/detail");
    };

    return (
        <div className="bg-black overflow-auto max-h-[calc(100vh-250px)] px-1 py-1 shadow-md rounded-lg">
            <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
                <thead class="bg-spotifyGreen sticky top-0 z-10 shadow-md">
                    <tr class="text-left text-white h-12">
                        <th class="p-4 text-center">STT</th>
                        <th class="p-4">Ảnh bìa</th>
                        <th class="p-4">Tên danh sách phát</th>
                        <th class="p-4 text-center">Được tạo bởi</th>
                        <th class="p-4 text-center">Ngày khởi tạo</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 cursor-pointer">
                    {playlists.map((playlist, index) => (
                        <tr key={playlist.playlist_id} className="transition-all duration-300 hover:bg-gray-900 h-16 group" onClick={() => handleDetail(song.song_id)}>
                            <td className="p-4 text-center">{index + 1}</td>
                            <td className="p-4">
                                <img src={playlist.image || thumbnail} alt="Ảnh bài hát" className="w-10 h-10 object-cover mx-auto" />
                            </td>
                            <td className="p-4 text-violet-500">{playlist.title}</td>
                            <td className="p-4 text-center">{playlist.created_by_id || "Không rõ"}</td>
                            <td className="p-4 text-center">{new Date(playlist.created_at).toLocaleDateString("vi-VN")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default PlaylistTable;
