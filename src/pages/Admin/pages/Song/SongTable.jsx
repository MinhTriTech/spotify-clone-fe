import { useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { useState, useEffect } from "react";
import { fetchSongs, deleteSong } from "../../../../services_admin/song";
const SongTable = () => {
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const data = await fetchSongs();
                setSongs(data);
            } catch (error) {
                console.error("Error loading songs:", error);
            }
        };

        loadSongs();
    }, []);

    const handleDetail = (id) => {
        navigate(`/admin/song/${id}/detail`);
    };

    return (
        <div className="bg-black overflow-auto max-h-[calc(100vh-250px)] px-1 py-1 shadow-md rounded-lg">
            <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
                <thead className="bg-spotifyGreen sticky top-0 z-10 shadow-md">
                    <tr className="text-left text-white h-12">
                        <th className="p-4 text-center">STT</th>
                        <th className="p-4 text-center">Ảnh bìa</th>
                        <th className="p-4">Tên bài hát</th>
                        <th className="p-4">Loại nội dung</th>
                        <th className="p-4 text-center">Ngày khởi tạo</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {songs.map((song, index) => (
                        <tr key={song.song_id} className="transition-all duration-300 hover:bg-gray-900 h-16 group" onClick={() => handleDetail(song.song_id)}>
                            <td className="p-4 text-center">{index + 1}</td>
                            <td className="p-4">
                                <img src={song.image || thumbnailDefault} alt="Ảnh bài hát" className="w-10 h-10 object-cover mx-auto" />
                            </td>
                            <td className="p-4 text-violet-500">{song.title}</td>
                            <td className="p-4">{song.content_type || "Không rõ"}</td>
                            <td className="p-4 text-center">{new Date(song.created_at).toLocaleDateString("vi-VN")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default SongTable;
