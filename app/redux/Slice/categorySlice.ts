import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Category } from "~/constant/type"
import { getCategoryApi } from "../service/api/category"

const initialState: {
    isLoading: boolean
    categories: Category[]
    selectedCategory: Category | null,
    error: string | null,

} = {
    isLoading: false,
    categories: [],
    selectedCategory: null,
    error: null
}



export const getCategory = createAsyncThunk('getAllCategory/category',
    async (_, { rejectWithValue }) => {
        try {
            return await getCategoryApi();
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "cannot get Category failed");
        }
    })







const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {},
    extraReducers: async (builder) => {
        builder
            .addCase(getCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategory.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

    }
})


export default categorySlice.reducer;