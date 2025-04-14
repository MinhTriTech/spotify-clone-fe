import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpeakerIcon } from '../../../../Icons';
import { CollapsedCard } from './ListCards';
import AlbumActionsWrapper  from '../../../../Actions/AlbumActions';
import ArtistActionsWrapper from '../../../../Actions/ArtistActions';
import PlayistActionsWrapper from '../../../../Actions/PlaylistActions';

import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { playerService } from '../../../../../services/player';
import { uiActions } from '../../../../../store/slices/ui';
import { yourLibraryActions } from '../../../../../store/slices/yourLibrary';

import {
  ARTISTS_DEFAULT_IMAGE,
  PLAYLIST_DEFAULT_IMAGE,
} from '../../../../../constants/spotify';

const CardCompact = ({ title, subtitle, isCurrent, onClick, onDoubleClick }) => {
  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className="library-card"
      style={{ borderRadius: 10 }}
    >
      <div
        style={{
          width: '100%',
          paddingLeft: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: 5, width: '100%', alignItems: 'center' }}>
          <h3
            className="text-md font-semibold text-white"
            style={{
              fontSize: 15,
              fontWeight: 100,
              lineHeight: 2.1,
              maxWidth: subtitle ? '60%' : undefined,
              color: isCurrent ? '#1db954' : undefined,
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
          {isCurrent && <SpeakerIcon fill="#1db954" height={13} width={13} />}
        </div>
      </div>
    </button>
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

  return <CardCompact {...props} onDoubleClick={onDoubleClick} />;
});

const ArtistCardShort = memo(({ artist }) => {
  const navigate = useNavigate();
  const filter = useAppSelector((state) => state.yourLibrary.filter);
  const contextUri = useAppSelector((state) => state.spotify.state?.context.uri);

  const onClick = useCallback(() => {
    navigate(`/artist/${artist.id}`);
  }, [navigate, artist.id]);

  return (
    <ArtistActionsWrapper artist={artist} trigger={['contextMenu']}>
      <Card
        rounded
        uri={artist.uri}
        onClick={onClick}
        title={artist.name}
        isCurrent={contextUri === artist.uri}
        subtitle={filter === 'ALL' ? '• Artist' : ''}
        image={artist?.images?.[0]?.url || ARTISTS_DEFAULT_IMAGE}
      />
    </ArtistActionsWrapper>
  );
});

const AlbumCardShort = memo(({ album }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const filter = useAppSelector((state) => state.yourLibrary.filter);
  const contextUri = useAppSelector((state) => state.spotify.state?.context.uri);

  const onClick = useCallback(() => {
    if (!userId) {
      return dispatch(uiActions.openLoginModal(album.images[0].url));
    }
    navigate(`/album/${album.id}`);
  }, [userId, navigate, album.id, album.images, dispatch]);

  return (
    <AlbumActionsWrapper album={album} trigger={['contextMenu']}>
      <Card
        uri={album.uri}
        onClick={onClick}
        title={album.name}
        image={album.images[0].url}
        isCurrent={contextUri === album.uri}
        subtitle={filter === 'ALL' ? '• Album' : `• ${album.artists[0].name}`}
      />
    </AlbumActionsWrapper>
  );
});

const PlaylistCardShort = memo(({ playlist }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filter = useAppSelector((state) => state.yourLibrary.filter);
  const contextUri = useAppSelector((state) => state.spotify.state?.context.uri);

  const onClick = useCallback(() => {
    navigate(`/playlist/${playlist.id}`);
  }, [navigate, playlist.id]);

  return (
    <PlayistActionsWrapper
      playlist={playlist}
      trigger={['contextMenu']}
      onRefresh={() => dispatch(yourLibraryActions.fetchMyPlaylists())}
    >
      <Card
        onClick={onClick}
        uri={playlist.uri}
        title={playlist.name}
        isCurrent={contextUri === playlist.uri}
        subtitle={filter === 'ALL' ? '• Playlist' : ''}
        image={playlist?.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE}
      />
    </PlayistActionsWrapper>
  );
});

export const CompactItemComponent = ({ item }) => {
  if (item.type === 'artist') return <ArtistCardShort key={item.id} artist={item} />;
  if (item.type === 'album') return <AlbumCardShort key={item.id} album={item} />;
  return <PlaylistCardShort key={item.id} playlist={item} />;
};
