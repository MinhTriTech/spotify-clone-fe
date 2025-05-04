import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllUsers, searchUser } from "../../../../services_admin/user";

const UserTable = ({ searchTerm }) => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const pageSize = 6;

    // Debounce input
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1); // Reset về trang đầu khi người dùng gõ
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // Load data khi page hoặc debouncedSearch thay đổi
    useEffect(() => {
        if (debouncedSearch.trim() === "") {
            fetchData(page);
        } else {
            handleSearch(debouncedSearch, page);
        }
    }, [debouncedSearch, page]);

    const fetchData = async (page) => {
        try {
            const data = await fetchAllUsers(page, pageSize);
            setUsers(data.results);
            setTotalPages(Math.ceil(data.count / pageSize));
        } catch (error) {
            console.error("Lỗi khi lấy danh sách user:", error);
        }
    };

    const handleSearch = async (keyword, page) => {
        try {
            const data = await searchUser(keyword, page, pageSize); // Gửi thêm page và pageSize
            setUsers(data.results);
            setTotalPages(Math.ceil(data.count / pageSize));
        } catch (error) {
            console.error("Lỗi khi tìm kiếm user:", error);
        }
    };

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
                        <th className="p-4 text-center">ID</th>
                        <th className="p-4">Username</th>
                        <th className="p-4">Email</th>
                        <th className="p-4 text-center">Trạng thái</th>
                        <th className="p-4 text-center">Quyền</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 cursor-pointer">
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            onClick={() => handleRowClick(user.id)}
                            className="transition-all duration-300 hover:bg-gray-900 h-16 group"
                        >
                            <td className="p-4 text-center">{user.id}</td>
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
                </tbody>
            </table>

            {/* Phân trang */}
            <div className="flex justify-center mt-4 gap-2 text-white">
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                    ◀
                </button>
                <span>Trang {page} / {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                    ▶
                </button>
            </div>
        </div>
    );
};

export default UserTable;
