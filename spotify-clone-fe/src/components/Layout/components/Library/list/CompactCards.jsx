// Cleaned CardCompact and CompactItemComponent without service dependencies
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { SpeakerIcon } from '../../../../Icons';
import { CollapsedCard } from './ListCards';

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
  const collapsed = false; // mock state
  const onDoubleClick = () => console.log('Mock double-click playback');

  if (collapsed) {
    return <CollapsedCard {...props} onDoubleClick={onDoubleClick} />;
  }

  return <CardCompact {...props} onDoubleClick={onDoubleClick} />;
});

const ArtistCardShort = memo(({ artist }) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/artist/${artist.id}`);
  }, [navigate, artist.id]);

  return (
    <Card
      rounded
      uri={artist.uri}
      onClick={onClick}
      title={artist.name}
      isCurrent={false}
      subtitle={'• Artist'}
      image={artist?.images?.[0]?.url || ARTISTS_DEFAULT_IMAGE}
    />
  );
});

const AlbumCardShort = memo(({ album }) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/album/${album.id}`);
  }, [navigate, album.id]);

  return (
    <Card
      uri={album.uri}
      onClick={onClick}
      title={album.name}
      image={album.images[0].url}
      isCurrent={false}
      subtitle={`• ${album.artists[0].name}`}
    />
  );
});

const PlaylistCardShort = memo(({ playlist }) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/playlist/${playlist.id}`);
  }, [navigate, playlist.id]);

  return (
    <Card
      onClick={onClick}
      uri={playlist.uri}
      title={playlist.name}
      isCurrent={false}
      subtitle={'• Playlist'}
      image={playlist?.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE}
    />
  );
});

export const CompactItemComponent = ({ item }) => {
  if (item.type === 'artist') return <ArtistCardShort key={item.id} artist={item} />;
  if (item.type === 'album') return <AlbumCardShort key={item.id} album={item} />;
  return <PlaylistCardShort key={item.id} playlist={item} />;
};