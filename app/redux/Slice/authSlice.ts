import { createSlice } from "@reduxjs/toolkit"
import { User } from "~/constant/type"


const initialState: {
    user: User | null,
    isLoading: boolean,
    isAuthenticated: boolean,
    error : string | null,
    token: string | null
} = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error : null,
    token: null
}


const authSlice =  createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
    }
});


export default authSlice.reducer;