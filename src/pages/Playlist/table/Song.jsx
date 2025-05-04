import SongView, { SongViewComponents } from '../../../components/SongsTable/songView';

import { useAppSelector } from '../../../store/store';

export const Song = ({ index, song }) => {
  const canEdit = useAppSelector((state) => state.playlist.canEdit);

  return (
    <SongView
      activable
      index={index}
      canEdit={canEdit}
      song={song}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Artists,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
