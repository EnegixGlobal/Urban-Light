import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export const fetchProducts = createAsyncThunk(
    "products/fetchAll",
    async (filters, { rejectWithValue }) => {
        try {
            const { category, subCategory, featured } = filters || {};
            let url = API_URL;
            const params = new URLSearchParams();
            if (category) params.append("category", category);
            if (subCategory) params.append("subCategory", subCategory);
            if (featured) params.append("featured", featured);

            const queryString = params.toString();
            if (queryString) url += `?${queryString}`;

            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
);

export const fetchProductById = createAsyncThunk(
    "products/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Product not found");
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        selectedProduct: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                // Normalize payload to always be an array of products.
                if (Array.isArray(action.payload)) {
                    state.items = action.payload;
                } else if (action.payload && Array.isArray(action.payload.items)) {
                    state.items = action.payload.items;
                } else {
                    state.items = [];
                }
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
