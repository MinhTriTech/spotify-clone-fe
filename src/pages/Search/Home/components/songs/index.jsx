import React from 'react';
import SongView from './song';
import { useAppSelector } from '../../../../../store/store';

export const SearchedSongs = () => {
  const songs = useAppSelector((state) => state.search.songs);

  if (!songs || songs.length === 0) return null; 
  
  return (
    <div className='search-songs-container'>
      <h1 className='section-title'>Bài hát</h1>
      
      <div>
        {songs.map((song, index) => (
          <SongView song={song} key={song.song_id} index={index} />
        ))}
      </div>
    </div>
  );
};
