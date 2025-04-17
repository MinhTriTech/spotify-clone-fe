import { useMemo } from 'react';

// Components
import { GridItemList } from '../../../../components/Lists/list';

// Redux & Utils
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';

// Constants
import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

export const TopMixes = () => {
  const madeForYou = useAppSelector((state) => state.home.madeForYou);

  const items = useMemo(() => {
    return madeForYou
      .filter((p) => p.name.toLowerCase().includes('mix'))
      .slice(0, 12);
  }, [madeForYou]);

  if (!items || !items.length) return null;

  return (
    <div className='home'>
      <GridItemList
        items={items}
        title="Top bản phối của bạn"
        moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
