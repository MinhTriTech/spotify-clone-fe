import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ButtonAdmin = ({ path, icon, color, textHover, title, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick(); // Gọi hàm được truyền vào nếu có
        } else if (path) {
            navigate(path); // Điều hướng nếu có path
        }
    };

    return (
        <button
            onClick={handleClick}
            type="button"
            className={`w-fit h-10 px-4 py-2 ml-4 bg-black border border-${color} text-${color} font-gilroy rounded-sm cursor-pointer hover:bg-${color} hover:text-${textHover} text-center`}
        >
            <FontAwesomeIcon icon={icon} className="mr-2" />
            {title}
        </button>
    );
};

export default ButtonAdmin;
