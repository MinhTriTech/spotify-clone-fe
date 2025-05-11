import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo } from "../../components";

//import thêm
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addArtist } from "../../../../services_admin/artist";

const ArtistCreate = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("bio", bio);
            formData.append("image", image); // Gửi file ảnh thực sự
    
            await addArtist(formData); // Gửi FormData đến backend
            alert("Thêm nghệ sĩ thành công!");
            navigate("/admin/artist");
        } catch (error) {
            console.error(error);
            alert("Thêm nghệ sĩ thất bại!");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Lưu file ảnh thực sự vào state
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
                    <button type="submit" form="at-form-create" className="w-[11%] 2xl:w-[7%] px-4 py-2 ml-4 bg-black border border-spotifyGreen text-spotifyGreen font-gilroy rounded-sm cursor-pointer hover:bg-spotifyGreen hover:text-white text-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Lưu
                    </button>
                </div>
            </div>

            <form
                id="at-form-create"
                onSubmit={handleSubmit}
                style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}
                className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black"
            >
                <h1 className="font-bold text-xl">Thông tin nghệ sĩ</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={image || thumbnail} alt="Ảnh đại diện" className="h-56 w-56 object-cover" />
                        <div className="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
                            <span className="transition-all duration-300 text-spotifyGray group-hover:text-white pointer-events-none">Chọn ảnh đại diện</span>
                        </div>
                    </div>
                    <div className="w-[78%]">
                        <InputCombo
                            type="text"
                            placeholder="Nhập tên nghệ sĩ"
                            label="Tên nghệ sĩ"
                            name="artist"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="w-full px-6 mt-4">
                            <label htmlFor="bio">Tiểu sử</label>
                            <textarea
                                className="resize-none bg-black mt-2 w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Nhập tiểu sử"
                                name="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ArtistCreate;
