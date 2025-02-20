import { createSlice } from "@reduxjs/toolkit"
import { Category } from "~/constant/type"

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







const categorySlice = createSlice({
    name: "Category",
    initialState,
    reducers: {},
    extraReducers: async (builder) => {
        builder

    }
})