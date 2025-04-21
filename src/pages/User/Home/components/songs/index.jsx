import { Flex } from 'antd';
import { useAppSelector } from '../../../../../store/store';
import SongView from './song';
import { Link } from 'react-router-dom';

export const Songs = () => {
  const user = useAppSelector((state) => state.profile.user);
  const songs = useAppSelector((state) => state.profile.songs);

  if (!songs || songs.length === 0) return null;

  return (
    <div className="search-songs-container" style={{ marginTop: 10 }}>
      <Flex align="center" justify="space-between">
        <div>
          <h1 className="playlist-header">Bài hát nổi bật tháng này</h1>
          <h2 className="playlist-subheader">Chỉ hiển thị với bạn</h2>
        </div>

        {songs && songs.length > 5 ? (
          <div>
            <Link to={`/users/${user.id}/tracks`} className="showMore">
              <span>Xem tất cả</span>
            </Link>
          </div>
        ) : null}
      </Flex>

      <div>
        {songs.slice(0, 5).map((song, index) => (
          <SongView song={song} key={song.id} index={index} />
        ))}
      </div>
    </div>
  );
};
