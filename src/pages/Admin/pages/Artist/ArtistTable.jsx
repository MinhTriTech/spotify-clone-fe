import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchArtists } from "../../../../services_admin/artist";
import thumbnail from "../../../../../public/images/artist.png";

const ArtistTable = ({ searchTerm }) => {
  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();
  const pageSize = 6;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset về trang đầu khi search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load data khi page hoặc debouncedSearch thay đổi
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      fetchData(page);
    } else {
      handleSearch(debouncedSearch, page);
    }
  }, [debouncedSearch, page]);

  const fetchData = async (page) => {
    try {
      const data = await searchArtists(debouncedSearch, page, pageSize); // Thay đổi API gọi
      setArtists(data.results);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error("Lỗi khi tải danh sách nghệ sĩ:", error);
    }
  };

  const handleSearch = async (keyword, page) => {
    try {
      const data = await searchArtists(keyword, page, pageSize);
      setArtists(data.results);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error("Lỗi khi tìm kiếm nghệ sĩ:", error);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/admin/artist/${id}/detail`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="bg-black overflow-auto max-h-[calc(100vh-250px)] px-1 py-1 shadow-md rounded-lg">
      <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
        <thead className="bg-spotifyGreen sticky top-0 z-10 shadow-md">
          <tr className="text-left text-white h-12">
            <th className="p-4 text-center">STT</th>
            <th className="p-4 text-center">Ảnh đại diện</th>
            <th className="p-4">Tên nghệ sĩ</th>
            <th className="p-4">Tiểu sử</th>
            <th className="p-4 text-center">Ngày khởi tạo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 cursor-pointer">
          {artists.map((artist, index) => (
            <tr
              key={artist.artist_id}
              className="transition-all duration-300 hover:bg-gray-900 h-16"
              onClick={() => handleRowClick(artist.artist_id)}
            >
              <td className="p-4 text-center">{(page - 1) * pageSize + index + 1}</td>
              <td className="p-4">
                <img
                  src={artist.image || thumbnail}
                  alt="Ảnh"
                  className="w-10 h-10 object-cover mx-auto"
                />
              </td>
              <td className="p-4 text-violet-500">{artist.name}</td>
              <td className="p-4">{artist.bio}</td>
              <td className="p-4 text-center">
                {new Date(artist.created_at).toLocaleDateString("vi-VN")}
              </td>
            </tr>
          ))}

          {artists.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-5">
                Không có nghệ sĩ nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-spotifyGreen hover:bg-green-600"} text-white`}
          >
            Previous
          </button>
          <span className="text-white">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md ${page === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-spotifyGreen hover:bg-green-600"} text-white`}
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default ArtistTable;
