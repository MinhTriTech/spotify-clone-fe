import { memo } from 'react';

import ArtistControls from './controls';
import { Discography } from '../components/discography';
import { ArtistTopTracks } from '../components/topTracks';

export const ArtistContent = memo((props) => {
  return (
    <div
      className="artist-page-content"
      style={{
        '--background-base': props.color,
      }}
    >
      <div style={{ margin: 20, paddingTop: 30, paddingBottom: 30 }}>
        <ArtistControls />
        <ArtistTopTracks />
        <Discography />
      </div>
    </div>
  );
});

ArtistContent.displayName = 'GenreContent';

export default ArtistContent;
