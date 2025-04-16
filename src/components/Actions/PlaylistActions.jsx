import React from 'react';
import { Dropdown, Menu } from 'antd';

const PlaylistActionsWrapper = ({ children, playlist, trigger = ['contextMenu'] }) => {
  const t = (x) => x;

  const items = [
    {
      key: '1',
      label: t('Play'),
      onClick: () => console.log('Play playlist:', playlist.name),
    },
    {
      key: '2',
      label: t('Add to Library'),
      onClick: () => console.log('Add to library:', playlist.id),
    },
    {
      key: '3',
      label: t('Share'),
      onClick: () => console.log('Share playlist'),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={trigger}
    >
      {children}
    </Dropdown>
  );
};

export default PlaylistActionsWrapper;
