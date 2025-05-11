import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { PlaylistTable } from "../Playlist";
import { ButtonAdmin } from "../../components";
import { useState, useEffect } from "react";
import { fetchPlaylists } from "../../../../services_admin/playlist";

const Playlist = () => {
    const PAGESIZE = 6;
    const [searchQuery, setSearchQuery] = useState(""); // Lưu trữ giá trị tìm kiếm
    const [playlists, setPlaylists] = useState([]); // Lưu trữ danh sách phát
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang

    // Tải danh sách phát khi component mount hoặc khi thay đổi trang/query
    useEffect(() => {
        const loadPlaylists = async () => {
            try {
                const params = searchQuery.trim() ? { title: searchQuery, page: currentPage } : { page: currentPage };
                const data = await fetchPlaylists(params);
                const playlistList = Array.isArray(data.results) ? data.results : [];
                setPlaylists(playlistList);
                setTotalPages(data.count ? Math.ceil(data.count / PAGESIZE) : 1); // Tính tổng số trang
            } catch (error) {
                console.error("Error loading playlists:", error);
                setPlaylists([]);
                setTotalPages(1);
            }
        };
        loadPlaylists();
    }, [currentPage, searchQuery]);

    // Hàm xử lý tìm kiếm
    const handleSearch = async () => {
        setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
    };

    // Hàm xử lý khi nhấn Enter trong input
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    // Hàm chuyển đến trang trước
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Hàm chuyển đến trang tiếp theo
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black w-full h-fit px-4 py-4 font-gilroy rounded-md">
                <h1 className="text-2xl mb-2 font-bold text-white">QUẢN LÝ DANH SÁCH PHÁT</h1>
                <div className="relative w-full flex items-center text-sm">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-solid fa-magnifying-glass absolute left-3 top-3 w-4 h-4 text-gray-500 cursor-pointer" onClick={handleSearch} />
                    <input id="pd-input" type="text" placeholder="Tìm kiếm theo tên danh sách phát" className="w-[40%] h-10 pl-10 pr-4 py-2 border bg-black border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} />
                    <ButtonAdmin path="/admin/playlist/create" color="spotifyGreen" textHover="white" icon={faPlus} title="Thêm danh sách phát" />
                </div>
            </div>

            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black w-full h-screen font-gilroy mt-4 mb-4 rounded-md shadow-lg flex justify-center px-4 py-4">
                <div className="container w-full">
                    <div id="pd-container" className="bg-black shadow-md overflow-hidden w-full">
                        <PlaylistTable playlists={playlists} currentPage={currentPage} totalPages={totalPages} onPreviousPage={handlePreviousPage} onNextPage={handleNextPage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playlist;
