import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";

const rootReducer=combineReducers({
    [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [authApi.reducerPath]:authApi.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    auth:authReducer
});


export default rootReducer;
