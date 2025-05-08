import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { uiActions } from '../../store/slices/ui';
import { useAudio } from '../../contexts/AudioContext';
import { getSongsOfPlaylist } from '../../store/slices/playlist';
import { getSongsOfAlbum } from '../../store/slices/album'; 
import { fetchArtist } from '../../store/slices/artist';
import { fetchLikeSongs } from '../../store/slices/likedSongs';

export const PlayCircle = ({ size = 20, big, isCurrent, context }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const { 
    isPlaying, 
    play, 
    pause, 
    setSrc, 
    setPlaylistAndPlay, 
    currentTrack,
    currentPlaylistId,
    currentArtistId,
    updateCurrentPlaylistId,
    updateCurrentArtistId,
    currentLikedSongId,
    updateCurrentLikedSongId,
    currentAlbumId,
    updateCurrentAlbumId,
  } = useAudio();

  const isThisTrackPlaying = useCallback(() => {
    if (!isPlaying || !context) return false;
  
    if (context.type === "playlist") {
      return context.id === currentPlaylistId;
    }

    if (context.type === "artist") {
      return context.id === currentArtistId;
    }

    if (context.type === "likedSongs") {
      return context.id === currentLikedSongId;
    }

    if (context.type === "album") {
      return context.id === currentAlbumId;
    }
  
    if (context.file_path && currentTrack?.id) {
      return context.song_id === currentTrack.id;
    }
  
    return false;
  }, [isPlaying, context, currentTrack, currentPlaylistId, currentArtistId, currentLikedSongId, currentAlbumId]);

  const isPlaylist = context && 'id' in context && 'type' in context && context.type === 'playlist';

  const isArtist = context && 'id' in context && 'type' in context && context.type === 'artist';

  const isLikedSong = context && 'id' in context && 'type' in context && context.type === 'likedSongs';

  const isAlbum = context && 'id' in context && 'type' in context && context.type === 'album';

  const onClick = useCallback(
    async (e) => {
      if (e?.stopPropagation) e.stopPropagation();

      if (!user) {
        return dispatch(uiActions.openLoginModal(context?.image));
      }

      const isSingle = context?.file_path;

      if (isSingle) {
        updateCurrentPlaylistId(null);
        updateCurrentArtistId(null);
        updateCurrentLikedSongId(null);
        updateCurrentAlbumId(null);
        if (!isCurrent) {
          setSrc(context.file_path, {
            id: context.song_id,
            title: context.title,
            artists: context.artists,
            image: context.image,
            video: context.video_url,
          });
          play();
        } else {
          isThisTrackPlaying() ? pause() : play();
        }
        return;
      }

      if (isPlaylist && isCurrent) {
        isThisTrackPlaying() ? pause() : play();
        return;
      }

      if (isArtist && isCurrent) {
        isThisTrackPlaying() ? pause() : play();
        return;
      }

      if (isLikedSong && isCurrent) {
        isThisTrackPlaying() ? pause() : play();
        return;
      }

      if (isAlbum && isCurrent) {
        isThisTrackPlaying() ? pause() : play();
        return;
      }

      if (isPlaylist && context?.id) {
        try {
          const tracks = await dispatch(getSongsOfPlaylist(context.id)).unwrap();

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
      } else if (isArtist && context?.id) {
        try {
          const tracks = await dispatch(fetchArtist(context.id)).unwrap();

          if (tracks.songs && tracks.songs.length > 0) {
            const formattedTracks = tracks.songs.map(track => ({
              id: track.song_id,
              title: track.title,
              artists: track.artists,
              image: track.image,
              src: track.file_path,
              video: track.video_url,
            }));

            await setPlaylistAndPlay(formattedTracks, 0, null, context.id);
          }
        } catch (error) {
          console.error('Error playing playlist:', error);
        }
      } else if (isLikedSong && context?.id) {
        try {
          const tracks = await dispatch(fetchLikeSongs()).unwrap();
          
          if (tracks && tracks.length > 0) {
            const formattedTracks = tracks.map(track => ({
              id: track.song_id,
              title: track.title,
              artists: track.artists,
              image: track.image,
              src: track.file_path,
              video: track.video_url,
            }));

            await setPlaylistAndPlay(formattedTracks, 0, null, null, context.id);
          }
        } catch (error) {
          console.error('Error playing playlist:', error);
        }
      } else if (isAlbum && context?.id) {
        try {
          const tracks = await dispatch(getSongsOfAlbum(context.id)).unwrap();
          
          if (tracks && tracks.length > 0) {
            const formattedTracks = tracks.map(track => ({
              id: track.song_id,
              title: track.title,
              artists: track.artists,
              image: track.image,
              src: track.file_path,
              video: track.video_url,
            }));

            await setPlaylistAndPlay(formattedTracks, 0, null, null, null, context.id);
          }
        } catch (error) {
          console.error('Error playing playlist:', error);
        }
      }
    },
    [
      user,
      dispatch,
      context,
      isPlaylist,
      isCurrent,
      isThisTrackPlaying,
      setSrc,
      play,
      pause,
    ]   
  );

  return (
    <button
      onClick={onClick}
      className={`${big ? 'circle-play big' : 'circle-play'} 
                 ${isThisTrackPlaying() ? 'active' : ''}`}
    >
      <span>
        {!isThisTrackPlaying() ? (
          <svg
          style={{ height: size }}
          data-encore-id='icon'
          role='img'
          aria-hidden='true'
          viewBox='0 0 16 16'
        >
          <path d='M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z'></path>
        </svg>
        ) : (
          <svg
            style={{ height: size }}
            data-encore-id='icon'
            role='img'
            aria-hidden='true'
            viewBox='0 0 24 24'
          >
            <path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
          </svg>
        )}
      </span>
    </button>
  );
};
