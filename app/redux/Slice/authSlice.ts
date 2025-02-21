import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "~/constant/type"
import { loginApi, registerApi } from "../service/api/user"
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState: {
    user: User | null,
    isLoading: boolean,
    isAuthenticated: boolean,
    error: string | null,
    token: string | null
} = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
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
    });

    export const Login = createAsyncThunk('user/login', 
        async({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
            try {
                const user = await loginApi({ email, password });
                const token = user.token;
                await AsyncStorage.setItem('token', token);
                return user;
            } catch (error: any) {
                return rejectWithValue(error.response?.data?.message || "Login failed");
            }
        }
    );
    


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
            .addCase(Login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(Login.fulfilled,  (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(Login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});






export default authSlice.reducer;