import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck, faPenToSquare, faC } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo, ButtonAdmin } from "../../components";
import { useState, useEffect } from "react";
import { fetchAlbumById, updateAlbum } from "../../../../services_admin/album";
import { fetchArtists, fetchArtistById } from "../../../../services_admin/artist";


const AlbumUpdate = () => {
    const { id } = useParams(); // Lấy album_id từ URL
    const navigate = useNavigate();

    const [album, setAlbum] = useState(null);
    const [artists, setArtists] = useState([]);
    const [currentArtistName, setCurrentArtistName] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        artist_id: "",
        image: null,
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const albumData = await fetchAlbumById(id);
                const artistList = await fetchArtists();
                const artistInfo = await fetchArtistById(albumData.artist_id);

                setAlbum(albumData);
                setArtists(artistList);
                setCurrentArtistName(artistInfo.name);

                setFormData({
                    title: albumData.title,
                    artist_id: albumData.artist_id,
                    image: albumData.image,
                });
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
            }
        };

        loadData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            image: file,
        }));
    };

    const handleSave = async () => {
        try {
            const updatedForm = new FormData();
            updatedForm.append("title", formData.title);
            updatedForm.append("artist_id", formData.artist_id);
            if (formData.image instanceof File) {
                updatedForm.append("image", formData.image);
            }

            await updateAlbum(id, updatedForm);
            alert("Cập nhật album thành công!");
            navigate("/admin/album");
        } catch (err) {
            console.error("Lỗi khi cập nhật:", err);
            alert("Không thể cập nhật album.");
        }
    };

    if (!album) return <div className="text-white">Đang tải...</div>;

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
                        icon={faCheck}
                        title="Lưu"
                        color="spotifyGreen"
                        textHover="white"
                        onClick={handleSave}
                    />
                </div>
            </div>

            <form className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
                <h1 className="font-bold text-xl">Cập nhật thông tin album</h1>
                <div className="w-full h-px bg-spotifyGray"></div>

                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img
                            src={
                                formData.image instanceof File
                                    ? URL.createObjectURL(formData.image)
                                    : formData.image || thumbnail
                            }
                            alt="Ảnh bìa"
                            className="h-56 w-56"
                        />
                        <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" onChange={handleFileChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                            <span className="transition-all duration-300 text-spotifyGray group-hover:text-white pointer-events-none">Chọn ảnh bìa</span>
                        </div>
                    </div>

                    <div className="w-[78%]">
                        <div className="w-full px-6 mb-2">
                            <label className="block text-sm font-medium mb-1">Tên album</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="bg-black w-full h-10 px-3 border border-spotifyGray rounded-sm text-white"
                                placeholder="Nhập tên album"
                            />
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label className="block text-sm font-medium mb-1">Tên nghệ sĩ (Không sửa nghệ sĩ)</label>
                            <select
                                disabled
                                name="artist_id"
                                value={formData.artist_id}
                                onChange={handleChange}
                                className="bg-black w-full h-10 px-3 border border-spotifyGray rounded-sm text-white"
                            >
                                <option value="">{`- ${currentArtistName || "Chọn nghệ sĩ"} -`}</option>
                                {artists.map((artist) => (
                                    <option key={artist.artist_id} value={artist.id}>
                                        {artist.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AlbumUpdate;