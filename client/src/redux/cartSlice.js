import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

// Fetch cart from database
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch cart");
    }
});

// Add to cart in database
export const addToCartAsync = createAsyncThunk("cart/addItem", async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/add`, { productId });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to add item");
    }
});

// Remove from cart (decrease quantity) in database
export const removeFromCartAsync = createAsyncThunk("cart/removeItem", async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/remove`, { productId });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to remove item");
    }
});

// Delete item completely from database
export const deleteFromCartAsync = createAsyncThunk("cart/deleteItem", async (productId, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/item/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete item");
    }
});

// Clear cart in database
export const clearCartAsync = createAsyncThunk("cart/clearCart", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${API_URL}/clear`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to clear cart");
    }
});

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null,
};

// Helper function to calculate totals from backend response
const calculateTotals = (cartItems) => {
    let totalQuantity = 0;
    let totalAmount = 0;

    if (cartItems && Array.isArray(cartItems)) {
        cartItems.forEach(item => {
            if (item.productId) {
                totalQuantity += item.quantity;
                totalAmount += (item.productId.price || 0) * item.quantity;
            }
        });
    }

    return { totalQuantity, totalAmount };
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    },
    extraReducers: (builder) => {
        // Optimistic Updates for Add/Remove
        builder.addCase(addToCartAsync.pending, (state, action) => {
            state.loading = true;
            const productId = action.meta.arg;
            const item = state.items.find(i => i.productId._id === productId);
            if (item) {
                item.quantity += 1;
                state.totalQuantity += 1;
                state.totalAmount += item.productId.price;
            }
        })
            .addCase(removeFromCartAsync.pending, (state, action) => {
                state.loading = true;
                const productId = action.meta.arg;
                const item = state.items.find(i => i.productId._id === productId);
                if (item && item.quantity > 0) {
                    item.quantity -= 1;
                    state.totalQuantity -= 1;
                    state.totalAmount -= item.productId.price;
                    if (item.quantity === 0) {
                        state.items = state.items.filter(i => i.productId._id !== productId);
                    }
                }
            })
            // Fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                const { totalQuantity, totalAmount } = calculateTotals(state.items);
                state.totalQuantity = totalQuantity;
                state.totalAmount = totalAmount;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Reset state on actual server success (sync check)
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                const { totalQuantity, totalAmount } = calculateTotals(state.items);
                state.totalQuantity = totalQuantity;
                state.totalAmount = totalAmount;
            })
            .addCase(removeFromCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                const { totalQuantity, totalAmount } = calculateTotals(state.items);
                state.totalQuantity = totalQuantity;
                state.totalAmount = totalAmount;
            })
            // Error handling - Revert or Refresh
            .addCase(addToCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                // Ideally, we'd roll back here, but a re-fetch is safer for consistency
            })
            .addCase(removeFromCartAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Other Actions
            .addCase(deleteFromCartAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items || [];
                const { totalQuantity, totalAmount } = calculateTotals(state.items);
                state.totalQuantity = totalQuantity;
                state.totalAmount = totalAmount;
            })
            .addCase(clearCartAsync.fulfilled, (state) => {
                state.items = [];
                state.totalQuantity = 0;
                state.totalAmount = 0;
                state.loading = false;
            });
    },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
