import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faCheck, faRedo } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InputCombo, ButtonAdmin } from "../../components";
import { fetchUser, updateUser } from "../../../../services_admin/user";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    is_staff: 0,
    is_active: 1,
    is_superuser: 0,
  });

  const [resetPassword, setResetPassword] = useState(false); // theo dõi trạng thái reset

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUser(id);
        setFormData({
          ...user,
          is_staff: user.is_staff ? 1 : 0,
          is_active: user.is_active ? 1 : 0,
          is_superuser: user.is_superuser ? 1 : 0,
        });
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
      }
    };
    loadUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["is_staff", "is_active", "is_superuser"].includes(name) ? parseInt(value) : value,
    }));
  };

  const handleResetPassword = () => {
    setResetPassword(true);
  };

  const handleSave = async () => {
    try {
      const updateData = { ...formData };
      if (resetPassword) {
        updateData.password = "12345678";
      }

      await updateUser(id, updateData);
      alert("Cập nhật thành công");
      navigate("/admin/user");
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Cập nhật thất bại");
    }
  };

  return (
    <>
      <div className="bg-black h-fit w-full flex px-3 py-3" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
        <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
          <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
          <Link to="/admin/user" className="ml-2 text-base text-spotifyGray group-hover:underline">
            Quay lại danh sách người dùng
          </Link>
        </div>
        <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm">
          <ButtonAdmin icon={faCheck} title="Lưu" color="spotifyGreen" textHover="white" onClick={handleSave} />
        </div>
      </div>

      <form className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
        <h1 className="font-bold text-xl">Cập nhật thông tin người dùng</h1>
        <div className="w-full h-px bg-spotifyGray"></div>
        <div className="w-full h-fit flex py-4">
          <div className="w-[50%]">
            <InputCombo label="Họ" name="first_name" value={formData.first_name || ""} onChange={handleChange} />
            <InputCombo label="Username" name="username" value={formData.username || ""} onChange={handleChange} />
            <InputCombo label="Email" name="email" value={formData.email || ""} onChange={handleChange} />
            <div className="w-full px-6 mb-2">
              <label>Phân loại</label>
              <select name="is_staff" value={formData.is_staff} onChange={handleChange}
                className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="0">Người dùng</option>
                <option value="1">Admin</option>
              </select>
            </div>
          </div>
          <div className="w-[50%]">
            <InputCombo label="Tên" name="last_name" value={formData.last_name || ""} onChange={handleChange} />

            <div className="w-full px-6 mb-4">
              <label className="block mb-2">Mật khẩu</label>
              <div className="flex items-center">
                <input
                  type="text"
                  className="bg-black w-full h-10 pl-3 pr-4 border border-spotifyGray rounded-sm text-white"
                  value={resetPassword ? "12345678" : "••••••••"}
                  disabled
                />
                <button
                  type="button"
                  className="ml-3 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
                  onClick={handleResetPassword}
                >
                  
                  Reset 
                </button>
              </div>
            </div>

            <div className="w-full px-6 mb-2">
              <label>Trạng thái</label>
              <select name="is_active" value={formData.is_active} onChange={handleChange}
                className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="0">Không hoạt động</option>
                <option value="1">Đang hoạt động</option>
              </select>
            </div>
            <div className="w-full px-6 mb-2">
              <label>Superuser</label>
              <select name="is_superuser" value={formData.is_superuser} onChange={handleChange}
                className="bg-black mt-2 w-full h-10 pl-3 pr-4 py-2 border border-spotifyGray rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="0">Không</option>
                <option value="1">Phải</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserUpdate;
