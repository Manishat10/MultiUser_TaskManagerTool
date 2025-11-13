import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import taskReducer from "../features/taskSlice";
import commentReducer from "../features/commentSlice";
import userReducer from "../features/userSlice";
import adminReducer from "../features/adminSlice";

const store=configureStore({
    reducer:{
        auth:authReducer,
        tasks:taskReducer,
        comments:commentReducer,
        users:userReducer,
        admin:adminReducer,
    },
});
export default store;