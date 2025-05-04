import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import {
  fetchAlbumsPaginated,
  searchAlbums
} from "../../../../services_admin/album";
import { fetchArtistById } from "../../../../services_admin/artist";

const AlbumTable = ({ searchTerm }) => {
  const [albums, setAlbums] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();
  const pageSize = 6;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset về trang đầu khi tìm kiếm
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load dữ liệu khi search hoặc page thay đổi
  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      fetchData(page);
    } else {
      handleSearch(debouncedSearch, page);
    }
  }, [debouncedSearch, page]);

  const fetchData = async (page) => {
    try {
      const data = await fetchAlbumsPaginated(page, pageSize);
      const albumsWithArtists = await Promise.all(
        data.results.map(async (album) => {
          try {
            const artist = await fetchArtistById(album.artist_id);
            return { ...album, artist_name: artist.name };
          } catch {
            return { ...album, artist_name: "Không rõ" };
          }
        })
      );
      setAlbums(albumsWithArtists);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error("Lỗi khi tải danh sách album:", error);
    }
  };

  const handleSearch = async (keyword, page) => {
    try {
      const data = await searchAlbums(keyword, page, pageSize);
      const albumsWithArtists = await Promise.all(
        data.results.map(async (album) => {
          try {
            const artist = await fetchArtistById(album.artist_id);
            return { ...album, artist_name: artist.name };
          } catch {
            return { ...album, artist_name: "Không rõ" };
          }
        })
      );
      setAlbums(albumsWithArtists);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (error) {
      console.error("Lỗi khi tìm kiếm album:", error);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/admin/album/${id}/detail`);
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
            <th className="p-4 text-center">Ảnh bìa</th>
            <th className="p-4">Tên album</th>
            <th className="p-4">Tên nghệ sĩ</th>
            <th className="p-4 text-center">Ngày khởi tạo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 cursor-pointer">
          {albums.map((album, index) => (
            <tr
              key={album.album_id}
              className="transition-all duration-300 hover:bg-gray-900 h-16"
              onClick={() => handleRowClick(album.album_id)}
            >
              <td className="p-4 text-center">{(page - 1) * pageSize + index + 1}</td>
              <td className="p-4">
                <img
                  src={album.image || thumbnail}
                  alt="Ảnh album"
                  className="w-10 h-10 object-cover mx-auto"
                />
              </td>
              <td className="p-4 text-violet-500">{album.title}</td>
              <td className="p-4">{album.artist_name}</td>
              <td className="p-4 text-center">
                {new Date(album.created_at).toLocaleDateString("vi-VN")}
              </td>
            </tr>
          ))}

          {albums.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-5">
                Không có album nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-center mt-4 gap-2 text-white">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          ◀
        </button>
        <span>Trang {page} / {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default AlbumTable;
