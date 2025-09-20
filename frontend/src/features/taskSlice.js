import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasks,createTask,updateTask,deleteTask,getTask } from "../services/taskService";
import { isPending, isRejected } from '@reduxjs/toolkit';


export const fetchTasksThunk= createAsyncThunk(
    "tasks/fetchTasksThunk",
    async (filters = {}, { rejectWithValue }) => {
        try {
            return await fetchTasks(filters);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const createTaskThunk= createAsyncThunk(
    "tasks/createTaskThunk",
    async(taskData, {rejectWithValue})=>{
        try{
            return await createTask(taskData);
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
);
export const deleteTaskThunk = createAsyncThunk(
    "tasks/deleteTaskThunk",
    async(taskId,{rejectWithValue})=>{
        try{
            await deleteTask(taskId);
            return taskId;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
);

export const updateTaskThunk= createAsyncThunk(
    "tasks/updateTaskThunk",
    async({taskId,taskData},{rejectWithValue})=>{
        try{
            return await updateTask(taskId,taskData);
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
);

const initialState={
    tasks:[],
    loading:false,
    error:null,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(createTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(deleteTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(updateTaskThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addMatcher(
                isPending(fetchTasksThunk,createTaskThunk,deleteTaskThunk,updateTaskThunk),
                 (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(
                isRejected(fetchTasksThunk,createTaskThunk,deleteTaskThunk,updateTaskThunk), 
                (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export default taskSlice.reducer;