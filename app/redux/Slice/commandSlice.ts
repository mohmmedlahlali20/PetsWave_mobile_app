import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Commands, Status } from '~/constant/type';
import { commandApi, GetCommandeByUserIdApi } from '../service/api/command';

const initialState: {
  isLoading: boolean;
  status: Status;
  error: string | null;
  command: Commands[];
  selectedCommands: Commands | null;
} = {
  isLoading: false,
  status: Status.Pending,
  error: null,
  command: [],
  selectedCommands: null,
};

export const command = createAsyncThunk(
  'passeCommand/command',
  async (
    { petsId, userId, totalamount }: { petsId: string[]; userId: string; totalamount: number },
    { rejectWithValue }
  ) => {
    try {
      return await commandApi({ petsId, userId, totalamount });
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Cannot process command');
    }
  }
);


export const GetCommandeByUserId = createAsyncThunk(
  'getCommand/command',
  async (userId: string, { rejectWithValue }) => {
    try {
      return  await GetCommandeByUserIdApi(userId);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || `Cannot find command with user ID: ${userId}`);
    }
  }
);

const commandSlice = createSlice({
  name: 'commands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(command.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(command.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.command.unshift(action.payload);
      })
      .addCase(command.rejected, (state, action) => {
        state.isLoading = false; 
        state.error = action.payload as string;
      })
      .addCase(GetCommandeByUserId.pending, (state) => {
        state.isLoading = true; 
        state.error = null;
      })
      .addCase(GetCommandeByUserId.fulfilled, (state, action: PayloadAction<Commands[]>) => {
        state.command = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(GetCommandeByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default commandSlice.reducer;
