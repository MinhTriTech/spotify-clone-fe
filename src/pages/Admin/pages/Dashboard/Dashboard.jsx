import { faMusic, faUser, faFileAudio, faImages, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import { DashboardItem, DashboardChart } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const handleRowClick = () => {
        navigate("admin/user/detail");
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <div className="w-full h-24 flex gap-6">
                <DashboardItem icon={faIdBadge} title="Nghệ sĩ" number="40" />
                <DashboardItem icon={faImages} title="Albums" number="100" />
                <DashboardItem icon={faMusic} title="Bài hát" number="8000" />
                <DashboardItem icon={faFileAudio} title="Danh sách phát" number="52" />
                <DashboardItem icon={faUser} title="Người dùng" number="999" />
            </div>

            <div className="w-full flex gap-4 h-72">
                <div className="w-[50%] bg-black rounded-md px-4 py-4" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
                    <h1 className="text-lg font-spotify text-white ml-6">
                        Bài hát được yêu thích nhất <span className="float-right mr-6 text-spotifyGreen font-spotify text-base hover:underline cursor-pointer">Xem tất cả</span>
                    </h1>
                    <div className="bg-gray-300 w-full h-px mt-2"></div>
                    <div className="w-full px-4 py-4 flex gap-4 text-white">
                        <div className="w-[50%] flex flex-col gap-6">
                            {firstHalfArtists.map((artist) => (
                                <div key={artist.artist_id} className=" w-full h-12 flex">
                                    <img src={artist.image || ""} alt="Ảnh đại diện" className="bg-violet-500 aspect-square h-12 w-14 object-cover" />
                                    <div className="w-full my-auto ml-2">
                                        <p className="font-gilroy_md">{artist.name}</p>
                                        <p className="overflow-auto text-blue-600">{artist.bio || "không có tiểu sử"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[50%] flex flex-col gap-6">
                            {secondHalfArtists.map((artist) => (
                                <div key={artist.artist_id} className=" w-full h-12 flex">
                                    <img src={artist.image || ""} alt="Ảnh đại diện" className="bg-violet-500 aspect-square h-12 w-14 object-cover" />
                                    <div className="w-full my-auto ml-2">
                                        <p className="font-gilroy_md">{artist.name}</p>
                                        <p className="overflow-auto text-blue-600">{artist.bio || "không có tiểu sử"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-[50%] bg-black rounded-md px-4 py-4" style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }}>
                    <h1 className="text-lg font-spotify text-white ml-6">
                        Ca sĩ được yêu thích nhất <span className="float-right mr-6 text-spotifyGreen font-spotify text-base hover:underline cursor-pointer">Xem tất cả</span>
                    </h1>
                    <div className="bg-gray-300 w-full h-px mt-2"></div>
                    <div className="w-full px-4 py-4 flex gap-4 text-white">
                        <div className="w-[50%] flex flex-col gap-6">
                            <div className="w-[50%] flex flex-col gap-6">
                                {firstHalfSongs.map((song) => (
                                    <div key={song.song_id} className=" w-full h-12 flex">
                                        <img src={song.image || ""} alt="Ảnh bìa" className="bg-violet-500 h-12 w-14 aspect-square object-cover" />
                                        <div className="w-full my-auto ml-2">
                                            <p className="font-gilroy_md whitespace-nowrap overflow-hidden">{song.title}</p>
                                            <p className="text-blue-600 whitespace-nowrap overflow-hidden">{song.artists[song.artists.length - 1]?.name || "không có tác giả"}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-[50%] flex flex-col gap-6">
                            {secondHalfSongs.map((song) => (
                                <div key={song.song_id} className=" w-full h-12 flex">
                                    <img src={song.image || ""} alt="Ảnh bìa" className="bg-violet-500 h-12 w-14 aspect-square object-cover" />
                                    <div className="w-full my-auto ml-2">
                                        <p className="font-gilroy_md whitespace-nowrap overflow-hidden">{song.title}</p>
                                        <p className="text-blue-600 whitespace-nowrap overflow-hidden">{song.artists[song.artists.length - 1]?.name || "không có tác giả"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="w-full bg-black px-4 py-4 rounded-md h-72">
                <h1 className="text-lg font-spotify text-white ml-6">Bài hát theo loại</h1>
                <div className="bg-gray-300 w-full h-px mt-2 mb-6"></div>
                <DashboardChart />
            </div>
        </div>
    );
};
export default Dashboard;
