import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { SongTable } from "../Song";
import { ButtonAdmin } from "../../components";
const Song = () => {
    return (
        <div>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black w-full h-fit px-4 py-4 font-gilroy rounded-md">
                <h1 className="text-2xl mb-2 font-bold text-white">QUẢN LÝ BÀI HÁT</h1>
                <div className="relative w-full flex items-center text-sm">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-solid fa-magnifying-glass absolute left-3 top-3 w-4 h-4 text-gray-500 cursor-pointer" />
                    <input id="pd-input" type="text" placeholder="Tìm kiếm theo tên bài hát, loại nội dung bài hát" class="w-[40%] h-10 pl-10 pr-4 py-2 border bg-black border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    <ButtonAdmin path="/admin/song/create" color="spotifyGreen" textHover="white" icon={faPlus} title="Thêm bài hát" />
                </div>
            </div>

            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black w-full h-screen font-gilroy mt-4 mb-4 rounded-md shadow-lg flex justify-center px-4 py-4">
                <div className="container w-full ">
                    <div id="pd-container" className="bg-black shadow-md overflow-hidden w-full">
                        <SongTable />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Song;
