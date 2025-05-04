import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { InputCombo } from "../../components";
import { useState } from "react";
import { addUser } from "../../../../services_admin/user";
const UserCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        is_staff: "",      // 0 hoặc 1
        is_active: "",     // 0 hoặc 1
        is_superuser: "",  // 0 hoặc 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ["is_staff", "is_active", "is_superuser"].includes(name)
                ? parseInt(value)
                : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser(formData);
            alert("Tạo người dùng thành công!");
            navigate("/admin/user");
        } catch (error) {
            console.error("Lỗi khi tạo người dùng:", error);
            alert("Tạo người dùng thất bại!");
        }
    };

    return (
        <>
            {/* Thanh điều hướng */}
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
                <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
                    <Link to="/admin/user" className="ml-2 text-base text-spotifyGray group-hover:underline">
                        Quay lại danh sách người dùng
                    </Link>
                </div>
                <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
                    <button type="submit" form="at-form-create" className="w-[11%] 2xl:w-[7%] px-4 py-2 ml-4 bg-black border border-spotifyGreen text-spotifyGreen font-gilroy rounded-sm cursor-pointer hover:bg-spotifyGreen hover:text-white text-center">
                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                        Lưu
                    </button>
                </div>
            </div>

            {/* Form nhập liệu */}
            <form onSubmit={handleSubmit} id="at-form-create" className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
                <h1 className="font-bold text-xl">Thông tin người dùng</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                <div className="w-full h-fit flex py-4">
                    <div className="w-[50%]">
                        <InputCombo type="text" placeholder="Nhập họ" label="Họ" name="first_name" value={formData.first_name} onChange={handleChange} />
                        <InputCombo type="text" placeholder="Nhập username" label="Username" name="username" value={formData.username} onChange={handleChange} />
                        <InputCombo type="email" placeholder="Nhập email" label="Email" name="email" value={formData.email} onChange={handleChange} />
                        <div className="w-full px-6 mb-2">
                            <label>Phân loại</label>
                            <select name="is_staff" value={formData.is_staff} onChange={handleChange} className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled>- Chọn vai trò -</option>
                                <option value={0}>Người dùng</option>
                                <option value={1}>Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-[50%]">
                        <InputCombo type="text" placeholder="Nhập tên" label="Tên" name="last_name" value={formData.last_name} onChange={handleChange} />
                        <InputCombo type="password" placeholder="Nhập mật khẩu" label="Mật khẩu" name="password" value={formData.password} onChange={handleChange} />
                        <div className="w-full px-6 mb-2">
                            <label>Trạng thái</label>
                            <select name="is_active" value={formData.is_active} onChange={handleChange} className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled>- Chọn trạng thái -</option>
                                <option value={1}>Đang hoạt động</option>
                                <option value={0}>Không hoạt động</option>
                            </select>
                        </div>
                        <div className="w-full px-6 mb-2">
                            <label>Superuser</label>
                            <select name="is_superuser" value={formData.is_superuser} onChange={handleChange} className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                <option value="" disabled>- Chọn quyền -</option>
                                <option value={1}>Có</option>
                                <option value={0}>Không</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default UserCreate;
