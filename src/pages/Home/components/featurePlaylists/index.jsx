import { useAppSelector } from '../../../../store/store';
import { GridItemList } from '../../../../components/Lists/list';
import { getPlaylistDescription } from '../../../../utils/getDescription';

export const FeaturePlaylists = () => {
  const featurePlaylists = useAppSelector((state) => state.home.featurePlaylists);

  if (!featurePlaylists || !featurePlaylists.length) return null;

  return (
    <div className='home'>
      <GridItemList
        items={featurePlaylists}
        title="Danh sách phát nổi bật"
      />
    </div>
  );
};
