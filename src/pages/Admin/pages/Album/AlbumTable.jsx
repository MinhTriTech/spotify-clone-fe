import { useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { useState, useEffect } from "react";
import { deleteAlbum, fetchAlbums } from "../../../../services_admin/album";
const AlbumTable = () => {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const data = await fetchAlbums();
                setAlbums(data);
            } catch (error) {
                console.error("Error loading albums:", error);
            }
        };

        loadAlbums();
    }, []);

    const handleEdit = (id) => {
        navigate(`/admin/album/${id}/edit`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa album này không?")) {
            try {
                await deleteAlbum(id);
                setAlbums(prev => prev.filter(album => album.album_id !== id));
            } catch (error) {
                console.error("Delete album error:", error);
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
                        <th className="p-4">Tên album</th>
                        <th className="p-4">Tên nghệ sĩ</th>
                        <th className="p-4 text-center">Ngày khởi tạo</th>
                        <th className="p-4 text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {albums.map((album, index) => (
                        <tr key={album.album_id} className="transition-all duration-300 hover:bg-gray-900 h-16 group">
                            <td className="p-4 text-center">{index + 1}</td>
                            <td className="p-4">
                                <img
                                    src={album.image || thumbnailDefault}
                                    alt="Ảnh album"
                                    className="w-10 h-10 object-cover mx-auto"
                                />
                            </td>
                            <td className="p-4 text-violet-500">{album.title}</td>
                            <td className="p-4">{album.artist_name || "Không rõ"}</td> {/* artist_name cần trả từ API */}
                            <td className="p-4 text-center">{new Date(album.created_at).toLocaleDateString('vi-VN')}</td>
                            <td className="p-4 flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handleEdit(album.album_id)}
                                    className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white"
                                >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(album.album_id)}
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
export default AlbumTable;
