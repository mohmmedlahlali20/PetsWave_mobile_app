import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Comments } from "~/constant/type"
import { getCommentsByPetsId } from "../service/api/comment"

interface CommentState {
  isLoading: boolean
  error: string | null
  comments: Comments[]
}

const initialState: CommentState = {
  isLoading: false,
  error: null,
  comments: [],
}

export const GetAllComments = createAsyncThunk(
  "comments/getAll",
  async ({ petsId }: { petsId: string }, { rejectWithValue }) => {
    try {
      return await getCommentsByPetsId(petsId)
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec du chargement des commentaires")
    }
  }
)

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllComments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(GetAllComments.fulfilled, (state, action: PayloadAction<Comments[]>) => {
        console.log(action.payload);
        
        state.comments = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(GetAllComments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export default commentSlice.reducer
