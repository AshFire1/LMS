import { createSlice } from "@reduxjs/toolkit";


interface State{
    user:any,
    isAuthenticated:boolean
}
const initialState={
    user:null,
    isAuthenticated:false
};



const authSlice=createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        userLoggedIn:(state:State,action:any)=>{
            state.user=action.payload.user;
            state.isAuthenticated=true;
        },
        userLoggedOut:(state:State)=>{
            state.user=null;
            state.isAuthenticated=false;
        }

    }
})
export const {userLoggedIn,userLoggedOut}=authSlice.actions;

export default authSlice.reducer;