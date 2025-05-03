import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ButtonAdmin = ({ path, icon, color, textHover, title, onClick }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if (onClick) onClick();
        else if (path) navigate(path);
    };

    return (
        <button onClick={handleClick} class={`w-fit h-10  px-4 py-2 ml-4 bg-black border border-${color} text-${color} font-gilroy rounded-sm cursor-pointer hover:bg-${color} hover:text-${textHover} text-center`}>
            <FontAwesomeIcon icon={icon} className="mr-2" />
            {title}
        </button>
    );
};

export default ButtonAdmin;
