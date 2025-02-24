import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Commands, Status } from "~/constant/type"
import { commandApi } from "../service/api/command"
import AsyncStorage from "@react-native-async-storage/async-storage"




const initialState: {
    isLoading: boolean,
    status: Status,
    error: string | null,
    commands: Commands[],
    selectedCommands: Commands | null
} = {
    isLoading: false,
    status: Status.Pending,
    error: null,
    commands: [],
    selectedCommands: null
}



export const command = createAsyncThunk('passeCommand/command',
    async (
        {
            petsId,
            userId,
            totalamount }:
            {
                petsId: string[];
                userId:
                string,
                totalamount: number
            },
        {
            rejectWithValue
        }
    ) => {
        try {
            const userID = await AsyncStorage.getItem('token')
            return await commandApi({
                petsId,
                userId,
                totalamount
            })
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'cannot get Category failed');

        }
    })




const commandSlice = createSlice({
    name: "commands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(command.pending, (state)=>{
            state.isLoading = true,
            state.error = null
        })
        .addCase(command.fulfilled, (state, action)=>{
            state.isLoading = false,
            state.error=null
        })
     
    },
})



export default commandSlice.reducer;