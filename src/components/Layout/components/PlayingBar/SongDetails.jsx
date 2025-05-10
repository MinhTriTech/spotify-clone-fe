import { memo } from 'react';
import {AddSongToLibraryButton} from '../../../Actions/AddSongToLibrary';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';
import { Link } from 'react-router-dom';
import TrackActionsWrapper from '../../../Actions/TrackActions';
import ArtistActionsWrapper from '../../../Actions/ArtistActions';
import { useAudio } from '../../../../contexts/AudioContext';

const ArrowDown = (
  <svg
    width={16}
    height={16}
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="Svg-sc-ytk21e-0 dYnaPI"
  >
    <path d="M.47 4.97a.75.75 0 0 1 1.06 0L8 11.44l6.47-6.47a.75.75 0 1 1 1.06 1.06L8 13.56.47 6.03a.75.75 0 0 1 0-1.06z"></path>
  </svg>
);

const ArrowUp = (
  <svg
    width={16}
    height={16}
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="Svg-sc-ytk21e-0 dYnaPI"
  >
    <path d="M15.53 11.03a.75.75 0 0 1-1.06 1.06L8 4.56 1.53 11.03a.75.75 0 1 1-1.06-1.06L8 2.44l7.53 7.53a.75.75 0 0 1 0 1.06z"></path>
  </svg>
);

const SongDetails = memo((props) => {
  const dispatch = useAppDispatch();
  const { currentTrack } = useAudio();

  const detailsOpen = useAppSelector((state) => !state.ui.detailsCollapsed);

  if (!currentTrack) return <div className="mobile-hidden" style={{ minWidth: 295 }}></div>;

  return (
    <div className="flex flex-row items-center playing-container">
      <div style={{ marginRight: 15 }}>
        <TrackActionsWrapper
          track={currentTrack}
          trigger={['contextMenu']}
        >
          <div className="playing-cover-container">
            <img
              alt="Bìa album"
              className="album-cover"
              src={currentTrack?.image}
            />
            <button
              aria-label="Chế độ xem bài hát đang phát"
              className="playing-cover-details-button"
              onClick={() => {
                dispatch(uiActions.toggleDetails());
              }}
            >
              {detailsOpen ? ArrowDown : ArrowUp}
            </button>
          </div>
        </TrackActionsWrapper>
      </div>

      <div id="song-and-artist-name">
        <TrackActionsWrapper
          track={currentTrack}
          trigger={['contextMenu']}
        >
          <p className="text-white font-bold song-title" title={currentTrack?.title}>
            {currentTrack?.title}
          </p>
        </TrackActionsWrapper>

        <span
          className="text-gray-200 song-artist"
          title={currentTrack?.artists
            ?.slice(0, 3)
            .map((a) => a.name)
            .join(', ')}>
          {currentTrack?.artists.slice(0, 3).map((a, i) => (
            <span key={a.artist_id}>
              <ArtistActionsWrapper artist={a} trigger={['contextMenu']}>
                <Link to={`/artist/${a.artist_id}`}>{a.name}</Link>
              </ArtistActionsWrapper>
              {i < currentTrack.artists.slice(0, 3).length - 1 && ', '}
            </span>
          ))}
        </span>
      </div>

      {!props.isMobile && (
        <AddSongToLibraryButton
          size={17}
          id={currentTrack?.id}
        />
      )}
    </div>
  );
});

export default SongDetails;
