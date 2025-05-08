import { useCallback } from 'react';
import { Popconfirm, Space } from 'antd';
import { Link } from 'react-router-dom';
import { CloseIcon, LogoutIcon } from '../../../Icons';
import WhiteButton from '../../../Button';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../../../store/slices/auth';

import { uiActions } from '../../../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';

const LoginButton = () => {
  const dispatch = useAppDispatch();
  const tooltipOpen = useAppSelector((state) => state.ui.loginButtonOpen);

  const handleLogin = useCallback(() => {
    dispatch(uiActions.toggleLoginModalMain());
  }, [dispatch]);

  const onClose = useCallback(() => {
    dispatch(uiActions.closeLoginButton());
  }, [dispatch]);

  return (
    <Popconfirm
      icon={null}
      open={tooltipOpen}
      onCancel={onClose}
      placement="bottomLeft"
      rootClassName="login-tooltip"
      cancelText={<CloseIcon />}
      title="Bạn đã đăng xuất"
      cancelButtonProps={{ type: 'text' }}
      okButtonProps={{ className: 'white-button small' }}
      description="Đăng nhập để thêm vào bài hát yêu thích của bạn."
    >
      <WhiteButton title="Đăng nhập" onClick={handleLogin} />
    </Popconfirm>
  );
};

const Header = ({ opacity }) => {
  const dispatch = useDispatch();

  const handleLogoutActive = useCallback(async (e) => {
    try {
      await dispatch(handleLogout()).unwrap();
    } catch (error) {
      console.error('Lỗi khi đăng xuất', error);
    }
  }, [dispatch]);

  const user = useAppSelector(
    (state) => state.auth.user,
    (prev, next) => prev?.id === next?.id
  );

  return (
    <div
      className="flex r-0 w-full flex-row items-center justify-between bg-gray-900 rounded-t-md z-10"
      style={{ backgroundColor: `rgba(12, 12, 12, ${opacity}%)` }}
    >
      <div className="flex flex-row items-center">
        <Space>
          {user ? (
              <LogoutIcon onClick={handleLogoutActive}/>
          ) : null}

          {user ? (
            <div className="avatar-container">
              <Link to={`/users/${user.user_info.id}`}>
                <img
                  className="avatar"
                  id="user-avatar"
                  alt="Ảnh đại diện người dùng"
                  style={{ marginTop: -1 }}
                  src={
                    ARTISTS_DEFAULT_IMAGE
                  }
                />
              </Link>
            </div>
          ) : (
            <LoginButton />
          )}
        </Space>
      </div>
    </div>
  );
};

export default Header;
