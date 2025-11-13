import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllTasks, fetchAllComments } from "../services/adminService";

// Async thunk to fetch all tasks (admin only)
export const fetchAllTasksThunk = createAsyncThunk(
  "admin/fetchAllTasks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllTasks();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch all comments (admin only)
export const fetchAllCommentsThunk = createAsyncThunk(
  "admin/fetchAllComments",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllComments();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tasks: [],
  comments: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminData: (state) => {
      state.tasks = [];
      state.comments = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all tasks
      .addCase(fetchAllTasksThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTasksThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasksThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all comments
      .addCase(fetchAllCommentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCommentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchAllCommentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminData } = adminSlice.actions;
export default adminSlice.reducer;