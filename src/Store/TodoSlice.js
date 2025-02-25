import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../Appwrite/Config";

export const fetchtodo = createAsyncThunk("fetchtodo", async () => {
    const alltodo = await service.gettodos();
    if (alltodo) {
        return alltodo;
    }
});

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        isLoading: true,
        todos: [],
        error: null,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchtodo.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchtodo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.todos = action.payload.documents;
            console.log(action.payload.documents);
        });
        builder.addCase(fetchtodo.rejected, (state, action) => {
            state.error = true;
            state.isLoading = false;
            console.log(action.payload);
        });
    },
});

export default todoSlice.reducer;
