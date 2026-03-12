import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Login failed");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
            return null;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Logout failed");
        }
    }
);

export const signupUser = createAsyncThunk(
    "auth/signup",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Signup failed");
        }
    }
);

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
    loading: true,
    isAuthModalOpen: false,
    authModalView: "login", // "login" or "signup"
    toast: {
        show: false,
        message: "",
        type: "success", // "success" or "error"
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setReady: (state) => {
            state.loading = false;
        },
        openAuthModal: (state, action) => {
            state.isAuthModalOpen = true;
            state.authModalView = action.payload || "login";
        },
        closeAuthModal: (state) => {
            state.isAuthModalOpen = false;
        },
        toggleAuthModalView: (state) => {
            state.authModalView = state.authModalView === "login" ? "signup" : "login";
        },
        showToast: (state, action) => {
            state.toast = {
                show: true,
                message: action.payload.message,
                type: action.payload.type || "success",
            };
        },
        hideToast: (state) => {
            state.toast.show = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.isAuthModalOpen = false; // Close modal on success
                localStorage.setItem("user", JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                localStorage.removeItem("user");
            })
            // Signup
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.loading = false;
                state.authModalView = "login"; // Switch to login after signup
            })
            .addCase(signupUser.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setUser, logout, setLoading, setReady, openAuthModal, closeAuthModal, toggleAuthModalView, showToast, hideToast } = authSlice.actions;
export default authSlice.reducer;
