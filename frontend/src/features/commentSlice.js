import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments, addComment } from "../services/commentService";
import { isPending, isRejected } from '@reduxjs/toolkit';

export const fetchCommentsThunk = createAsyncThunk(
    "comments/fetchCommentsThunk",
    async (taskId, { rejectWithValue }) => {
        try {
            return await fetchComments(taskId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addCommentThunk = createAsyncThunk(
    "comments/addCommentThunk",
    async ({ taskId, text }, { rejectWithValue }) => {
        try {
            return await addComment(taskId, text);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    comments: {},
    loading: false,
    error: null,
};

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
                state.loading = false;
                const taskId = action.meta.arg;
                state.comments[taskId] = action.payload;
            })
            .addCase(addCommentThunk.fulfilled, (state, action) => {
                state.loading = false;
                const newComment=action.payload;
                const taskId=action.meta.arg.taskId;
                if(state.comments[taskId]){
                    state.comments[taskId].push(newComment);
                }
            })
            .addMatcher(
                isPending(fetchCommentsThunk, addCommentThunk),
                 (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isRejected(
                fetchCommentsThunk,addCommentThunk),
                 (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default commentSlice.reducer;