import "../../styles/Admin.css";
import { Siderbar, BodyContent } from "./layouts";
import { Route, Routes } from "react-router-dom";
import { AlbumDetail } from "./pages/Album";
const AdminLayout = () => {
    return (
        <div className="bg-spotifyLightBlack w-full h-screen flex font-spotify text-spotifyGray">
            <Siderbar></Siderbar>
            <BodyContent></BodyContent>
            
        </div>
    );
};

export default AdminLayout;
