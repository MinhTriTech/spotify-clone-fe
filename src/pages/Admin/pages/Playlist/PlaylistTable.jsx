import { useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";

const PlaylistTable = ({ playlists, currentPage, totalPages, onPreviousPage, onNextPage }) => {
    const navigate = useNavigate();

    const handleDetail = (id) => {
        navigate(`/admin/playlist/${id}/detail`);
    };
    const PAGESIZE = 6;
    return (
        <div className="bg-black overflow-auto max-h-[calc(100vh-250px)] px-1 py-1 shadow-md rounded-lg">
            <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
                <thead className="bg-spotifyGreen sticky top-0 z-10 shadow-md">
                    <tr className="text-left text-white h-12">
                        <th className="p-4 text-center">STT</th>
                        <th className="p-4">Ảnh bìa</th>
                        <th className="p-4">Tên danh sách phát</th>
                        <th className="p-4 text-center">Được tạo bởi</th>
                        <th className="p-4 text-center">Ngày khởi tạo</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 cursor-pointer">
                    {playlists.map((playlist, index) => (
                        <tr key={playlist.playlist_id} className="transition-all duration-300 hover:bg-gray-900 h-16 group" onClick={() => handleDetail(playlist.playlist_id)}>
                            <td className="p-4 text-center">{(currentPage - 1) * PAGESIZE + index + 1}</td>
                            <td className="p-4">
                                <img src={playlist.image || thumbnail} alt="Ảnh danh sách phát" className="w-10 h-10 object-cover mx-auto" />
                            </td>
                            <td className="p-4 text-violet-500">{playlist.title}</td>
                            <td className="p-4 text-center">{playlist.created_by_id || "Không rõ"}</td>
                            <td className="p-4 text-center">{new Date(playlist.created_at).toLocaleDateString("vi-VN")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <button onClick={onPreviousPage} disabled={currentPage === 1} className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-spotifyGreen hover:bg-green-600"} text-white`}>
                    Previous
                </button>
                <span className="text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={onNextPage} disabled={currentPage === totalPages} className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-spotifyGreen hover:bg-green-600"} text-white`}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PlaylistTable;
