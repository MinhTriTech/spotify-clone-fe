import { memo, useEffect, useMemo } from 'react';

import { Space } from 'antd';
import Chip from '../../../../components/Chip';
import { GridItemList } from '../../../../components/Lists/list';

import { useAppSelector } from '../../../../store/store';

const ChipsSection = memo((props) => {
  const { activeKey, setActiveKey } = props;

  const albums = useAppSelector((state) => state.artist.albums);

  const chips = useMemo(() => {
    if (!albums.length) {
      return [];
    }

    const items = ['Phát hành phổ biến'];

    if (albums.length) {
      items.push('Album');
    }

    return items;
  }, [albums]);

  useEffect(() => {
    if (chips.length) setActiveKey(chips[0]);
  }, [chips]);

  if (!chips.length || chips.length === 2) return null;

  return (
    <Space style={{ margin: '0px 15px', marginBottom: 15 }}>
      {chips.map((chip) => (
        <Chip
          key={chip}
          text={chip}
          active={activeKey === chip}
          onClick={() => setActiveKey(chip)}
        />
      ))}
    </Space>
  );
});

export const Discography = memo(() => {
  const albums = useAppSelector((state) => state.artist.albums);

  const items = albums;

  return (
    <div>
      <GridItemList
        items={items}
        title="Albums"
        chips={<ChipsSection activeKey="Albums" setActiveKey={() => {}} />}
      />
    </div>
  );
});

