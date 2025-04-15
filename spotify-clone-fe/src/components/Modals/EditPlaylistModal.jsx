import { memo, useEffect, useRef, useState } from 'react';
import { Col, message, Modal, Row } from 'antd';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';

import { PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';

const t = (s) => s;

const mockPlaylist = {
  id: '123',
  name: 'Mock Playlist',
  description: 'This is a mock playlist.',
  images: [{ url: 'https://via.placeholder.com/300' }],
};

const EditPlaylistModal = memo(() => {
  const formRef = useRef(null);
  const playlist = mockPlaylist;
  const currentPlaylist = mockPlaylist;

  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true); // mock trạng thái mở modal

  function handleChange(e) {
    if (!e.target.files.length) {
      setFileUrl('');
      setFile(undefined);
      return;
    }
    const url = URL.createObjectURL(e.target.files[0]);
    setFileUrl(url);
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    if (playlist) {
      formRef.current?.setFieldsValue({
        name: playlist.name,
        description: playlist.description,
      });
    }
  }, [playlist]);

  const onClose = () => {
    setOpen(false);
    console.log('Modal closed');
  };

  return (
    <Modal
      centered
      width={550}
      footer={null}
      open={open}
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
          {t('Edit details')}
        </h1>
      }
    >
      <ProForm
        formRef={formRef}
        style={{ marginTop: 10 }}
        onFinish={async (values) => {
          setLoading(true);
          console.log('Saving playlist with values:', values);
          setTimeout(() => {
            message.success('Mock: Playlist updated');
            setLoading(false);
            setOpen(false);
          }, 1000);
          return true;
        }}
        submitter={{
          render: (props) => (
            <div style={{ textAlign: 'right' }}>
              <button
                disabled={loading}
                className="edit-playlist-submit-button"
                onClick={props.submit || props.onSubmit}
              >
                <span>{t('Save')}</span>
              </button>
            </div>
          ),
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div className="playlist-img-container">
              <div className="playlist-img-overlay">
                <div className="playlist-img-overlay-container">
                  <button aria-haspopup="true">
                    <div className="icon">
                      <svg
                        data-encore-id="icon"
                        role="img"
                        height={50}
                        width={50}
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        style={{ margin: '0 auto' }}
                      >
                        <path d="M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z"></path>
                      </svg>
                      <span>{t('Choose photo')}</span>
                    </div>
                  </button>
                  <input type="file" onChange={handleChange} accept="image/.jpg, image/.jpeg" />
                </div>
              </div>
              <img
                src={fileUrl || playlist?.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE}
                alt=""
                className="playlist-img"
              />
            </div>
          </Col>
          <Col span={16}>
            <ProFormText
              placeholder={'Add a name'}
              name={'name'}
              rules={[{ required: true, message: '' }]}
            />
            <ProFormTextArea
              name={'description'}
              placeholder={'Add an optional description'}
              fieldProps={{ autoSize: { minRows: 4 } }}
            />
          </Col>
        </Row>
      </ProForm>
    </Modal>
  );
});

EditPlaylistModal.displayName = 'EditPlaylistModal';

export default EditPlaylistModal;
