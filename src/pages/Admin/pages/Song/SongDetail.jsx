import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo, ButtonAdmin } from "../../components";
const SongDetail = () => {
    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div class="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/song" class="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách bài hát
                    </Link>
                </div>
                <div class="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <ButtonAdmin icon={faXmark} title="Xóa" color="red-500" textHover="white" />
                    <ButtonAdmin path="/admin/song/update" icon={faPenToSquare} title="Cập nhật" color="spotifyGreen" textHover="white" />
                </div>
            </div>

            <form action="" method="" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} id="at-form-create" className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Thông tin bài hát</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                <div className="w-full h-fit flex py-4">
                    <div className="w-[22%]">
                        <img src={thumbnail} alt="ảnh đại diện" className="h-56 w-56" />
                        <div class="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-center transition-all duration-300 hover:text-white hover:bg-spotifyGreen group">
                            <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                            <span class=" transition-all duration-300 text-spotifyGray group-hover:text-white pointer-events-none">Chọn ảnh bìa</span>
                        </div>
                    </div>
                    <div className="w-[78%]">
                        <InputCombo type="text" placeholder="Nhập tên bài hát" label="Tên bài hát" name="name" />

                        <InputCombo type="text" label="Đường dẫn bài hát" name="file_path" value="https://abc.com/baidem.mp3" />

                        <InputCombo type="text" label="Đường dẫn video" name="file_path" value="https://abc.com" />

                        <InputCombo type="text" label="Loại nội dung bài hát" name="content_type" value="mp3" />

                        <InputCombo type="text" label="Thuộc album" name="content_type" value="abc" />
                    </div>
                </div>
            </form>
        </>
    );
};

export default SongDetail;
