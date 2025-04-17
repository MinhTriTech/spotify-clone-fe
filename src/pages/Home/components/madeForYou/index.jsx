import { useMemo } from 'react';

// Components
import { GridItemList } from '../../../../components/Lists/list';

// Redux
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';

// Constants
import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

export const MadeForYou = () => {
  const user = useAppSelector((state) => state.auth.user);
  const madeForYou = useAppSelector((state) => state.home.madeForYou);

  const items = useMemo(() => {
    const items = madeForYou.filter((p) => !p.name.toLowerCase().includes('mix'));
    const otherItems = madeForYou.filter((p) => p.name.toLowerCase().includes('mix')).reverse();
    return [...items, ...otherItems].slice(0, 12);
  }, [madeForYou]);

  if (!items || !items.length) return null;

  return (
    <div className='home'>
      <GridItemList
        items={items}
        moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
        getDescription={getPlaylistDescription}
        title={`Dành riêng cho ${user?.display_name || 'bạn'}`}
      />
    </div>
  );
};
