import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLocalFavorites, setLocalFavorites, getUserFavorites, setUserFavorites } from '../services/favoritesService';

const initialState = {
  items: [],
  loading: false,
  error: null,
  merged: false,
};

export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async (uid, { rejectWithValue }) => {
    try {
      if (uid) {
        return await getUserFavorites(uid);
      } else {
        return getLocalFavorites();
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const mergeFavorites = createAsyncThunk(
  'favorites/mergeFavorites',
  async ({ uid, localFavorites }, { rejectWithValue }) => {
    try {
      const serverFavorites = await getUserFavorites(uid);
      const merged = Array.from(new Set([...serverFavorites, ...localFavorites]));
      await setUserFavorites(uid, merged);
      setLocalFavorites([]);
      return merged;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        if (action.meta?.uid) {
          setUserFavorites(action.meta.uid, state.items); 
        } else {
          setLocalFavorites(state.items); 
        }
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item !== action.payload);
      if (action.meta?.uid) {
        setUserFavorites(action.meta.uid, state.items); 
      } else {
        setLocalFavorites(state.items); 
      }
    },
    setFavorites(state, action) {
      state.items = action.payload;
    },
    setMerged(state, action) {
      state.merged = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
      })
      .addCase(loadFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(mergeFavorites.fulfilled, (state, action) => {
        state.items = action.payload;
        state.merged = true;
      });
  },
});

export const { addFavorite, removeFavorite, setFavorites, setMerged } = favoritesSlice.actions;
export default favoritesSlice.reducer;
