import { memo, useEffect, useMemo, useState } from 'react';

/* eslint-disable react-hooks/exhaustive-deps */
import { Space } from 'antd';
import Chip from '../../../../components/Chip';
import { GridItemList } from '../../../../components/Lists/list';

// Utils
import { orderBy } from 'lodash';
import { getAlbumDescription } from '../../../../utils/getDescription';

// Redux
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
  const artist = useAppSelector((state) => state.artist.artist);
  const albums = useAppSelector((state) => state.artist.albums);

  const [activeKey, setActiveKey] = useState('Phát hành phổ biến');

  const items = useMemo(() => {
    switch (activeKey) {
      case 'Album':
        return albums;
      default:
        return orderBy([...albums, ...singles, ...compilations], 'release_date', 'desc');
    }
  }, [activeKey, albums, singles, compilations]);

  return (
    <div>
      <GridItemList
        items={items}
        title="Danh sách phát hành"
        getDescription={getAlbumDescription}
        moreUrl={`/artist/${artist?.id}/discography`}
        chips={<ChipsSection activeKey={activeKey} setActiveKey={setActiveKey} />}
      />
    </div>
  );
});
