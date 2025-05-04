import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DashboardItem = ({ icon, title, number }) => {
    return (
        <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="flex justify-center items-center gap-4 px-4 py-4 font-gilroy rounded-md bg-black w-[20%] h-full">
            <FontAwesomeIcon icon={icon} className="w-10 h-10" />
            <div>
                <p className="text-sm text-center">{title}</p>
                <p className="text-4xl text-white text-center">{number}</p>
            </div>
        </div>
    );
};
export default DashboardItem;
