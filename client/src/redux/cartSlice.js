import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "urban_light_cart";

// Helpers for localStorage-based cart
const loadCartFromStorageHelper = () => {
    if (typeof window === "undefined") return { items: [] };
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) return { items: [] };
        const parsed = JSON.parse(stored);
        if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
        return { items: parsed.items };
    } catch {
        return { items: [] };
    }
};

const saveCartToStorageHelper = (items) => {
    if (typeof window === "undefined") return;
    try {
        const value = JSON.stringify({ items });
        window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
        // ignore storage errors
    }
};

const initialLoaded = loadCartFromStorageHelper();

const initialState = {
    items: initialLoaded.items || [],
    totalQuantity: 0,
    totalAmount: 0,
    loading: false,
    error: null,
};

// Helper function to calculate totals from cart items
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

const recalcAndPersist = (state) => {
    const { totalQuantity, totalAmount } = calculateTotals(state.items);
    state.totalQuantity = totalQuantity;
    state.totalAmount = totalAmount;
    saveCartToStorageHelper(state.items);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        loadCartFromStorage: (state) => {
            const loaded = loadCartFromStorageHelper();
            state.items = loaded.items || [];
            recalcAndPersist(state);
        },
        addToCart: (state, action) => {
            const product = action.payload;
            if (!product || !product._id) return;

            const existingItem = state.items.find(i => i.productId._id === product._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ productId: product, quantity: 1 });
            }
            recalcAndPersist(state);
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            const existingItem = state.items.find(i => i.productId._id === productId);
            if (!existingItem) return;

            existingItem.quantity -= 1;
            if (existingItem.quantity <= 0) {
                state.items = state.items.filter(i => i.productId._id !== productId);
            }
            recalcAndPersist(state);
        },
        deleteFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(i => i.productId._id !== productId);
            recalcAndPersist(state);
        },
        clearCart: (state) => {
            state.items = [];
            recalcAndPersist(state);
        },
    },
});

export const {
    loadCartFromStorage,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
