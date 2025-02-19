import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "~/constant/type"
import { registerApi } from "../service/api/user"


const initialState: {
    user: User | null,
    isLoading: boolean,
    isAuthenticated: boolean,
    error: string | null,
    token: string | null
} = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    token: null
}


export const register = createAsyncThunk('user/register',
    async (registerData: User, { rejectWithValue }) => {
        try {
            const newUser = await registerApi(registerData)
            console.log(newUser);
            
            return newUser
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Registration failed")
        }
    })


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.user = action.payload
                state.token = action.payload.token
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload as string
            })
    }
});






export default authSlice.reducer;