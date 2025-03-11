import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Comments } from "~/constant/type"
import { addComments, getCommentsByPetsId, removeCommentsApi } from "../service/api/comment"



const initialState: {
  isLoading: boolean,
  error: string | null,
  comments: Comments[],
} = {
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


export const AddComment = createAsyncThunk(
  "comments/add",
  async ({ petsId, createdBy, text }: { petsId: string, createdBy: string, text: string }, { rejectWithValue }) => {
    try {

      const newComment = await addComments({ petsId, createdBy, text })
      return newComment
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec de l'ajout du commentaire")
    }
  }
)


export const RemoveComment = createAsyncThunk(
  "comments/remove",
  async (commentId: string, { rejectWithValue }) => {
    try {
      await removeCommentsApi(commentId)
      return commentId
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Échec de la suppression du commentaire")
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
        state.comments = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(GetAllComments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(AddComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(AddComment.fulfilled, (state, action: PayloadAction<Comments>) => {
        state.comments.push(action.payload)
        state.isLoading = false
        state.error = null
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      .addCase(RemoveComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(RemoveComment.fulfilled, (state, action: PayloadAction<string>) => {
        state.comments = state.comments.filter(comment => comment._id !== action.payload)
        state.isLoading = false
        state.error = null
      })
      .addCase(RemoveComment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

export default commentSlice.reducer
