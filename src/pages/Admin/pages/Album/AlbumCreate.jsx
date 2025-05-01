import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo } from "../../components";
import { addAlbum } from "../../../../services_admin/album";
import { fetchArtists } from "../../../../services_admin/artist";

const AlbumCreate = () => {
    const [name, setName] = useState("");
    const [artist, setArtist] = useState("");
    const [image, setImage] = useState(null);
    const [artistList, setArtistList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loadArtists = async () => {
            try {
                const response = await fetchArtists();
                setArtistList(response);
            } catch (error) {
                console.error("Lỗi khi tải danh sách nghệ sĩ:", error);
            }
        };
        loadArtists();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", name);
        formData.append("artist_id", artist);
        if (image) formData.append("image", image);

        try {
            await addAlbum(formData);
            alert("Tạo album thành công!");
            navigate("/admin/album");
        } catch (err) {
            alert("Có lỗi khi tạo album.");
            console.error(err);
        }
    };

    return (
        <>
            {/* Header */}
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/album" className="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách album
                    </Link>
                </div>
                <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <button
                        type="submit"
                        form="at-form-create"
                        className="w-[11%] 2xl:w-[7%] px-4 py-2 ml-4 bg-black border border-spotifyGreen text-spotifyGreen font-gilroy rounded-sm cursor-pointer hover:bg-spotifyGreen hover:text-white text-center"
                    >
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Lưu
                    </button>
                </div>
            </div>

            {/* Form */}
            <form
                id="at-form-create"
                onSubmit={handleSubmit}
                style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}
                className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black"
            >
                <h1 className="font-bold text-xl">Thông tin album</h1>
                <div className="w-full h-px bg-spotifyGray"></div>

                <div className="w-full h-fit flex py-4">
                    {/* Ảnh thumbnail */}
                    <div className="w-[22%]">
                        <img src={image ? URL.createObjectURL(image) : thumbnail} alt="ảnh đại diện" className="h-56 w-56 object-cover" />
                        <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <span className="transition-all duration-300 text-spotifyGray group-hover:text-white pointer-events-none">
                                Chọn ảnh bìa
                            </span>
                        </div>
                    </div>

                    {/* Tên + nghệ sĩ */}
                    <div className="w-[78%]">
                        <InputCombo
                            type="text"
                            placeholder="Nhập tên album"
                            label="Tên album"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className="w-full px-6 mb-2">
                            <label htmlFor="artist">Tên nghệ sĩ</label>
                            <select
                                name="artist"
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                                className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none"
                            >
                                <option value="" disabled>- Chọn nghệ sĩ -</option>
                                {artistList.map((artistItem) => (
                                    <option key={artistItem.artist_id} value={artistItem.artist_id}>
                                        {artistItem.name}
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

export default AlbumCreate;


