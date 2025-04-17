import { useAppSelector } from '../../../../store/store';
import { GridItemList } from '../../../../components/Lists/list';

export const NewReleases = () => {
  const newReleases = useAppSelector((state) => state.home.newReleases);

  if (!newReleases || !newReleases.length) return null;

  return (
    <div className='home'>
      <GridItemList title="Phát hành mới" items={newReleases} />
    </div>
  );
};
