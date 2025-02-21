import { createSlice } from "@reduxjs/toolkit"
import { Pets } from "~/constant/type"



const initialState : {
    isLoading: boolean,
    error: string | null,
    pets: Pets[],
    petSelected: Pets | null,
    

} = {
    isLoading: false,
    error: null,
    pets: [],
    petSelected: null
}




const petSlice = createSlice({
    name: "Pets",
    initialState,
    reducers: {},
    extraReducers : async (builder) => {
        builder

    }
})