import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo, ButtonAdmin } from "../../components";

const ArtistDetail = () => {
    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div class="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/artist" class="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách nghệ sĩ
                    </Link>
                </div>

                <div class="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <ButtonAdmin icon={faXmark} title="Xóa" color="red-500" textHover="white" />
                    <ButtonAdmin path="/admin/artist/update" icon={faPenToSquare} title="Cập nhật" color="spotifyGreen" textHover="white" />
                </div>
            </div>

            <form action="" method="" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} id="at-form-create" className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Thông tin nghệ sĩ</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={thumbnail} alt="ảnh đại diện" className="h-56 w-56" />
                        <div class="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                            <span class=" transition-all duration-300 text-spotifyGray group-hover:text-white pointer-events-none">Chọn ảnh đại diện</span>
                        </div>
                    </div>
                    <div className="w-[78%]">
                        <InputCombo type="text" placeholder="Nhập tên nghệ sĩ" label="Tên nghệ sĩ" name="artist" value="HAITHUHIEU" />
                        <div class="w-full px-6">
                            <label for="name">Tiểu sử</label>
                            <textarea class="resize-none bg-black mt-2 w-full h-40 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Nhập tên sản phẩm" name="name" value="ai mà biết" />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ArtistDetail;
