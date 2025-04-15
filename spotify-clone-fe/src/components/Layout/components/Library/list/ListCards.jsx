// Cleaned React component without external service dependencies
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tooltip } from '../../../../Tooltip';
import { SpeakerIcon } from '../../../../Icons';

import {
  ARTISTS_DEFAULT_IMAGE,
  PLAYLIST_DEFAULT_IMAGE,
} from '../../../../../constants/spotify';

const Play = (
  <svg role="img" width={26} height={26} fill="white" viewBox="0 0 24 24">
    <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
  </svg>
);

const Pause = (
  <svg role="img" width={26} height={26} fill="white" viewBox="0 0 24 24">
    <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const CollapsedCard = ({ image, title, subtitle, onClick, onDoubleClick, rounded }) => (
  <Tooltip
    placement="right"
    title={
      <div>
        <p>{title}</p>
        <p style={{ fontSize: 13, color: 'gray', fontWeight: 400 }}>{subtitle}</p>
      </div>
    }
  >
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className="library-card collapsed"
      style={{ borderRadius: 10, display: 'flex', justifyContent: 'center' }}
    >
      <div className={`image h-full items-center ${rounded ? 'rounded' : ''}`}>
        <div className="image-container">
          <img src={image} alt="" style={{ width: 52, height: 52 }} />
        </div>
      </div>
    </button>
  </Tooltip>
);

const CardList = ({ image, title, subtitle, onClick, onDoubleClick, isCurrent, disabled, rounded }) => {
  const isPlaying = false; // mock state
  const button = disabled ? null : (
    <button className="image-button" onClick={(e) => e.stopPropagation()}>
      {isCurrent && isPlaying ? Pause : Play}
    </button>
  );

  return (
    <button
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className="library-card"
      style={{ borderRadius: 10 }}
    >
      <div className={`image p-2 h-full items-center ${rounded ? 'rounded' : ''}`}>
        <div style={{ position: 'relative' }}>
          <img src={image} alt="cover" className="rounded-md" style={{ width: 52, height: 52 }} />
          {button}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <h3
            className="text-md font-semibold"
            style={{
              fontSize: 15,
              marginBottom: -5,
              color: isCurrent ? '#1db954' : undefined,
              fontWeight: 100,
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: 13, opacity: 0.7, fontWeight: 400 }}>{subtitle}</p>
        </div>
        {isCurrent && <SpeakerIcon fill="#1db954" height={16} width={16} />}
      </div>
    </button>
  );
};

const Card = memo((props) => {
  const collapsed = false; // mock collapsed state
  const onDoubleClick = () => console.log('Double click playback mock');

  return collapsed
    ? <CollapsedCard {...props} onDoubleClick={onDoubleClick} />
    : <CardList {...props} onDoubleClick={onDoubleClick} />;
});

export const ArtistCardShort = ({ artist }) => {
  const navigate = useNavigate();
  const onClick = () => navigate(`/artist/${artist.id}`);
  return (
    <Card
      rounded
      subtitle="Artist"
      onClick={onClick}
      title={artist.name}
      isCurrent={false}
      image={artist?.images[0]?.url || ARTISTS_DEFAULT_IMAGE}
    />
  );
};

export const AlbumCardShort = memo(({ album }) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => navigate(`/album/${album.id}`), [album.id, navigate]);

  return (
    <Card
      uri={album.uri}
      onClick={onClick}
      title={album.name}
      image={album?.images?.[0]?.url ?? 'https://via.placeholder.com/300'}
      subtitle={album?.artists?.[0]?.name ?? 'Unknown Artist'}
      isCurrent={false}
    />
  );
});

const PlaylistCardShort = memo(({ playlist }) => {
  const navigate = useNavigate();
  const onClick = () => navigate(`/playlist/${playlist.id}`);

  return (
    <Card
      onClick={onClick}
      uri={playlist.uri}
      title={playlist.name}
      disabled={!playlist.tracks?.total}
      isCurrent={false}
      subtitle={`Playlist • ${playlist.owner?.display_name}`}
      image={playlist?.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE}
    />
  );
});

export const ListItemComponent = ({ item }) => {
  if (item.type === 'artist') return <ArtistCardShort key={item.id} artist={item} />;
  if (item.type === 'album') return <AlbumCardShort key={item.id} album={item} />;
  return <PlaylistCardShort key={item.id} playlist={item} />;
};