import { Tooltip } from 'antd';
import { useCallback, useMemo } from 'react';
import { MenuIcon, Pause, Play } from '../Icons';
import TrackActionsWrapper from '../Actions/TrackActions';

import { useAppDispatch, useAppSelector } from '../../store/store';

import { Link } from 'react-router-dom';
import ArtistActionsWrapper from '../Actions/ArtistActions';

import { EQUILISER_IMAGE } from '../../constants/spotify';
import { uiActions } from '../../store/slices/ui';

import { useAudio } from '../../contexts/AudioContext';

const getArtists = (artists) => {
  return artists.slice(0, 3).map((a, i) => (
    <span key={a.artist_id}>
      <ArtistActionsWrapper artist={a} trigger={['contextMenu']}>
        <Link key={a.artist_id} to={`/artist/${a.artist_id}`} style={{ cursor: 'pointer' }}>
          {a.name}
        </Link>
      </ArtistActionsWrapper>
      {i < artists.slice(0, 3).length - 1 ? ', ' : ''}
    </span>
  ));
};

const Title = (props) => {
  const { song, isList, isCurrent } = props;

  return (
    <>
      <div className='flex flex-col' style={{ flex: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='flex flex-row items-center'>
              <p className={`title text-left ${isCurrent ? 'active' : ''}`}>
                <span>{song.name}</span>{' '}
                {song.explicit && !isList ? <span className='explicit'>18+</span> : null}
              </p>
            </div>

            {isList ? (
              <p className='text-left artist mobile-hidden'>
                {song.explicit ? <span className='explicit'>18+</span> : null}
                {getArtists(song.artists)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const Cover = ({ song, isList }) => {
  if (!isList) return null;

  const imageUrl = song?.image;
  if (!imageUrl) return null;

  return (
    <img alt='Bìa bài hát' src={song?.image} className='w-10 h-10 mr-4 rounded-md' />
  );
};

const TitleWithCover = (props) => {
  
  const { song, isList, isCurrent } = props;
  
  return (
    <div className='flex flex-col' style={{ flex: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Cover {...props} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='flex flex-row items-center'>
            <p className={`title text-left ${isCurrent ? 'active' : ''}`}>
              <span>{song.title}</span>{' '}
            </p>
          </div>
          {isList ? (
            <p className='text-left artist mobile-hidden'>
              {getArtists(song.artists)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Artists = ({ song, isList }) => {
  if (isList) return null;
  return (
    <p className='text-left tablet-hidden' style={{ flex: 5 }}>
      {getArtists(song.artists)}
    </p>
  );
};

const Actions = ({ song }) => {
  return (
    <div className='text-right actions tablet-hidden' style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <TrackActionsWrapper track={song} trigger={['click']}>
        <Tooltip title={`Tùy chọn khác cho ${song.title}`}>
          <div>
            <MenuIcon />
          </div>
        </Tooltip>
      </TrackActionsWrapper>
    </div>
  );
};

const Index = ({ index, isCurrent, isPlaying, onClick }) => {
  return (
    <div style={{ flex: 1 }} className='mobile-hidden'>
      <p className='song-details-index'>
        {isCurrent && isPlaying ? (
          <img alt='equaliser' style={{ height: 10, margin: '0 auto' }} src={EQUILISER_IMAGE} />
        ) : (
          <span style={{ margin: '0 auto' }}>{index + 1}</span>
        )}
      </p>
      <div
        className='song-details-play'
        role='button'
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
      >
        {isCurrent && isPlaying ? <Pause /> : <Play />}
      </div>
    </div>
  );
};

export const SongView = (props) => {
  const { size = 'normal' } = props;
  const { activable, view, song, index, artist, fields, canEdit } = props;
  const { isPlaying, currentTrack, play, pause, setSrc, updateCurrentPlaylistId, updateCurrentArtistId, updateCurrentLikedSongId, updateCurrentAlbumId } = useAudio(); 

  const isCurrent = useMemo(() => {
    return song && song.song_id && currentTrack?.id === song.song_id;
  }, [song, currentTrack]);
  
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  const selectedView = view;
  const isList = selectedView === 'LIST';


  const isThisTrackPlaying = useCallback(() => {
    if (!isPlaying || !song) return false;
  
    if (song.file_path && currentTrack?.id) {
      return song.song_id === currentTrack.id;
    }
  
    return false;
  }, [isPlaying, song, currentTrack]);

  const onClick = useCallback(() => {
    updateCurrentPlaylistId(null);
    updateCurrentArtistId(null);
    updateCurrentLikedSongId(null);
    updateCurrentAlbumId(null);
    if (!user) {
      return dispatch(uiActions.openLoginModal(song.image));
    }

    if (!isCurrent) {
      setSrc(song.file_path, {
        id: song.song_id,
        title: song.title,
        artists: song.artists,
        image: song.image,
        video: song.video_url,
      });
      play();
    } else {
      isThisTrackPlaying() ? pause() : play();
    }

  }, [user, dispatch, song.image, currentTrack, pause, play, isThisTrackPlaying]);

  return (
    <TrackActionsWrapper
      canEdit={canEdit}
      track={song}
      key={song.song_id}
      artist={artist}
      trigger={['contextMenu']}
    >
      <button
        className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center ${
          size === 'normal' ? 'p-2' : ''
        } rounded-lg ${activable ? 'activable-song' : ''}`}
      >
        <div className='song-details flex flex-row items-center w-full'>
          <div className='flex flex-row items-center justify-between w-full'>
            {index !== undefined ? (
              <Index index={index} isCurrent={isCurrent} isPlaying={isPlaying} onClick={onClick} />
            ) : null}
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
  TitleWithCover,
  Artists,
  Cover,
  Actions,
};
