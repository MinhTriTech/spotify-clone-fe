import { useNavigate } from "react-router-dom";
const UserTable = () => {
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate("/admin/user/detail");
    };

    return (
        <div className="bg-black overflow-auto max-h-[calc(100vh-250px)] px-1 py-1 shadow-md rounded-lg">
            <table className="bg-black border border-spotifyGray rounded-sm text-white table-auto w-full border-collapse text-sm">
                <thead class="bg-spotifyGreen sticky top-0 z-10 shadow-md">
                    <tr class="text-left text-white h-12">
                        <th class="p-4 text-center">ID</th>
                        <th class="p-4">Username</th>
                        <th class="p-4">Họ và tên</th>
                        <th class="p-4">email</th>
                        <th class="p-4 text-center">Trạng thái</th>
                        <th class="p-4 text-center">Quyền</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 cursor-pointer">
                    <tr onClick={handleRowClick} class="transition-all duration-300  hover:bg-gray-900 h-16 group">
                        <td class="p-4 text-center">1</td>
                        <td class="p-4">haha</td>
                        <td class="p-4 text-violet-500 group-hover:underline">HAITHUHIEU</td>
                        <td class="p-4">ai biết đại đại đi</td>
                        <td class="p-4 text-center">1</td>
                        <th class="p-4 text-center">0</th>
                    </tr>
                    <tr onClick={handleRowClick} class="hover:bg-gray-900 h-16 group">
                        <td class="p-4 text-center">2</td>
                        <td class="p-4">Dai12312312312</td>
                        <td class="p-4 text-violet-500 group-hover:underline">HAITHUHIEU</td>
                        <td class="p-4">ai biết đại đại đi</td>
                        <td class="p-4 text-center">1</td>
                        <th class="p-4 text-center">0</th>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default UserTable;
