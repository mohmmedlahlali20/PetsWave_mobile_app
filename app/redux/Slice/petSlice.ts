import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Pets } from "~/constant/type"
import { fetchAllPets, fetchPetById } from "../service/api/pets"



const initialState: {
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



export const getPets = createAsyncThunk('getAllPets/pets',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchAllPets()

        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "cannot get pets failed");

        }

    })

export const getOnePet = createAsyncThunk('getOnePet/Pets',
    async (petId: string, { rejectWithValue }) => {
        try {            
            return await fetchPetById(petId)
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "cannot get pets failed");

        }
    }
)




const petSlice = createSlice({
    name: "Pets",
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder
            .addCase(getPets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getPets.fulfilled, (state, action: PayloadAction<Pets[]>) => {
                state.pets = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getPets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getOnePet.pending, (state) => { 
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getOnePet.fulfilled, (state, action: PayloadAction<Pets>) => {
                state.petSelected = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            
            .addCase(getOnePet.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});



export default petSlice.reducer