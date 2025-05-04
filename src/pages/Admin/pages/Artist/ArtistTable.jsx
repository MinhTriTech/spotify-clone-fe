import { useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { deleteArtist, fetchArtists } from "../../../../services_admin/artist";
import { useState, useEffect } from "react";

const ArtistTable = () => {
    const navigate = useNavigate();

    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadArtists();
    }, []);

    const loadArtists = async () => {
        try {
            const data = await fetchArtists();
            setArtists(data);
        } catch (err) {
            console.error(err);
            setError("Không thể tải nghệ sĩ.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/artist/${id}`);
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa nghệ sĩ này?");
        if (confirmDelete) {
            try {
                await deleteArtist(id);
                alert("Đã xóa thành công!");
                loadArtists(); // Tải lại danh sách sau khi xóa
            } catch (err) {
                console.error(err);
                alert("Xóa thất bại!");
            }
        }
    };

    if (loading) {
        return <div className="text-white text-center p-5">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center p-5">{error}</div>;
    }

    return (
        <div className="bg-black overflow-auto max-h-[calc(100vh-250px)] px-1 py-1 shadow-md rounded-lg">
            <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
                <thead class="bg-spotifyGreen sticky top-0 z-10 shadow-md">
                    <tr class="text-left text-white h-12">
                        <th class="p-4 text-center">STT</th>
                        <th class="p-4 text-center">Ảnh đại diện</th>
                        <th class="p-4">Tên nghệ sĩ</th>
                        <th class="p-4">Tiểu sử</th>
                        <th class="p-4 text-center">Ngày khởi tạo</th>
                        <th class="p-4 text-center">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {artists.length > 0 ? (
                        artists.map((artist, index) => (
                            <tr
                                key={artist.artist_id}
                                className="transition-all duration-300 hover:bg-gray-900 h-16"
                            >
                                <td className="p-4 text-center">{index + 1}</td>
                                <td className="p-4">
                                    <img
                                        src={artist.image || thumbnail}
                                        alt="Ảnh"
                                        className="w-10 h-10 object-cover mx-auto"
                                    />
                                </td>
                                <td className="p-4 text-violet-500">{artist.name}</td>
                                <td className="p-4">{artist.bio}</td>
                                <td className="p-4 text-center">{new Date(artist.created_at).toLocaleDateString()}</td>
                                <td className="p-4 text-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(artist.artist_id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(artist.artist_id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-5">
                                Không có nghệ sĩ nào.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
export default ArtistTable;
