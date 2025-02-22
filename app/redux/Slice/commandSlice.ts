import { createSlice } from "@reduxjs/toolkit"
import { Commands, Status } from "~/constant/type"




const initialState:{
    isLoading: boolean,
    status: Status,
    error: string | null,
    commands: Commands[],
    selectedCommands: Commands | null
}={
    isLoading: false,
    status: Status.Pending,
    error: null,
    commands: [],
    selectedCommands: null
}




const commandSlice = createSlice({
    name: "commands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
    }
})



export default commandSlice.reducer;