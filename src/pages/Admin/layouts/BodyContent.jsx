import { Routes, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Album, AlbumCreate, AlbumDetail, AlbumUpdate, AlbumAddSong} from "../pages/Album";
import { Song, SongCreate, SongDetail, SongUpdate } from "../pages/Song";
import { Artist, ArtistCreate, ArtistDetail, ArtistUpdate } from "../pages/Artist";
import { Playlist, PlaylistCreate, PlaylistDetail, PlaylistUpdate } from "../pages/Playlist";
import { Role } from "../pages/Role";
import { User, UserCreate, UserDetail, UserUpdate } from "../pages/User";
import { Info } from "../pages/Info";
const BodyContent = () => {
    return (
        <div className="font-spotify bg-spotifyLightBlack w-[80%] h-screen px-8 py-8 flex flex-col gap-8 overflow-auto">
            <Routes>
                <Route path="/admin" element={<Dashboard />} />

                <Route path="/admin/artist" element={<Artist />} />
                <Route path="/admin/artist/create" element={<ArtistCreate />} />
                <Route path="/admin/artist/:id/detail" element={<ArtistDetail />} />
                <Route path="/admin/artist/:id/update" element={<ArtistUpdate />} />

                <Route path="/admin/album" element={<Album />} />
                <Route path="/admin/album/create" element={<AlbumCreate />} />
                <Route path="/admin/album/:id/detail" element={<AlbumDetail />} />
                <Route path="/admin/album/:id/update" element={<AlbumUpdate />} />
                <Route path="/admin/album/:id/add-song" element={<AlbumAddSong />} />

                <Route path="/admin/song" element={<Song />} />
                <Route path="/admin/song/create" element={<SongCreate />} />
                <Route path="/admin/song/:id/detail" element={<SongDetail />} />
                <Route path="/admin/song/:id/update" element={<SongUpdate />} />

                <Route path="/admin/playlist" element={<Playlist />} />
                <Route path="/admin/playlist/create" element={<PlaylistCreate />} />
                <Route path="/admin/playlist/:id/detail" element={<PlaylistDetail />} />
                <Route path="/admin/playlist/:id/update" element={<PlaylistUpdate />} />

                <Route path="/admin/user" element={<User />} />
                <Route path="/admin/user/create" element={<UserCreate />} />
                <Route path="/admin/user/:id/detail" element={<UserDetail />} />
                <Route path="/admin/user/:id/update" element={<UserUpdate />} />

                <Route path="/admin/role" element={<Role />} />

                <Route path="/admin/info" element={<Info />} />
            </Routes>
        </div>
    );
};
export default BodyContent;
