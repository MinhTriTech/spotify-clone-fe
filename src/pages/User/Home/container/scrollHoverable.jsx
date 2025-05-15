import { Space } from 'antd';
import { memo } from 'react';
import { useAppSelector } from '../../../../store/store';
import { PageHeader } from '../../../../components/Layout/components/Header';

export const UserHoverableMenu = memo((props) => {
  const user = useAppSelector((state) => state.profile.user);
  
  return (
    <PageHeader {...props} hiddenContent activeHeider={270} activeContentHeight={320}>
      <Space>
        <h1 style={{ margin: 0 }} className='playlist-header'>
          {user?.username}
        </h1>
      </Space>
    </PageHeader>
  );
});

export default UserHoverableMenu;
