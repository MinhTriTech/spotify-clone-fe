import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { getLibraryCollapsed, uiActions } from '../../../../store/slices/ui';

import { AddPlaylistButton } from './AddPlaylistButton';
import { CloseIcon, LibraryCollapsedIcon, LibraryIcon } from '../../../Icons';
import { Flex, Space } from 'antd';
import { Tooltip } from '../../../Tooltip';

const isMobile = window.innerWidth < 900;
const t = (x) => x;

const CloseButton = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="playing-section-close-button">
      <button onClick={() => dispatch(uiActions.collapseLibrary())}>
        <CloseIcon />
      </button>
    </div>
  );
};

export const LibraryTitle = memo(() => {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector(getLibraryCollapsed);

  const toggleLibrary = () => {
    dispatch(uiActions.toggleLibrary());
  };

  if (collapsed) {
    return (
      <Tooltip placement="right" title={t('Expand your library')}>
        <button
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          onClick={toggleLibrary}
        >
          <LibraryCollapsedIcon />
        </button>
      </Tooltip>
    );
  }

  return (
    <Flex align="center" justify="space-between">
      <Space wrap align="center">
        <Tooltip placement="top" title={t('Collapse your library')}>
          <button onClick={toggleLibrary}>
            <LibraryIcon />
          </button>
        </Tooltip>
        <span className="Navigation-button">{t('Your Library')}</span>
      </Space>

      {isMobile ? <CloseButton /> : <AddPlaylistButton />}
    </Flex>
  );
});
