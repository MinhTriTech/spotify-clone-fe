import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo, ButtonAdmin } from "../../components";
import { useState, useEffect } from "react";
import { fetchAlbumById, deleteAlbum } from "../../../../services_admin/album";
import {fetchArtistById} from "../../../../services_admin/artist";
import { fetchAlbumSongsByAlbum } from "../../../../services_admin/album_song";
import { fetchSongById } from "../../../../services_admin/song";

const AlbumDetail = () => {
    const { id } = useParams(); // Lấy album_id từ URL
    const navigate = useNavigate();
    const [album, setAlbum] = useState(null);
    const [artist, setArtist] = useState(null);
    const [song, setSong] = useState(null);
    const [albumSongs, setAlbumSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Tải dữ liệu album, nghệ sĩ, và bài hát
    useEffect(() => {
        const loadData = async () => {
            try {
                const albumData = await fetchAlbumById(id);
                const artistData = await fetchArtistById(albumData.artist_id);
                const albumSongsData = await fetchAlbumSongsByAlbum(id);
                const songList = await Promise.all(
                    albumSongsData.map((as) => fetchSongById(as.song_id))
                  );
                setAlbum(albumData);
                setArtist(artistData);
                setAlbumSongs(albumSongsData);
                setSong(songList);
                setLoading(false);
            } catch (err) {
                setError("Không thể tải dữ liệu.");
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    // Xử lý xóa album
    const handleDelete = async () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa album này không?")) {
            try {
                await deleteAlbum(id);
                navigate("/admin/album");
            } catch (err) {
                setError("Không thể xóa album. Vui lòng thử lại.");
            }
        }
    };

    // Xử lý xóa album_song
    const deleteAlbumSong = async () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài hát này khỏi album không?")) {
            try {
                await deleteAlbumSong(id);
                // Cập nhật lại danh sách bài hát sau khi xóa
                const updatedAlbumSongs = await fetchAlbumSongsByAlbum(id);
                setAlbumSongs(updatedAlbumSongs);
            } catch (err) {
                setError("Không thể xóa bài hát khỏi album. Vui lòng thử lại.");
            }
        }
    };

    // Xử lý thêm bài hát
    const handleAddSong = () => {
        navigate(`/admin/album/${id}/add-song`); // ✅ Đúng với route đã đăng ký
    };

    const handleUpdateAlbumSong = () => {
        navigate(`/admin/album/${id}/update`); // Chuyển hướng đến trang cập nhật album
    };

    // Hiển thị khi đang tải hoặc lỗi
    if (loading) return <div className="text-white">Đang tải...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!album || !artist) return <div className="text-white">Không tìm thấy dữ liệu.</div>;

    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/album" className="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách album
                    </Link>
                </div>

                <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <ButtonAdmin
                        icon={faXmark}
                        title="Xóa"
                        color="red-500"
                        textHover="white"
                        onClick={handleDelete}
                    />
                    <ButtonAdmin
                        path={`/admin/album/${id}/update`}
                        icon={faPenToSquare}
                        title="Cập nhật"
                        color="spotifyGreen"
                        textHover="white"
                        onClick={handleUpdateAlbumSong}
                    />
                </div>
            </div>

            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Thông tin album</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={album.image || thumbnail} alt="Ảnh bìa" className="h-56 w-56" />
                    </div>
                    <div className="w-[78%]">
                        <div className="mb-4">
                            <label className="block text-sm font-medium">TÊN ALBUM</label>
                            <p className="mt-1 text-white">{album.title}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">NGHỆ SĨ</label>
                            <p className="mt-1 text-white">{artist.name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium">NGÀY TẠO</label>
                            <p className="mt-1 text-white">{new Date(album.created_at).toLocaleDateString('vi-VN')}</p>
                        </div>
                    </div>
                </div>

                {/* Bảng danh sách bài hát */}
                <div className="w-full">
                    <h2 className="font-bold text-lg mb-4">Danh sách bài hát</h2>
                    <div className="flex justify-end mb-2">
                        <ButtonAdmin
                            icon={faPlus}
                            title="Thêm bài hát"
                            color="spotifyGreen"
                            textHover="white"
                            onClick={handleAddSong}
                        />
                    </div>
                    <div className="bg-black overflow-auto max-h-[300px] shadow-md rounded-lg">
                        <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
                            <thead className="bg-spotifyGreen sticky top-0 z-10 shadow-md">
                                <tr className="text-left text-white h-12">
                                    <th className="p-4 text-center">STT</th>
                                    <th className="p-4">Tên bài hát</th>
                                    <th className="p-4 text-center">Ngày thêm</th>
                                    <th className="p-4 text-center"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {albumSongs.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-4 text-center">Chưa có bài hát nào trong album.</td>
                                    </tr>
                                ) : (
                                    albumSongs.map((albumSong, index) => (
                                        <tr key={albumSong.id} className="transition-all duration-300 hover:bg-gray-900 h-16">
                                            <td className="p-4 text-center">{index + 1}</td>
                                            <td className="p-4">{song[index]?.title || "Không có tiêu đề"}</td>
                                            <td className="p-4 text-center">{new Date(albumSong.added_at).toLocaleDateString('vi-VN')}</td>
                                            <td className="p-4 text-center">
                                                <ButtonAdmin
                                                    icon={faXmark}
                                                    title="Xóa"
                                                    color="red-500"
                                                    textHover="white"
                                                    onClick={deleteAlbumSong}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AlbumDetail;