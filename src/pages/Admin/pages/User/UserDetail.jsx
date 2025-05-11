import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { fetchUser, deleteUser } from "../../../../services_admin/user";
import { ButtonAdmin } from "../../components";
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await fetchUser(id);
                setUser(data);
            } catch (error) {
                console.error("Lỗi lấy thông tin người dùng:", error);
            }
        };
        getUser();
    }, [id]);

    const handleDelete = async () => {
        const confirm = window.confirm("Bạn có chắc chắn muốn vô hiệu hóa người dùng này không?");
        if (!confirm) return;
    
        try {
          const res = await deleteUser(id);
          alert(res.message); // Hoặc dùng Swal.fire()
          navigate("/admin/user");
        } catch (error) {
          alert("Xóa thất bại: " + (error.response?.data?.error || error.message));
        }
      };

    if (!user) return <div className="text-white p-8">Đang tải thông tin người dùng...</div>;

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
                    <ButtonAdmin icon={faXmark} title="Đình chỉ" color="red-500" textHover="white" onClick={handleDelete}/>
                    <ButtonAdmin path={`/admin/user/${id}/update`} icon={faPenToSquare} title="Cập nhật" color="spotifyGreen" textHover="white" />
                </div>
            </div>

            <div className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
                <h1 className="font-bold text-xl w-full">Thông tin người dùng</h1>
                <div className="w-full h-px bg-spotifyGray"></div>
                <div className="w-full flex py-4">
                    <div className="w-[50%] space-y-4 px-6">
                        <InfoLine label="Họ" value={user.first_name || "undefined"} />
                        <InfoLine label="Tên đăng nhập" value={user.username} />
                        <InfoLine label="Email" value={user.email} />
                        <InfoLine label="Phân loại" value={user.is_staff ? "Admin" : "Người dùng"} />
                    </div>
                    <div className="w-[50%] space-y-4 px-6">
                        <InfoLine label="Tên" value={user.last_name || "undefined"} />
                        <InfoLine label="Trạng thái" value={user.is_active ? "Đang hoạt động" : "Không hoạt động"} />
                        <InfoLine label="Superuser" value={user.is_superuser ? "Có" : "Không"} />
                    </div>
                </div>
            </div>
        </>
    );
};

// Component phụ để hiển thị từng dòng thông tin
const InfoLine = ({ label, value }) => (
    <div className="mb-2">
        <label className="block text-sm text-spotifyGray">{label}</label>
        <div className="bg-black border border-spotifyGray rounded-sm px-3 py-2 mt-1">{value}</div>
    </div>
);

export default UserDetail;
