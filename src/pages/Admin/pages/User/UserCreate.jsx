import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { InputCombo } from "../../components";
const UserCreate = () => {
    return (
        <>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div class="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/user" class="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách người dùng
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
                <h1 className="font-bold text-xl">Thông tin người dùng</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                <div className="w-full h-fit flex py-4">
                    <div className="w-[50%]">
                        <InputCombo type="text" placeholder="Nhập tên Họ của bạn" label="Họ" name="first_name" />
                        <InputCombo type="text" placeholder="Nhập username" label="Username" name="username" />
                        <InputCombo type="text" placeholder="Nhập email" label="Email" name="email" />
                        <div className="w-full px-6 mb-2">
                            <label for="artist">Phân loại</label>
                            <select name="artist" class="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled selected>
                                    - Chọn trạng thái -
                                </option>
                                <option value="0">Người dùng</option>
                                <option value="1">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <InputCombo type="text" placeholder="Nhập Tên của bạn" label="Tên" name="last_name" />
                        <InputCombo type="password" placeholder="Nhập mật khẩu" label="Mật khẩu" name="password" />
                        <div className="w-full px-6 mb-2">
                            <label for="artist">Trạng thái</label>
                            <select name="artist" class="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled selected>
                                    - Chọn trạng thái -
                                </option>
                                <option value="0">Không hoạt động</option>
                                <option value="1">Đang hoạt động</option>
                            </select>
                        </div>
                        <div className="w-full px-6 mb-2">
                            <label for="artist">Superuser</label>
                            <select name="artist" class="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled selected>
                                    - Chọn trạng thái -
                                </option>
                                <option value="0">Phải</option>
                                <option value="1">Không</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default UserCreate;
