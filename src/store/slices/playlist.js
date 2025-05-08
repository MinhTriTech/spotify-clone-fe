import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { playlistService } from '../../services/playlists';

const initialState = {
  tracks: [],
  playlist: null,
  canEdit: false,
  songsOfFeaturePlaylist: [],
  songsOfLikedSong: [],
  songsOfAlbum: [],
  view: 'LIST',
};

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async (id) => {
    const response = await playlistService.getPlaylist(id);
    return response.data;
  }
);

export const refreshPlaylist = createAsyncThunk(
  'playlist/refreshPlaylist',
  async (id) => {
    const response = await playlistService.getPlaylist(id);
    return response.data;
  }
);

export const getSongsOfFeaturedPlaylist = createAsyncThunk(
  'playlist/getSongsOfFeaturedPlaylist',
  async (id) => {
    const response = await playlistService.getSongsOfFeaturedPlaylist(id);
    return response.data;
  }
);

export const getSongsOfLikedSong = createAsyncThunk('playlist/getSongsOfLikedSong', async () => {
  const response = await playlistService.getSongsOfLikedSong();
  return response.data;
});

export const getSongsOfAlbum = createAsyncThunk('playlist/getSongsOfAlbum', async (id) => {
  const response = await playlistService.getSongsOfAlbum(id);
  return response.data;
});

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload.playlist;
      if (!action.payload.playlist) {
        state.tracks = [];
        state.following = false;
        state.canEdit = false;
        state.view = 'LIST';
      }
    },
    removeTrack(state, action) {
      state.tracks = state.tracks.filter((track) => track.song_id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload.playlist;
      state.tracks = action.payload.songs;
      state.canEdit = action.payload.is_owner;
    });
    builder.addCase(refreshPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload.playlist;
    });

    builder.addCase(getSongsOfFeaturedPlaylist.fulfilled, (state, action) => {
      state.songsOfFeaturePlaylist = action.payload;
    });
    builder.addCase(getSongsOfLikedSong.fulfilled, (state, action) => {
      state.songsOfLikedSong = action.payload;
    });
    builder.addCase(getSongsOfAlbum.fulfilled, (state, action) => {
      state.songsOfAlbum = action.payload;
    });
    
  },
});

export const playlistActions = {
  fetchPlaylist,
  refreshPlaylist,

  getSongsOfFeaturedPlaylist,
  getSongsOfLikedSong,
  getSongsOfAlbum,
  
  ...playlistSlice.actions,
};

export default playlistSlice.reducer;
