import logo from "../../../../public/images/logoSpotify.svg";
import { faHouse, faMusic, faUser, faUserShield, faFileAudio, faImages, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { SidebarItem } from "../components";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
    return (
        <div className="bg-black w-[20%] h-screen px-8 flex flex-col justify-between items-center">
            <div className="w-full flex flex-col items-center">
                <img src={logo} alt="logo" className="h-20 scale-150 cursor-pointer" />
                <SidebarItem url="/admin" icon={faHouse} text="Trang chủ" />
                <SidebarItem url="/admin/artist" icon={faIdBadge} text="Nghệ sĩ" />
                <SidebarItem url="/admin/album" icon={faImages} text="Albums" />
                <SidebarItem url="/admin/song" icon={faMusic} text="Bài hát" />
                <SidebarItem url="/admin/playlist" icon={faFileAudio} text="Danh sách phát" />
                <SidebarItem url="/admin/user" icon={faUser} text="Quản lý người dùng" />
                <SidebarItem url="/admin/role" icon={faUserShield} text="Quản lý quyền" />
            </div>

            <NavLink
                to="/admin/info"
                className={({ isActive }) =>
                    `cursor-pointer mt-4 rounded-sm w-full h-fit px-4 py-4 transition-all duration-300 
                 hover:bg-spotifyGreen hover:text-white hover:scale-105 no-underline hover:no-underline
                ${isActive ? "bg-spotifyGreen text-white" : ""}`
                }
            >
                <div className="w-full flex items-center">
                    <div className="h-8 w-8 rounded-full bg-violet-400 border border-white flex justify-center items-center text-white">T</div>
                    <span className="ml-4 text-base">Dailata123@</span>
                </div>
            </NavLink>
        </div>
    );
};

export default Sidebar;
