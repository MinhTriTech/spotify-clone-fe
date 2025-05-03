import { Tooltip } from '../../../../Tooltip';
import { SpeakerIcon } from '../../../../Icons';
import AlbumActionsWrapper from '../../../../Actions/AlbumActions';
import ArtistActionsWrapper from '../../../../Actions/ArtistActions';
import PlayistActionsWrapper from '../../../../Actions/PlaylistActions';

import { useNavigate } from 'react-router-dom';

import { playerService } from '../../../../../services/player';

import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { yourLibraryActions } from '../../../../../store/slices/yourLibrary';

import { ARTISTS_DEFAULT_IMAGE, PLAYLIST_DEFAULT_IMAGE } from '../../../../../constants/spotify';
import { memo, useCallback } from 'react';
import { uiActions } from '../../../../../store/slices/ui';

import { useAudio } from '../../../../../contexts/AudioContext'

import { fetchSongsOfFeaturedPlaylists, getSongsOfLikedSongs } from '../../../../../store/slices/home';

const Play = (
  <svg
    data-encore-id='icon'
    role='img'
    width={26}
    height={26}
    fill='white'
    aria-hidden='true'
    className='Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq'
    viewBox='0 0 24 24'
  >
    <path d='m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z'></path>
  </svg>
);

const Pause = (
  <svg
    data-encore-id='icon'
    role='img'
    width={26}
    height={26}
    fill='white'
    aria-hidden='true'
    className='Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq'
    viewBox='0 0 24 24'
  >
    <path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
  </svg>
);

export const CollapsedCard = (props) => {
  const { image, title, subtitle, onClick } = props;

  return (
    <Tooltip
      placement='right'
      title={
        <div>
          <p>{title}</p>
          <p style={{ fontSize: 13, color: 'gray', fontWeight: 400 }}>{subtitle}</p>
        </div>
      }
    >
      <button
        onClick={onClick}
        className='library-card collapsed'
        onDoubleClick={props.onDoubleClick}
        style={{ borderRadius: 10, display: 'flex', justifyContent: 'center' }}
      >
        <div className={`image h-full items-center ${props.rounded ? 'rounded' : ''}`}>
          <div className='image-container'>
            <img src={image} alt='' style={{ width: 52, height: 52 }} />
          </div>
        </div>
      </button>
    </Tooltip>
  );
};

const CardList = (props) => {
  const { title, image, context, subtitle, onClick, disabled } = props;

  const dispatch = useAppDispatch();

  const {
    isPlaying,
    play,
    pause,
    playlist,
    currentIndex,
    currentTrack,
    currentPlaylistId,
    setPlaylistAndPlay,
  } = useAudio();

  const isCurrent =
    playlist.length > 0 &&
    currentIndex >= 0 &&
    currentPlaylistId === context?.id;

  const isThisTrackPlaying = isCurrent && isPlaying;

  const handleClick = async (e) => {
    e.stopPropagation?.();

    if (isCurrent) {
      return isThisTrackPlaying ? pause() : play();
    }

    try {
      const tracks = await dispatch(
        typeof context.id === 'number'
          ? fetchSongsOfFeaturedPlaylists(context.id)
          : getSongsOfLikedSongs()
      ).unwrap();

      console.log(tracks);
      

      if (tracks && tracks.length > 0) {
        const formattedTracks = tracks.map(track => ({
          id: track.song_id,
          title: track.title,
          artists: track.artists,
          image: track.image,
          src: track.file_path,
          video: track.video_url,
        }));

        await setPlaylistAndPlay(formattedTracks, 0, context.id);
      }
    } catch (error) {
      console.error('Error playing playlist:', error);
    }
  };

  const button = disabled ? null : (
    <button className="image-button" onClick={handleClick}>
      {isThisTrackPlaying ? Pause : Play}
    </button>
  );

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="library-card"
      style={{ borderRadius: 10 }}
      onDoubleClick={handleClick}
    >
      <div className={`image p-2 h-full items-center ${props.rounded ? 'rounded' : ''}`}>
        <div style={{ position: 'relative' }}>
          <img
            src={image}
            alt="playlist cover"
            className="rounded-md"
            style={{ width: 52, height: 52 }}
          />
          {button}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div id="playlist-song-and-artist-name">
          <h3
            className="text-md font-semibold text-white"
            style={{
              fontSize: 15,
              marginBottom: -5,
              color: isThisTrackPlaying ? '#1db954' : undefined,
              fontWeight: 100,
            }}
          >
            {title}
          </h3>

          <p
            className="text-md font-semibold text-white"
            style={{
              fontSize: 13,
              opacity: 0.7,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </p>
        </div>

        <div style={{ padding: 8 }}>
          {isThisTrackPlaying && <SpeakerIcon fill="#1db954" height={16} width={16} />}
        </div>
      </div>
    </div>
  );
};


const Card = memo((props) => {
  const collapsed = useAppSelector((state) => state.ui.libraryCollapsed);

  const onDoubleClick = () => {
    playerService.startPlayback({ context_uri: props.uri });
  };

  if (collapsed) {
    return <CollapsedCard {...props} onDoubleClick={onDoubleClick} />;
  }
  return <CardList {...props} onDoubleClick={onDoubleClick} />;
});

const ArtistCardShort = ({ artist }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/artist/${artist.id}`);
  };

  return (
    <ArtistActionsWrapper artist={artist} trigger={['contextMenu']}>
      <div>
        <Card
          rounded
          subtitle='Artist'
          onClick={onClick}
          title={artist.name}
          image={artist.image || ARTISTS_DEFAULT_IMAGE}
        />
      </div>
    </ArtistActionsWrapper>
  );
};

const PlaylistCardShort = memo(({ playlist }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    if (playlist.id) {
      navigate('/collection/tracks');
      return;
    }
    navigate(`/playlist/${playlist.playlist_id}`);
  };

  return (
    <PlayistActionsWrapper
      playlist={playlist}
      trigger={['contextMenu']}
      onRefresh={() => {
        dispatch(yourLibraryActions.fetchMyPlaylists());
      }}
    >
      <div>
        <Card
          onClick={onClick}
          title={playlist.title}
          image={playlist.image ? playlist.image : PLAYLIST_DEFAULT_IMAGE}
          context={{ 
            id: playlist.playlist_id ? playlist.playlist_id : "likedSongs",
            image: playlist.image ? playlist.image : PLAYLIST_DEFAULT_IMAGE,
            type: playlist.playlist_id ? "playlist" : "likedSongs",
            title: playlist.title
          }}
        />
      </div>
    </PlayistActionsWrapper>
  );
});

const getItemKey = (item) => {
  if (item.playlist_id) return `playlist-${item.playlist_id}`;
  if (item.artist_id) return `artist-${item.artist_id}`;
  if (item.id) return `likeSongs-${item.id}`;
  return `unknown-${Math.random()}`; 
};

export const ListItemComponent = ({ item }) => {
  const key = getItemKey(item);

  if (item.artist_id) return <ArtistCardShort key={key} artist={item} />;
  return <PlaylistCardShort key={key} playlist={item} />;
};
