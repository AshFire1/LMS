import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {userLoggedIn, userLoggedOut} from "../authSlice"
const USER_API="http://localhost:8080/api/v1/user/"
export const authApi=createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(inputData)=>({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser:builder.mutation({
            query:(inputData)=>({
                url:"login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try{
                    const result=await queryFulfilled;
                    //@ts-ignore
                    dispatch(userLoggedIn({user:result.data.user}))
                }catch(error){
                    console.log(error);
                }
            }
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try{
                    await queryFulfilled;
                    dispatch(userLoggedOut());
                }catch(e){
                    console.log(e);
                }
            }
        }),
        getUser:builder.query(({
            query:()=>({
                url:"profile",
                method:"GET"
            }),
            async onQueryStarted(_,{queryFulfilled,dispatch}){
                try{
                    const result=await queryFulfilled;
                    //@ts-ignore
                    dispatch(userLoggedIn({user:result.data.user}));
                }catch(error){
                    console.log(error);
                }
            }
        })),
        updateUser:builder.mutation({
            query:(inputData)=>({
                url:"profile/update",
                method:"PUT",
                body:inputData,
                credentials:"include"
            })
        })
    })
});
export const {useLogoutUserMutation,useUpdateUserMutation,useRegisterUserMutation,useLoginUserMutation,useGetUserQuery}=authApi;