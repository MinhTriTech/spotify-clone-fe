// src/pages/admin/album/AlbumAddSong.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addAlbumSong, fetchSongsNotInAlbumByArtist } from "../../../../services_admin/album_song";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ButtonAdmin } from "../../components";

const AlbumAddSong = () => {
  const { id: albumId } = useParams();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const result = await fetchSongsNotInAlbumByArtist(albumId);
        setSongs(result.songs);
      } catch (err) {
        console.error("Lỗi khi tải bài hát:", err);
        setError("Không thể tải danh sách bài hát.");
      }
    };
    loadSongs();
  }, []);

  const handleCheckboxChange = (songId) => {
    setSelectedSongs((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  const handleAddSelectedSongs = async () => {
    try {
      for (const songId of selectedSongs) {
        await addAlbumSong({ album_id: albumId, song_id: songId });
      }
      setSuccess("Đã thêm tất cả bài hát đã chọn vào album.");
      setTimeout(() => navigate(`/admin/album/${albumId}/detail`), 1000);
    } catch (err) {
      console.error("Lỗi khi thêm bài hát:", err);
      setError("Không thể thêm một số bài hát vào album.");
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

      {songs.length === 0 ? (
        <p className="text-gray-400 italic">
          Tất cả bài hát của ca sĩ này đã có trong album này.
        </p>
      ) : (
        <>
          <table className="w-full table-auto border-collapse text-sm mb-4">
            <thead className="bg-spotifyGreen text-white">
              <tr>
                <th className="p-3 text-center w-12">Chọn</th>
                <th className="p-3 text-left">Tên bài hát</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {songs.map((song) => (
                <tr key={song.song_id} className="hover:bg-gray-800 transition">
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedSongs.includes(song.song_id)}
                      onChange={() => handleCheckboxChange(song.song_id)}
                    />
                  </td>
                  <td className="p-3">{song.title}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center">
            <ButtonAdmin
              icon={faPlus}
              title="Thêm tất cả đã chọn"
              color="spotifyGreen"
              textHover="white"
              onClick={handleAddSelectedSongs}
              disabled={selectedSongs.length === 0}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AlbumAddSong;
