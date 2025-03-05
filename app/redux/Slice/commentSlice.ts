import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Comments } from "~/constant/type";
import { getComments } from "../service/api/comment";



const initialState: {
    isLoading: boolean;
    error: string | null
    comments: Comments[]

} = {
    isLoading: false,
    error: null,
    comments: []
}


export const GetAllComments = createAsyncThunk('getCommenst/comments',
    async (_, { rejectWithValue }) => {
        try {
            return await getComments()
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "cannot get Comments failed");
        }

    })


const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: async (builder) => {
        builder
        .addCase(GetAllComments.pending, (state)=>{
            state.isLoading= true
            state.error= null
        })
        .addCase(GetAllComments.fulfilled, (state, action:PayloadAction<Comments[]>)=>{
            state.comments = action.payload
            state.isLoading = false;
            state.error = null
        })
        .addCase(GetAllComments.rejected, (state, action)=>{
            state.isLoading = true
            state.error = action.payload as string
        })
    }
})



export default commentSlice.reducer