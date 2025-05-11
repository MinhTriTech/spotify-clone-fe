import { Dropdown, message } from 'antd';
import { AddIcon, NewPlaylistIcon } from '../../../Icons';

import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { playlistService } from '../../../../services/playlists';

import { fetchMyPlaylists } from '../../../../store/slices/yourLibrary';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';

export const AddPlaylistButton = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(
    (state) => state.auth.user,
    (prev, next) => prev?.user_info.id === next?.user_info.id
  );

  const onClick = async () => {
    if (!user) return dispatch(uiActions.openLoginTooltip());
  
    try {
      const playlist = await playlistService.createPlaylist('Danh sách phát của tôi');
      message.success('Tạo danh sách phát thành công');
      dispatch(fetchMyPlaylists());
      navigate(`/playlist/${playlist.playlist_id}`);
    } catch (error) {
      message.error('Không thể tạo danh sách phát. Vui lòng thử lại sau.');
      console.error(error);
    }
  };

  return (
    <Dropdown
      placement='bottomRight'
      trigger={['click']}
      menu={{
        items: [
          {
            key: 'create',
            icon: <NewPlaylistIcon />,
            label: 'Tạo danh sách phát mới',
            onClick,
          },
        ],
      }}
    >
      <button className='addButton'>
        <AddIcon />
      </button>
    </Dropdown>
  );
});
