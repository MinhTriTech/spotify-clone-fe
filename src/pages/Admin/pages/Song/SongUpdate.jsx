import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { InputCombo } from "../../components";
const SongUpdate = () => {
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
                    <button type="submit" form="at-form-create" class="w-[11%] 2xl:w-[7%] px-4 py-2 ml-4 bg-black border border-spotifyGreen text-spotifyGreen font-gilroy rounded-sm cursor-pointer hover:bg-spotifyGreen hover:text-white text-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Lưu
                    </button>
                </div>
            </div>

            <form action="" method="" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} id="at-form-create" className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Cập nhật thông tin bài hát</h1>
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

                        <div className="w-full px-6 mb-2">
                            <label for="file_path">Đường dẫn bài hát</label>
                            <div class="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-start transition-all duration-300 ">
                                <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                <span class=" text-spotifyGray pointer-events-none">Chọn đường dẫn</span>
                            </div>
                        </div>

                        <div className="w-full px-6 mb-2">
                            <label for="file_path">Đường dẫn video</label>
                            <div class="relative bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm overflow-hidden flex items-center justify-start transition-all duration-300 ">
                                <input type="file" class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                                <span class=" text-spotifyGray pointer-events-none">Chọn đường dẫn</span>
                            </div>
                        </div>

                        <InputCombo type="text" placeholder="Nhập loại nội dung bài hát" label="Loại nội dung bài hát" name="content_type" />
                        <div className="w-full px-6 mb-2">
                            <label for="artist">Thuộc Album</label>
                            <select name="artist" class="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled selected>
                                    - Chọn album -
                                </option>
                                <option value="0">abc</option>
                                <option value="1">cde</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default SongUpdate;
