import { memo } from 'react';
import { Dropdown, message } from 'antd';
import { AddIcon, NewPlaylistIcon } from '../../../Icons';

export const AddPlaylistButton = memo(() => {
  const t = (x) => x;

  const onClick = () => {
    console.log('Mock: Creating playlist...');
    message.success(t('Playlist created'));
  };

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      menu={{
        items: [
          {
            key: 'create',
            icon: <NewPlaylistIcon />,
            label: t('Create a new Playlist'),
            onClick,
          },
        ],
      }}
    >
      <button className="addButton">
        <AddIcon />
      </button>
    </Dropdown>
  );
});
