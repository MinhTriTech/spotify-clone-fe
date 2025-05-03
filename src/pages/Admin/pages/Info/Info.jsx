import { faRightFromBracket, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { InputCombo, ButtonAdmin } from "../../components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/store";
import { handleLogout } from "../../../../store/slices/auth";
import { logout } from "../../../../services/auth";
import { useSelector } from "react-redux";
const InfoUser = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user?.user_info);
    const userId = user?.id;
    const userEmail = user?.email;
    const userUsername = user?.username;
    console.log("USER: ", userId + userEmail + userUsername);

    const Logout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Lỗi khi logout:", error);
        } finally {
            await dispatch(handleLogout()).unwrap();
            navigate("/admin/login");
        }
    };

    return (
        <div>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black w-full h-fit px-4 py-4 font-gilroy rounded-md">
                <h1 className="text-2xl mb-2 font-bold text-white">TÀI KHOẢN</h1>
                <div className="h-px bg-spotifyGray"></div>
                <div className="w-full h-fit px-8 pt-8 flex justify-start items-center">
                    <div className="ml-3 h-16 w-16 bg-violet-400 border-2 border-white rounded-full flex justify-center items-center">
                        <span className="text-white text-3xl">T</span>
                    </div>
                    <div className="text-white ml-4">
                        <p className="text-xl">{userUsername}</p>
                        <p className="text-sm">{user?.is_staff ? "Người quản trị" : "Người dùng thông thường"}</p>
                    </div>
                    <div className="ml-auto mr-6">
                        {/* <ButtonAdmin icon={faPenToSquare} color="spotifyLightBlack" textHover="white" title="Chỉnh sửa hồ sơ" /> */}
                        <ButtonAdmin icon={faRightFromBracket} color="spotifyGreen" textHover="white" title="Đăng xuất" onClick={Logout} />
                    </div>
                </div>
                <div className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                    <div className="w-full h-fit flex py-4">
                        <div className="w-[50%]">
                            {/* <InputCombo type="text" placeholder="Nhập tên Họ của bạn" label="Họ" name="first_name" value="haha" /> */}
                            <InputCombo type="text" placeholder="Nhập username" label="Username" name="username" value={userUsername || ""} />
                            {/* <InputCombo type="text" placeholder="Phân loại" label="Phân loại" name="email" value="Admin" /> */}
                        </div>
                        <div className="w-[50%]">
                            <InputCombo type="text" placeholder="Nhập email" label="Email" name="email" value={userEmail || ""} />

                            {/* <InputCombo type="text" placeholder="Nhập Tên của bạn" label="Tên" name="last_name" value="ádkjaskdlasd" />
                            <InputCombo type="password" placeholder="Nhập mật khẩu" label="Mật khẩu" name="password" value="012344562412" />
                            <InputCombo type="text" placeholder="Nhập mật khẩu" label="Trạng thái" name="password" value="Đang hoạt động" />
                            <InputCombo type="text" placeholder="Nhập mật khẩu" label="Superuser" name="password" value="Phải" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoUser;
