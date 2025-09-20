import { createSlice, createAsyncThunk, isPending, isRejected } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, checkAuth } from "../services/authService";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const checkAuthThunk = createAsyncThunk(
  "auth/checkAuthThunk",
  async (_, { rejectWithValue }) => {
    try {
      const data = await checkAuth();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const data = await registerUser(userInfo);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload.user;
        } else {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addCase(checkAuthThunk.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
      })
      .addMatcher(
        isPending(login, register, logout, checkAuthThunk),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(login, register, logout, checkAuthThunk),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;