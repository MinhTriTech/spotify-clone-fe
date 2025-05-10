import { memo, useCallback, useEffect } from 'react';

import { Popconfirm } from 'antd';
import WhiteButton from '../../../../Button';
import { DetailsCard } from '../../NowPlaying/Details/card';

import { uiActions } from '../../../../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';

export const LibraryLoginInfo = memo(() => {
  const dispatch = useAppDispatch();
  const tooltipOpen = useAppSelector((state) => state.ui.loginTooltipOpen);

  const onClose = useCallback(() => {
    dispatch(uiActions.closeLoginTooltip());
  }, [dispatch]);

  const handleLogin = useCallback(() => {
    dispatch(uiActions.toggleLoginModalMain());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      onClose();
    };
  }, [onClose]);

  return (
    <Popconfirm
      icon={null}
      open={tooltipOpen}
      placement='left'
      onCancel={onClose}
      okText="Đăng nhập"
      cancelText="Để sau"
      title="Tạo playlist"
      cancelButtonProps={{ type: 'text' }}
      okButtonProps={{ className: 'white-button small' }}
      description="Đăng nhập để tạo và chia sẻ playlist."
    >
      <div style={{ marginRight: -5 }}>
        <DetailsCard title="Truy cập thư viện của bạn">
          <p style={{ fontWeight: 400, color: '#fff' }}>
            Đăng nhập để sử dụng đầy đủ tính năng của ứng dụng
          </p>
          <div style={{ marginTop: 20, marginBottom: 30, position: 'relative' }}>
            <WhiteButton
              size='small'
              title="Đăng nhập"
              onClick={handleLogin}
            />
          </div>
        </DetailsCard>
      </div>
    </Popconfirm>
  );
});
