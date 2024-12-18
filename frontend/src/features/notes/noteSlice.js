import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Get ticket notes.
export const getNotes = createAsyncThunk(
    "note/getAll", 
    async (ticketId, thunkAPI) => {
        try {
            // We need to pass in the token as well since we are now trying to
            // access a protected route. So, we will use thunkAPI's getState() method
            // to fetch the user's token from "auth".
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.getNotes(ticketId, token);
        } catch (error) {
            const message = (
                error.response 
                && error.response.data 
                && error.response.data.message
            ) || error.message || error.toString() ;

            return thunkAPI.rejectWithValue(message);
        }
})

// Create ticket note.
export const createNote = createAsyncThunk(
    "note/create", 
    async ({noteText, ticketId}, thunkAPI) => {
        try {
            // We need to pass in the token as well since we are now trying to
            // access a protected route. So, we will use thunkAPI's getState() method
            // to fetch the user's token from "auth".
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.createNote(noteText, ticketId, token);
        } catch (error) {
            const message = (
                error.response 
                && error.response.data 
                && error.response.data.message
            ) || error.message || error.toString() ;

            return thunkAPI.rejectWithValue(message);
        }
})

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNotes.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.notes = action.payload;
        })
        .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(createNote.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.notes.push(action.payload);
        })
        .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;