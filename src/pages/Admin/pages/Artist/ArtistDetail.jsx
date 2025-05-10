import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import thumbnail from "../../../../../public/images/artist.png";
import { ButtonAdmin } from "../../components";
import { useEffect, useState } from "react";
import { fetchArtistById, deleteArtist } from "../../../../services_admin/artist";

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const data = await fetchArtistById(id);
        setArtist(data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải thông tin nghệ sĩ.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nghệ sĩ này?")) {
      try {
        await deleteArtist(id);
        alert("Đã xóa thành công!");
        navigate("/admin/artist");
      } catch (err) {
        console.error(err);
        alert("Xóa thất bại!");
      }
    }
  };

  if (loading) return <div className="text-white p-5">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-500 p-5">{error}</div>;
  if (!artist) return null;

  return (
    <>
      <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="bg-black h-fit w-full flex px-3 py-3">
        <div className="h-full w-[30%] 2xl:w-[25%] flex items-center cursor-pointer group hover:underline hover:text-white">
          <FontAwesomeIcon icon={faChevronLeft} className="ml-8 text-spotifyGray group-hover:text-white" />
          <Link to="/admin/artist" className="ml-2 text-base text-spotifyGray group-hover:underline">
            Quay lại danh sách nghệ sĩ
          </Link>
        </div>
        <div className="h-full flex items-center justify-end w-[68%] 2xl:w-[74%] text-sm space-x-2">
          <ButtonAdmin icon={faXmark} title="Xóa" color="red-500" textHover="white" onClick={handleDelete} />
          <ButtonAdmin path={`/admin/artist/${id}/update`} icon={faPenToSquare} title="Cập nhật" color="spotifyGreen" textHover="white" />
        </div>
      </div>

      <div style={{ boxShadow: "0 4px 6px rgba(255, 255, 255, 0.2)" }} className="text-white w-full px-8 py-8 flex flex-wrap gap-4 h-fit bg-black">
        <h1 className="font-bold text-xl">Thông tin nghệ sĩ</h1>
        <div className="w-full h-px bg-spotifyGray"></div>

        <div className="w-full h-fit flex py-4">
          <div className="w-[22%]">
            <img src={artist.image || thumbnail} alt="ảnh đại diện" className="h-56 w-56 object-cover" />
          </div>
          <div className="w-[78%] space-y-6">
            <div className="px-6">
              <label className="block text-sm text-spotifyGray">Tên nghệ sĩ</label>
              <div className="mt-2 text-base">{artist.name}</div>
            </div>
            <div className="px-6">
              <label className="block text-sm text-spotifyGray">Tiểu sử</label>
              <div className="mt-2 text-base whitespace-pre-line">{artist.bio}</div>
            </div>
            <div className="px-6">
              <label className="block text-sm text-spotifyGray">Ngày khởi tạo</label>
              <div className="mt-2 text-base">{new Date(artist.created_at).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistDetail;