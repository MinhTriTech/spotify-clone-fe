import { Tooltip } from 'antd';
import ReactTimeAgo from 'react-time-ago';
import { useCallback, useMemo } from 'react';
import { MenuIcon, Pause, Play } from '../Icons';
import { TrackActionsWrapper } from '../Actions/TrackActions';

// Utils
import { msToTime } from '../../utils';

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';

// Services
import { Link, useNavigate } from 'react-router-dom';
import { playerService } from '../../services/player';
import { ArtistActionsWrapper } from '../Actions/ArtistActions';
import { AddSongToLibraryButton } from '../Actions/AddSongToLibrary';

import useIsMobile from '../../utils/isMobile';
import { EQUILISER_IMAGE } from '../../constants/spotify';
import { spotifyActions } from '../../store/slices/spotify';
import { uiActions } from '../../store/slices/ui';

const getArtists = (artists) => {
  return artists.slice(0, 3).map((a, i) => (
    <span key={a.id}>
      <ArtistActionsWrapper artist={a} trigger={['contextMenu']}>
        <Link key={a.id} to={`/artist/${a.id}`} style={{ cursor: 'pointer' }}>
          {a.name}
        </Link>
      </ArtistActionsWrapper>
      {i < artists.slice(0, 3).length - 1 ? ', ' : ''}
    </span>
  ));
};

const ClickeableCover = ({ song, onPlay, isCurrent, isPlaying }) => {
  const button = (
    <button className='image-button' onClick={onPlay}>
      {isPlaying && isCurrent ? <Pause /> : <Play />}
    </button>
  );

  const imageUrl = (song?.album?.images || [])[0]?.url;
  if (!imageUrl) return null;

  return (
    <div className='image p-2 h-full items-center'>
      <div style={{ position: 'relative' }}>
        <div>
          <img
            src={imageUrl}
            alt={song.album.name}
            className='rounded-md'
            style={{ width: 40, height: 40 }}
          />
        </div>
        {button}
      </div>
    </div>
  );
};

const Title = ({ song, isList, isCurrent }) => (
  <div className='flex flex-col' style={{ flex: 8 }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className='flex flex-row items-center'>
          <p className={`title text-left ${isCurrent ? 'active' : ''}`}>
            <span>{song.name}</span> {song.explicit && !isList ? <span className='explicit'>E</span> : null}
          </p>
        </div>
        {isList && (
          <p className='text-left artist mobile-hidden'>
            {song.explicit ? <span className='explicit'>E</span> : null}
            {getArtists(song.artists)}
          </p>
        )}
      </div>
    </div>
  </div>
);

const Cover = ({ song, isList }) => {
  if (!isList) return null;
  const imageUrl = (song?.album?.images || [])[0]?.url;
  if (!imageUrl) return null;
  return <img alt='cover' src={imageUrl} className='w-10 h-10 mr-4 rounded-md' />;
};

const TitleWithCover = ({ song, isList, isCurrent }) => (
  <div className='flex flex-col' style={{ flex: 8 }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Cover song={song} isList={isList} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className='flex flex-row items-center'>
          <p className={`title text-left ${isCurrent ? 'active' : ''}`}>
            <span>{song.name}</span> {song.explicit && !isList ? <span className='explicit'>E</span> : null}
          </p>
        </div>
        {isList && (
          <p className='text-left artist mobile-hidden'>
            {song.explicit ? <span className='explicit'>E</span> : null}
            {getArtists(song.artists)}
          </p>
        )}
      </div>
    </div>
  </div>
);

const Artists = ({ song, isList }) => {
  if (isList) return null;
  return (
    <p className='text-left tablet-hidden' style={{ flex: 5 }}>
      {getArtists(song.artists)}
    </p>
  );
};

const Album = ({ song }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const onNavigate = useCallback(
    (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (!user) {
        dispatch(uiActions.openLoginModal(song.album.images[0]?.url));
        return;
      }
      navigate(`/album/${song.album.id}`);
    },
    [user, navigate, song.album.id, song.album.images, dispatch]
  );

  return (
    <p className='text-left tablet-hidden' style={{ flex: 5 }}>
      <Link to={`/album/${song.album.id}`} onClick={onNavigate}>
        {song.album.name}
      </Link>
    </p>
  );
};

const AddedAt = ({ addedAt }) => {
  const language = useAppSelector((state) => state.language.language);
  if (!addedAt) return null;
  return (
    <p className='text-left tablet-hidden' style={{ flex: 3 }}>
      <ReactTimeAgo date={new Date(addedAt)} locale={language === 'vi' ? 'vi' : undefined} />
    </p>
  );
};

const AddToLiked = ({ song, saved, onLikeRefresh }) => {
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track?.id);

  return (
    <p className='text-right tablet-hidden' style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
      <AddSongToLibraryButton
        size={18}
        id={song.id}
        isSaved={!!saved}
        onToggle={() => {
          if (onLikeRefresh) onLikeRefresh(song.id);
          if (currentSong === song.id) dispatch(spotifyActions.setLiked({ liked: !saved }));
        }}
      />
    </p>
  );
};

const Actions = ({ song }) => (
  <p className='text-right actions tablet-hidden' style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
    <TrackActionsWrapper track={song} trigger={['click']}>
      <Tooltip title={`Tùy chọn khác cho ${song.name}`}>
        <div>
          <MenuIcon />
        </div>
      </Tooltip>
    </TrackActionsWrapper>
  </p>
);

const Time = ({ song }) => (
  <p className='text-right' style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
    {msToTime(song.duration_ms)}
  </p>
);

const Index = ({ index, isCurrent, isPlaying, onClick }) => (
  <div style={{ flex: 1 }} className='mobile-hidden'>
    <p className='song-details-index'>
      {isCurrent && isPlaying ? (
        <img alt='equaliser' style={{ height: 10, margin: '0 auto' }} src={EQUILISER_IMAGE} />
      ) : (
        <span style={{ margin: '0 auto' }}>{index + 1}</span>
      )}
    </p>
    <button className='song-details-play' onClick={onClick}>
      {isCurrent && isPlaying ? <Pause /> : <Play />}
    </button>
  </div>
);

const SongView = (props) => {
  const { size = 'normal', view, song, index, context, artist, playlist, canEdit, fields, album } = props;

  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  const isPlaying = useAppSelector((state) => !!state.spotify.state?.paused);
  const currentSong = useAppSelector((state) => state.spotify.state?.track_window.current_track);

  const isCurrent = useMemo(() => currentSong?.uri === song.uri, [currentSong, song]);
  const selectedView = isMobile ? 'LIST' : view;
  const isList = selectedView === 'LIST';

  const onClick = useCallback(() => {
    if (!user) {
      dispatch(uiActions.openLoginModal(song.album?.images?.[0]?.url));
      return;
    }
    if (isCurrent && isPlaying) {
      return playerService.pausePlayback();
    }
    if (isCurrent) {
      return playerService.startPlayback();
    }
    return playerService.startPlayback(context);
  }, [user, isCurrent, isPlaying, context, dispatch, song.album?.images]);

  return (
    <TrackActionsWrapper
      track={song}
      album={album}
      artist={artist}
      canEdit={canEdit}
      playlist={playlist}
      trigger={['contextMenu']}
      saved={props.onToggleLike ? props.saved : undefined}
      onSavedToggle={props.onToggleLike ? props.onToggleLike : undefined}
    >
      <button
        onClick={isMobile ? onClick : undefined}
        onDoubleClick={!isMobile ? onClick : undefined}
        className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center ${
          size === 'normal' ? 'p-2' : ''
        } rounded-lg ${props.activable ? 'activable-song' : ''}`}
      >
        <div className='song-details flex flex-row items-center w-full'>
          <div className='flex flex-row items-center justify-between w-full'>
            {index !== undefined && (
              <Index index={index} isCurrent={isCurrent} isPlaying={isPlaying} onClick={onClick} />
            )}
            {fields.map((Field, i) => (
              <Field
                key={i}
                isList={isList}
                onPlay={onClick}
                isCurrent={isCurrent}
                isPlaying={isPlaying}
                {...props}
              />
            ))}
          </div>
        </div>
      </button>
    </TrackActionsWrapper>
  );
};

export default SongView;

export const SongViewComponents = {
  Title,
  ClickeableCover,
  TitleWithCover,
  Artists,
  Cover,
  Album,
  AddedAt,
  AddToLiked,
  Actions,
  Time,
};
