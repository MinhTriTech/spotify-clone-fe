import { useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { fetchArtists } from "../../../../services_admin/artist";
import { useState, useEffect } from "react";

const ArtistTable = () => {
  const navigate = useNavigate();

  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    loadArtists();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/admin/artist/${id}/detail`);
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
        <thead className="bg-spotifyGreen sticky top-0 z-10 shadow-md">
          <tr className="text-left text-white h-12">
            <th className="p-4 text-center">STT</th>
            <th className="p-4 text-center">Ảnh đại diện</th>
            <th className="p-4">Tên nghệ sĩ</th>
            <th className="p-4">Tiểu sử</th>
            <th className="p-4 text-center">Ngày khởi tạo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {artists.length > 0 ? (
            artists.map((artist, index) => (
              <tr
                key={artist.artist_id}
                className="transition-all duration-300 hover:bg-gray-900 h-16 cursor-pointer"
                onClick={() => handleRowClick(artist.artist_id)}
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
                <td className="p-4 text-center">
                  {new Date(artist.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-5">
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