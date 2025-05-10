import { AddPlaylistButton } from './AddPlaylistButton';
import { CloseIcon, LibraryCollapsedIcon, LibraryIcon } from '../../../Icons';

import { memo } from 'react';

import { Flex, Space } from 'antd';
import { Tooltip } from '../../../Tooltip';

import { getLibraryCollapsed, uiActions } from '../../../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const isMobile = window.innerWidth < 900;

const CloseButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className='playing-section-close-button'>
      <button
        onClick={() => {
          dispatch(uiActions.collapseLibrary());
        }}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export const LibraryTitle = memo(() => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(getLibraryCollapsed);

  if (collapsed) {
    return (
      <Tooltip placement='right' title="Mở thư viện của bạn">
        <button
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          onClick={() => dispatch(uiActions.toggleLibrary())}
        >
          <LibraryCollapsedIcon />
        </button>
      </Tooltip>
    );
  }

  return (
    <Flex align='center' justify='space-between'>
      <Space wrap align='center'>
        <Tooltip placement='top' title="Thu gọn thư viện của bạn">
          <button onClick={() => dispatch(uiActions.toggleLibrary())}>
            <LibraryIcon />
          </button>
        </Tooltip>
        <span className='Navigation-button'>Thư viện của bạn</span>
      </Space>

      {isMobile ? <CloseButton /> : <AddPlaylistButton />}
    </Flex>
  );
});
