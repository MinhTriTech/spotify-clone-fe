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

    const handleEdit = (id) => {
        navigate(`/admin/song/${id}/edit`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài hát này không?")) {
            try {
                await deleteSong(id);
                setSongs(prev => prev.filter(song => song.song_id !== id));
            } catch (error) {
                console.error("Delete song error:", error);
            }
        }
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
                        <th className="p-4 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {songs.map((song, index) => (
                        <tr key={song.song_id} className="transition-all duration-300 hover:bg-gray-900 h-16 group">
                            <td className="p-4 text-center">{index + 1}</td>
                            <td className="p-4">
                                <img
                                    src={song.image || thumbnailDefault}
                                    alt="Ảnh bài hát"
                                    className="w-10 h-10 object-cover mx-auto"
                                />
                            </td>
                            <td className="p-4 text-violet-500">{song.title}</td>
                            <td className="p-4">{song.content_type || "Không rõ"}</td>
                            <td className="p-4 text-center">{new Date(song.created_at).toLocaleDateString('vi-VN')}</td>
                            <td className="p-4 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handleEdit(song.song_id)}
                                    className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(song.song_id)}
                                    className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default SongTable;
