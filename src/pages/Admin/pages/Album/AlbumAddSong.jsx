// src/pages/admin/album/AlbumAddSong.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSongs } from "../../../../services_admin/song";
import { addAlbumSong } from "../../../../services_admin/album_song";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonAdmin } from "../../components";

const AlbumAddSong = () => {
  const { id: albumId } = useParams(); // lấy album_id từ URL
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const result = await fetchSongs(); // Lấy tất cả bài hát
        setSongs(result);
      } catch (err) {
        console.error("Lỗi khi tải bài hát:", err);
        setError("Không thể tải danh sách bài hát.");
      }
    };

    loadSongs();
  }, []);

  const handleAddSong = async (songId) => {
    try {
      await addAlbumSong({ album_id: albumId, song_id: songId }); // Gửi object đúng format
      setSuccess("Đã thêm bài hát vào album.");
      setTimeout(() => navigate(`/admin/album/${albumId}/detail`), 1000);
    } catch (err) {
      console.error("Lỗi khi thêm bài hát:", err);
      setError("Không thể thêm bài hát vào album.");
    }
  };

  return (
    <div className="p-8 text-white bg-black min-h-screen">
      <div className="flex items-center mb-6">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-spotifyGray cursor-pointer hover:text-white"
          onClick={() => navigate(`/admin/album/${albumId}/detail`)}
        />
        <h1 className="ml-4 text-xl font-bold">Thêm bài hát vào Album</h1>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-spotifyGreen text-white">
          <tr>
            <th className="p-3 text-left">Tên bài hát</th>
            <th className="p-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {songs.map((song) => (
            <tr key={song.song_id} className="hover:bg-gray-800 transition">
              <td className="p-3">{song.title}</td>
              <td className="p-3 text-center">
                <ButtonAdmin
                  icon={faPlus}
                  title="Thêm"
                  color="spotifyGreen"
                  textHover="white"
                  onClick={() => handleAddSong(song.song_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumAddSong;
