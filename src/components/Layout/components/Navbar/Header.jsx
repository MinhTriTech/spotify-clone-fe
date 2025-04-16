import React from 'react';
import { Space } from 'antd';
import { Link } from 'react-router-dom';
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';
import useIsMobile from '../../../../utils/isMobile';

const Header = ({ opacity, title }) => {
  const isMobile = useIsMobile();
  const t = (s) => s;

  // ✅ MOCK trạng thái đăng nhập
  const user = {
    id: 'mock-user-id',
    images: [{ url: 'https://via.placeholder.com/50' }],
  };

  return (
    <div
      className="flex r-0 w-full flex-row items-center justify-between bg-gray-900 rounded-t-md z-10"
      style={{ backgroundColor: `rgba(12, 12, 12, ${opacity}%)` }}
    >
      <div className="flex flex-row items-center">
        <Space>
          {!isMobile && (
            <a
              target="_blank"
              rel="noreferrer"
              className="contact-me"
              href="https://github.com/francoborrelli/spotify-react-web-client"
            >
              <span>{t('Source code')}</span>
            </a>
          )}

          {user ? (
            <div className="avatar-container">
              <Link to={`/users/${user.id}`}>
                <img
                  className="avatar"
                  id="user-avatar"
                  alt="User Avatar"
                  style={{ marginTop: -1 }}
                  src={
                    user?.images?.length
                      ? user.images[0].url
                      : ARTISTS_DEFAULT_IMAGE
                  }
                />
              </Link>
            </div>
          ) : (
            <button className="white-button small">{t('Log In')}</button>
          )}
        </Space>
      </div>
    </div>
  );
};

export default Header;
