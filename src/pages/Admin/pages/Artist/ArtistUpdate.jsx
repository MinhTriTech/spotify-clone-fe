import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { InputCombo, ButtonAdmin } from "../../components";
import thumbnail from "../../../../../public/images/artist.png";
import { fetchArtistById, updateArtist } from "../../../../services_admin/artist";

const ArtistUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [artist, setArtist] = useState({ name: "", bio: "", image: null });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const loadArtist = async () => {
            try {
                const data = await fetchArtistById(id);
                setArtist({ name: data.name, bio: data.bio, image: null });
                setPreviewImage(data.image || thumbnail);
            } catch (error) {
                console.error("Lỗi khi tải nghệ sĩ:", error);
            }
        };
        loadArtist();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtist((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArtist((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", artist.name);
        formData.append("bio", artist.bio);
        if (artist.image) formData.append("image", artist.image);
    
        try {
            await updateArtist(id, formData);
            alert("Cập nhật thành công!");
            navigate("/admin/artist");
        } catch (err) {
            alert("Cập nhật thất bại!");
            console.error(err);
        }
    };

    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/artist" className="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách nghệ sĩ
                    </Link>
                </div>
                <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <ButtonAdmin onClick={handleSubmit} icon={faCheck} title="Lưu" color="spotifyGreen" textHover="white" />
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Cập nhật thông tin nghệ sĩ</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={previewImage || thumbnail} alt="ảnh đại diện" className="h-56 w-56 object-cover" />
                        <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
                            <span className="text-spotifyGray group-hover:text-white pointer-events-none">Chọn ảnh đại diện</span>
                        </div>
                    </div>
                    <div className="w-[78%]">
                        <InputCombo
                            type="text"
                            placeholder="Nhập tên nghệ sĩ"
                            label="Tên nghệ sĩ"
                            name="name"
                            value={artist.name}
                            onChange={handleChange}
                        />
                        <div className="w-full px-6">
                            <label htmlFor="bio">Tiểu sử</label>
                            <textarea
                                className="resize-none bg-black mt-2 w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tiểu sử"
                                name="bio"
                                value={artist.bio}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ArtistUpdate;
