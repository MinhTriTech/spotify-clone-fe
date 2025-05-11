import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { UserTable } from "../User";
import { ButtonAdmin } from "../../components";

const User = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black w-full h-fit px-4 py-4 font-gilroy rounded-md">
                <h1 className="text-2xl mb-2 font-bold text-white">QUẢN LÝ NGƯỜI DÙNG</h1>
                <div className="relative w-full flex items-center text-sm">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="absolute left-3 top-3 w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={() => {
                            // Có thể trigger tìm kiếm ở đây nếu muốn
                        }}
                    />
                    <input
                        id="pd-input"
                        type="text"
                        placeholder="Tìm kiếm theo username, Họ và tên, trạng thái"
                        className="w-[40%] h-10 pl-10 pr-4 py-2 border bg-black border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ButtonAdmin path="/admin/user/create" color="spotifyGreen" textHover="white" icon={faPlus} title="Thêm người dùng" />
                </div>
            </div>

            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black w-full h-screen font-gilroy mt-4 mb-4 rounded-md shadow-lg flex justify-center px-4 py-4">
                <div className="container w-full">
                    <div id="pd-container" className="bg-black shadow-md overflow-hidden w-full">
                        <UserTable searchTerm={searchTerm} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;

