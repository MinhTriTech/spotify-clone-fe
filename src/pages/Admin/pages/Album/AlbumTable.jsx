import { useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { useState, useEffect } from "react";
import { fetchAlbums } from "../../../../services_admin/album";
import { fetchArtistById } from "../../../../services_admin/artist"; // Import hàm mới

const AlbumTable = () => {
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const loadAlbums = async () => {
            try {
                const albumData = await fetchAlbums();
                // Lấy tên nghệ sĩ cho từng album
                const albumsWithArtistNames = await Promise.all(
                    albumData.map(async (album) => {
                        try {
                            const artist = await fetchArtistById(album.artist_id);
                            return { ...album, artist_name: artist.name };
                        } catch (error) {
                            return { ...album, artist_name: "Không rõ" }; // Fallback nếu lỗi
                        }
                    })
                );
                setAlbums(albumsWithArtistNames);
            } catch (error) {
                console.error("Error loading albums:", error);
            }
        };

        loadAlbums();
    }, []);

    // Hàm xử lý nhấp chuột vào dòng để chuyển hướng
    const handleRowClick = (id) => {
        navigate(`/admin/album/${id}/detail`);
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
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {albums.map((album, index) => (
                        <tr
                            key={album.album_id}
                            className="transition-all duration-300 hover:bg-gray-900 h-16 group cursor-pointer"
                            onClick={() => handleRowClick(album.album_id)}
                        >
                            <td className="p-4 text-center">{index + 1}</td>
                            <td className="p-4">
                                <img
                                    src={album.image || thumbnail}
                                    alt="Ảnh album"
                                    className="w-10 h-10 object-cover mx-auto"
                                />
                            </td>
                            <td className="p-4 text-violet-500">{album.title}</td>
                            <td className="p-4">{album.artist_name}</td>
                            <td className="p-4 text-center">{new Date(album.created_at).toLocaleDateString('vi-VN')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlbumTable;
