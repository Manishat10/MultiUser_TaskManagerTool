// features/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../services/userService";

export const fetchAllUsersThunk = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllUsers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allUsers: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchAllUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;