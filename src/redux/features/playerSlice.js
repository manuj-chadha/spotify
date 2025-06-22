import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      const { song, data, i } = action.payload;
      state.activeSong = song;

      if (data?.tracks?.hits) {
        // e.g., Shazam search results
        state.currentSongs = data.tracks.hits.map(hit => hit.track || hit);
      } else if (data?.tracks && data?.properties) {
        // e.g., related songs API
        state.currentSongs = data.tracks;
      } else {
        // default: pure array of songs
        state.currentSongs = data;
      }

      state.currentIndex = i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      const next = state.currentSongs[action.payload];

      state.activeSong = next?.track || next;
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      const prev = state.currentSongs[action.payload];

      state.activeSong = prev?.track || prev;
      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
} = playerSlice.actions;

export default playerSlice.reducer;
