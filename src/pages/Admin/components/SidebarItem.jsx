import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
const SidebarItem = ({ url, icon, text }) => {
    return (
        <NavLink
            to={url}
            end={url === "/admin"}
            className={({ isActive }) =>
                `cursor-pointer mt-4 rounded-sm w-full h-fit px-4 py-4 transition-all duration-300 
                 hover:bg-spotifyGreen hover:text-white hover:scale-105 no-underline hover:no-underline
                ${isActive ? "bg-spotifyGreen text-white" : ""}`
            }
        >
            <FontAwesomeIcon icon={icon} />
            <span className="ml-4">{text}</span>
        </NavLink>
    );
};
export default SidebarItem;
