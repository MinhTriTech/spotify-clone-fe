import { Col, Modal, Row } from 'antd';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';

import { refreshPlaylist } from '../../store/slices/playlist';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { yourLibraryActions } from '../../store/slices/yourLibrary';
import { editPlaylistModalActions } from '../../store/slices/editPlaylistModal';

import { playlistService } from '../../services/playlists';

import { PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const EditPlaylistModal = memo(() => {
  const dispatch = useAppDispatch();
  const formRef = useRef(null);
  const currentPlaylist = useAppSelector((state) => state.playlist.playlist);
  const playlist = useAppSelector((state) => state.editPlaylistModal.playlist);

  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  
  function handleChange(e) {
    if (!e.target.files.length) {
      setFileUrl('');
      setFile(null);
      return;
    }
    const url = URL.createObjectURL(e.target.files[0]);
    setFileUrl(url);
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (playlist) {
      formRef.current?.setFieldsValue({
        title: playlist.title,
      });
    }
  }, [playlist]);

  const onClose = useCallback(() => {
    dispatch(editPlaylistModalActions.setPlaylist({ playlist: null }));
  }, [dispatch]);

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
          Chỉnh sửa thông tin
        </h1>
      }
    >
      <ProForm
        formRef={formRef}
        style={{ marginTop: 10 }}
        onFinish={async (values) => {
          try {
            setLoading(true);
            await playlistService.changePlaylistDetails(playlist.playlist_id, {
              ...values,
              image: file || null,
            });

            setLoading(false);

            if (currentPlaylist && playlist.playlist_id === currentPlaylist.playlist_id) {
              dispatch(refreshPlaylist(currentPlaylist.playlist_id));
            }

            dispatch(yourLibraryActions.fetchMyPlaylists());
            dispatch(editPlaylistModalActions.setPlaylist({ playlist: null }));

            return true;
          } catch (error) {
            setLoading(false);
            return false;
          }
        }}
        submitter={{
          render: (props) => (
            <div style={{ textAlign: 'right' }}>
              <button
                disabled={loading}
                className="edit-playlist-submit-button"
                onClick={props.submit || props.onSubmit}
              >
                <span>Lưu</span>
              </button>
            </div>
          ),
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div className='playlist-img-container'>
              <div className='playlist-img-overlay'>
                <div className='playlist-img-overlay-container'>
                  <button aria-haspopup='true'>
                    <div className='icon'>
                      <svg
                        data-encore-id='icon'
                        role='img'
                        height={50}
                        width={50}
                        aria-hidden='true'
                        viewBox='0 0 24 24'
                        style={{ margin: '0 auto' }}
                      >
                        <path d='M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z'></path>
                      </svg>
                      <span data-encore-id='text'>Chọn ảnh</span>
                    </div>
                  </button>
                  <input type='file' onChange={handleChange} accept='image/.jpg, image/.jpeg' />
                </div>
              </div>
              <img
                src={
                  fileUrl
                    ? fileUrl
                    : playlist?.image
                    ? playlist.image
                    : PLAYLIST_DEFAULT_IMAGE
                }
                className='playlist-img'
              />
            </div>
          </Col>
          <Col span={16}>
            <ProFormText
              placeholder='Thêm tên playlist'
              name='title'
              rules={[{ required: true, message: '' }]}
            />
          </Col>
        </Row>
      </ProForm>
    </Modal>
  );
});

EditPlaylistModal.displayName = 'EditPlaylistModal';
