import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUser } from "../../../../services_admin/user";

const UserTable = ({ searchTerm }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();
  const pageSize = 6;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset về trang đầu khi có từ khóa mới
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Gọi API mỗi khi debouncedSearch hoặc page thay đổi
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await searchUser(debouncedSearch, page, pageSize);
        setUsers(data.results);
        setTotalPages(Math.ceil(data.count / pageSize));
      } catch (error) {
        console.error("Lỗi khi tải người dùng:", error);
      }
    };

    fetchUsers();
  }, [debouncedSearch, page]);

  const handleRowClick = (userId) => {
    navigate(`/admin/user/${userId}/detail`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="bg-black overflow-auto max-h-[calc(100vh-250px)] px-1 py-1 shadow-md rounded-lg">
      <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
        <thead className="bg-spotifyGreen sticky top-0 z-10 shadow-md">
          <tr className="text-left text-white h-12">
            <th className="p-4 text-center">STT</th>
            <th className="p-4">Tên người dùng</th>
            <th className="p-4">Email</th>
            <th className="p-4 text-center">Trạng thái</th>
            <th className="p-4 text-center">Quyền</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 cursor-pointer">
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="transition-all duration-300 hover:bg-gray-900 h-16"
              onClick={() => handleRowClick(user.id)}
            >
              <td className="p-4 text-center">{(page - 1) * pageSize + index + 1}</td>
              <td className="p-4">{user.username}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4 text-center">
                {user.is_active ? "Hoạt động" : "Vô hiệu hóa"}
              </td>
              <td className="p-4 text-center">
                {user.is_staff ? "Admin" : "Người dùng"}
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center p-5">
                Không có người dùng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Phân trang */}
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-spotifyGreen hover:bg-green-600"} text-white`}
            >
                Previous
            </button>
            <span className="text-white">
                Page {page} of {totalPages}
            </span>
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-md ${page === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-spotifyGreen hover:bg-green-600"} text-white`}
            >
                Next
            </button>
        </div>
    </div>
  );
};

export default UserTable;
