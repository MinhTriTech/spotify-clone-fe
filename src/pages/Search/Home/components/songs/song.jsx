import React from 'react';

import SongView, { SongViewComponents } from '../../../../../components/SongsTable/songView';

export const Song = (props) => {
  const { song, index } = props;

  return (
    <SongView
      activable
      index={index}
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
