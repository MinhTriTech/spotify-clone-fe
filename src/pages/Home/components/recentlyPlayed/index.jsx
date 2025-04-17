import { useAppSelector } from '../../../../store/store';
import { memo } from 'react';

import { GridItemList } from '../../../../components/Lists/list';
import { getItemDescription } from '../../../../utils/getDescription';

export const RecentlyPlayed = memo(() => {
  const recentlyPlayed = useAppSelector((state) => state.home.recentlyPlayed);

  if (!recentlyPlayed || !recentlyPlayed.length) return null;

  return (
    <div className='home'>
      <GridItemList
        title="Nghe gần đây"
        items={recentlyPlayed.slice(0, 10)}
        getDescription={getItemDescription}
      />
    </div>
  );
});
