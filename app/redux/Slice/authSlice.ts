import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

import { forgetPasswordApi, loginApi, registerApi, resetPasswordApi, verificationOTPApi } from '../service/api/user';

import { User } from '~/constant/type';

const initialState: {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  token: string | null;
  userId: string | null;
  isOTPSent: boolean;
  isOTPVerified: boolean
} = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
  userId: null,
  isOTPSent: false,
  isOTPVerified: false,
};

export const register = createAsyncThunk(
  'user/register',
  async (registerData: User, { rejectWithValue }) => {
    try {
      const newUser = await registerApi(registerData);
      return newUser;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const Login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await loginApi({ email, password });
      const token = user.token;

      await AsyncStorage.setItem('token', token);

      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id;

      return { ...user, userId };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    await AsyncStorage.removeItem('token');
    return null;
  } catch (error: any) {
    return rejectWithValue('Logout failed');
  }
});

export const forgetPassword = createAsyncThunk(
  'user/forgetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      return await forgetPasswordApi(email);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Forget password failed');
    }
  }
);



export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await verificationOTPApi({ email, otp });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Échec de la vérification OTP");
    }
  }
);



export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, newPassword }: { email: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await resetPasswordApi({ email, newPassword });
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Échec de la réinitialisation du mot de passe");
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(Login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      })
      .addCase(Login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.userId = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })


      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOTPVerified = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.isOTPVerified = false;
        state.error = action.payload as string;
      })


      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

  },
});

export default authSlice.reducer;
