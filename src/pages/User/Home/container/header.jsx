import { useAppSelector } from '../../../../store/store';
import { memo } from 'react';
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';
import { MessageUserButton } from './messageButton';

export const UserHeader = memo((props) => {
  const user = useAppSelector((state) => state.profile.user);
 
  return (
    <div className='profile-header'>
      <div
        className='profile-header-cover'
        style={{
          backgroundColor: props.color,
        }}
      ></div>

      <div className='profile-header-background'></div>
      <div className='profile-header-content'>
        <div></div>
        <div className='profile-img-container'>
          <div className='profile-img'>
            <div
              style={{
                borderRadius: 4,
                height: '100%',
                width: '100%',
              }}
            >
              <img
                src={
                  ARTISTS_DEFAULT_IMAGE
                }
                alt={user?.username}
              />
            </div>
          </div>
        </div>

        <div className='profile-header-text'>
          <span className='type'>Hồ sơ</span>

          <span className='profile-header-name-container'>
            <h1>{user?.username}</h1>
          </span>
        </div>

        <div style={{ marginRight: 25 }}>
          <MessageUserButton id={user.id} />
        </div>
      </div>
    </div>
  );
});
