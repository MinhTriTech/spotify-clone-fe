import { memo } from 'react';
import { useAppSelector } from '../../../../../store/store';
import { GridItemList } from '../../../../../components/Lists/list';
import useIsMobile from '../../../../../utils/isMobile';

export const MyArtistsSection = memo(() => {
  const isMobile = useIsMobile();
  const user = useAppSelector((state) => state.profile.user);
  const artists = useAppSelector((state) => state.profile.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <GridItemList
        items={artists}
        title="Nghệ sĩ nổi bật tháng này"
        subtitle="Chỉ hiển thị với bạn"
        moreUrl={artists.length > (isMobile ? 2 : 5) ? `/users/${user?.id}/artists` : undefined}
      />
    </div>
  );
});
