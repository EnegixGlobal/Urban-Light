import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "urban_light_wishlist";

const loadWishlistFromStorageHelper = () => {
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

const saveWishlistToStorageHelper = (items) => {
    if (typeof window === "undefined") return;
    try {
        const value = JSON.stringify({ items });
        window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
        // ignore
    }
};

const initialLoaded = loadWishlistFromStorageHelper();

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: initialLoaded.items || [],
        loading: false,
        error: null,
    },
    reducers: {
        loadWishlistFromStorage: (state) => {
            const loaded = loadWishlistFromStorageHelper();
            state.items = loaded.items || [];
            saveWishlistToStorageHelper(state.items);
        },
        toggleWishlist: (state, action) => {
            const product = action.payload;
            if (!product || !product._id) return;

            const exists = state.items.some(item => item._id === product._id);
            if (exists) {
                state.items = state.items.filter(item => item._id !== product._id);
            } else {
                state.items.push(product);
            }
            saveWishlistToStorageHelper(state.items);
        },
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item._id !== productId);
            saveWishlistToStorageHelper(state.items);
        },
        clearWishlist: (state) => {
            state.items = [];
            saveWishlistToStorageHelper(state.items);
        },
    },
});

export const {
    loadWishlistFromStorage,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
