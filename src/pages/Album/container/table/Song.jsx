import SongView, { SongViewComponents } from '../../../../components/SongsTable/songView';

export const Song = ({ song, index }) => {

  return (
    <SongView
      activable
      song={song}
      index={index}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Artists,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
