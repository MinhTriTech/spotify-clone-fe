import { Modal } from 'antd';
import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { yourLibraryActions } from '../../store/slices/yourLibrary';
import { deletePlaylistModalActions } from '../../store/slices/deletePlaylistModal';
import { playlistService } from '../../services/playlists';
import { useNavigate } from 'react-router-dom';

export const DeletePlaylistModal = memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const playlist = useAppSelector((state) => state.deletePlaylistModal.playlist);

  const onClose = useCallback(() => {
    dispatch(deletePlaylistModalActions.setPlaylist({ playlist: null }));
  }, [dispatch]);

  const handleDelete = async () => {
    if (playlist) {
      try {
        await playlistService.deletePlaylist(playlist.playlist_id);
        dispatch(yourLibraryActions.fetchMyPlaylists());
        dispatch(deletePlaylistModalActions.setPlaylist({ playlist: null }));
        navigate(`/`);
        onClose();
      } catch (error) {
        console.error("Failed to delete playlist", error);
      }
    }
  };

  return (
    <Modal
      centered
      width={550}
      footer={null}
      open={!!playlist}
      onCancel={onClose}
      title={
        <h1
          style={{
            fontWeight: 700,
            fontSize: '1.5rem',
            marginBlockStart: 0,
            paddingBlockEnd: 8,
            color: 'white',
          }}
        >
          Xóa Playlist ?
        </h1>
      }
    >
      <p style={{ color: '#fff' }}>
        Bạn chắc chắn muốn xóa Playlist {playlist?.title} khỏi Thư viện của bạn không?
      </p>

      <div style={{ textAlign: 'right' }}>
      <button
        onClick={handleDelete}
        className='edit-playlist-submit-button'
        >
        <span>Xác nhận</span>
        </button>
      </div>
    </Modal>
  );
});

DeletePlaylistModal.displayName = 'DeletePlaylistModal';
