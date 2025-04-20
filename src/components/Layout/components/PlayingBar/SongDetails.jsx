import { memo } from 'react';
import { useAudio } from '../../../../contexts/AudioContext';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';
import { Link } from 'react-router-dom';
import { TrackActionsWrapper } from '../../../Actions/TrackActions';
import ArtistActionsWrapper from '../../../Actions/ArtistActions';
import AddSongToLibraryButton from '../../../Actions/AddSongToLibrary';

const ArrowDown = (
  <svg width={16} height={16} viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI">
    <path d="M.47 4.97a.75.75 0 0 1 1.06 0L8 11.44l6.47-6.47a.75.75 0 1 1 1.06 1.06L8 13.56.47 6.03a.75.75 0 0 1 0-1.06z"></path>
  </svg>
);

const ArrowUp = (
  <svg width={16} height={16} viewBox="0 0 16 16" className="Svg-sc-ytk21e-0 dYnaPI">
    <path d="M15.53 11.03a.75.75 0 0 1-1.06 1.06L8 4.56 1.53 11.03a.75.75 0 1 1-1.06-1.06L8 2.44l7.53 7.53a.75.75 0 0 1 0 1.06z"></path>
  </svg>
);

const SongDetails = memo(({ isMobile }) => {
  const { currentTrack } = useAudio();
  const dispatch = useAppDispatch();
  const detailsOpen = useAppSelector((state) => !state.ui.detailsCollapsed);

  if (!currentTrack) {
    return <div className="mobile-hidden" style={{ minWidth: 295 }} />;
  }

  const { albumCoverUrl, title, artists = '', id } = currentTrack;

  return (
    <div className="flex flex-row items-center playing-container">
      <div style={{ marginRight: 15 }}>
        <TrackActionsWrapper track={currentTrack} trigger={['contextMenu']}>
          <div className="playing-cover-container">
            <img
              alt="Album Cover"
              className="album-cover"
              src={albumCoverUrl}
            />
            <button
              aria-label="Now playing view"
              className="playing-cover-details-button"
              onClick={() => dispatch(uiActions.toggleDetails())}
            >
              {detailsOpen ? ArrowDown : ArrowUp}
            </button>
          </div>
        </TrackActionsWrapper>
      </div>

      <div id="song-and-artist-name">
        <TrackActionsWrapper track={currentTrack} trigger={['contextMenu']}>
          <p className="text-white font-bold song-title" title={title}>
            {title}
          </p>
        </TrackActionsWrapper>

        <span className="text-gray-200 song-artist" title={artists}>
          {artists}
        </span>
      </div>

      {!isMobile && (
        <AddSongToLibraryButton
          size={17}
          isSaved={false}
          id={id}
          onToggle={() => {}}
        />
      )}
    </div>
  );
});

export default SongDetails;
