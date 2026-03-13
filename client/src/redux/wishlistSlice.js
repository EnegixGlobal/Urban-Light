import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/wishlist`;

// Fetch wishlist from database
export const fetchWishlist = createAsyncThunk("wishlist/fetchWishlist", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Expecting { products: [] }
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch wishlist");
    }
});

// Toggle wishlist in database
export const toggleWishlistAsync = createAsyncThunk("wishlist/toggle", async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/toggle`, { productId });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update wishlist");
    }
});

// Remove from wishlist
export const removeFromWishlistAsync = createAsyncThunk("wishlist/remove", async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to remove from wishlist");
    }
});

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetWishlist: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products || [];
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(toggleWishlistAsync.fulfilled, (state, action) => {
                state.items = action.payload.wishlist.products || [];
            })
            .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
                state.items = action.payload.products || [];
            });
    },
});

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
