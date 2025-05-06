import { useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";

const AlbumTable = () => {
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate("/admin/album/detail");
    };

    return (
        <div className="bg-black overflow-auto max-h-[calc(100vh-250px)] px-1 py-1 shadow-md rounded-lg">
            <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
                <thead class="bg-spotifyGreen sticky top-0 z-10 shadow-md">
                    <tr class="text-left text-white h-12">
                        <th class="p-4 text-center">STT</th>
                        <th class="p-4 text-center">Ảnh bìa</th>
                        <th class="p-4">Tên album</th>
                        <th class="p-4">Tên nghệ sĩ</th>
                        <th class="p-4 text-center">Ngày khởi tạo</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 cursor-pointer">
                    <tr onClick={handleRowClick} class="transition-all duration-300  hover:bg-gray-900 h-16 group">
                        <td class="p-4 text-center">1</td>
                        <td class="p-4">
                            <img src={thumbnail} alt="Ảnh" class="w-10 h-10 object-cover mx-auto" />
                        </td>
                        <td class="p-4 text-violet-500 group-hover:underline">HAITHUHIEU</td>
                        <td class="p-4">ai biết đại đại đi</td>
                        <td class="p-4 text-center">21/09/2025</td>
                    </tr>
                    <tr onClick={handleRowClick} class="hover:bg-gray-900 h-16 group">
                        <td class="p-4 text-center">2</td>
                        <td class="p-4">
                            <img src={thumbnail} alt="Ảnh" class="w-10 h-10 object-cover mx-auto" />
                        </td>
                        <td class="p-4 text-violet-500 group-hover:underline">HAITHUHIEU</td>
                        <td class="p-4">ai biết đại đại đi</td>
                        <td class="p-4 text-center">21/09/2025</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default AlbumTable;
