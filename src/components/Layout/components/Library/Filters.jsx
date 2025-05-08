import { memo, useMemo } from 'react';

import Chip from '../../../Chip';
import { Space } from 'antd';
import { CloseIcon2 } from '../../../Icons';

import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

const TypeSelector = memo(() => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.yourLibrary.filter);

  const hasArtists = useAppSelector((state) => state.yourLibrary.myArtists.length > 0);
  const hasPlaylists = useAppSelector((state) => state.yourLibrary.myPlaylists.length > 0);

  const onClick = (filter) => {
    dispatch(yourLibraryActions.setFilter({ filter }));
  };

  const items = useMemo(() => {
    const data = [];
    if (hasPlaylists) data.push({ text: 'Danh sách phát', type: 'PLAYLISTS' });
    if (hasArtists) data.push({ text: 'Nghệ sĩ', type: 'ARTISTS' });
    return data;
  }, [hasArtists, hasPlaylists]);

  if (!hasArtists && !hasPlaylists) return null;

  return (
    <Space>
      {filter !== 'ALL' && (
        <Chip key='close' text={<CloseIcon2 />} onClick={() => onClick('ALL')} />
      )}

      {items.map(({ text, type }) => {
        if (filter === 'ALL' || type === filter) {
          return (
            <Chip
              key={text}
              text={text}
              active={filter === type}
              onClick={() => onClick(type)}
            />
          );
        }
        return null;
      })}
    </Space>
  );
});

export const LibraryFilters = () => {
  return (
    <div>
      <div>
        <TypeSelector />
      </div>
    </div>
  );
};
