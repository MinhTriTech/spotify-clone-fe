import SongView, { SongViewComponents } from '../../../../components/SongsTable/songView';
import { useAppSelector } from '../../../../store/store';

export const Song = (props) => {
  const { song, index } = props;
  
  const artist = useAppSelector((state) => state.artist.artist);

  return (
    <SongView
      activable
      song={song}
      index={index}
      view="LIST"
      artist={artist}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
