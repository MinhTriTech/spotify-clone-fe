import { Modal } from 'antd';
import { memo, useCallback, useEffect, useState } from 'react';
import WhiteButton from '../Button';

import { uiActions } from '../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../store/store';

import { DEFAULT_PAGE_COLOR } from '../../constants/spotify';

import tinycolor from 'tinycolor2';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';

const LoginModal = memo(() => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

  const imgUrl = useAppSelector((state) => state.ui.loginModalItem);

  const onClose = useCallback(() => {
    dispatch(uiActions.closeLoginModal());
  }, [dispatch]);

  useEffect(() => {
    if (imgUrl) {
      getImageAnalysis2(imgUrl).then((color) => {
        let colorObj = tinycolor(color);
        while (colorObj.isLight()) {
          colorObj = colorObj.darken(10);
        }
        setColor(colorObj.toHexString());
        setOpen(true);
      });
    }
    return () => {
      setOpen(false);
    };
  }, [imgUrl]);

  if (!imgUrl) return null;

  return (
    <Modal
      centered
      width={780}
      open={open}
      footer={null}
      destroyOnClose
      onCancel={onClose}
      className='login-modal'
      wrapClassName='overlay-modal'
      style={{
        ['--background-color']: color,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <div className='img-container'>
          <img alt='' loading='lazy' src={imgUrl} />
        </div>
        <div className='content-container'>
          <h2 style={{ lineHeight: 1.4 }}>
            Bắt đầu nghe với tài khoản Spotify miễn phí
          </h2>

          <div style={{ marginTop: 25 }}>
            <WhiteButton title="Đăng nhập" />
          </div>
        </div>
      </div>
    </Modal>
  );
});

LoginModal.displayName = 'LoginModal';

export default LoginModal;
