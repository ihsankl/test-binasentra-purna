import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { headersBuilder, initialState } from '../../helper/index';
import storage from 'redux-persist/lib/storage';
import { API_URL } from '../../constant';

const types = {
    LOGIN: 'login',
    LOGOUT: 'logout',
};

// user login
export const login = createAsyncThunk(
    types.LOGIN,
    async (data, thunkAPI) => {
        try {
            const response = await Axios.post(
                `${API_URL}/auth/login`, data);
            return response.data;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// user logout
export const logout = createAsyncThunk(
    types.LOGOUT,
    async (data = null, thunkAPI) => {
        try {
            const response = await Axios.post(
                `${API_URL}/auth/logout`, data,
                {
                    ...headersBuilder(),
                },
            );
            return response.data;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: { ...initialState, isLoggedIn: false, userData: null, tokens: null },
    reducers: {
        clearError: (state) => {
            state.error = {
                state: false,
                message: null,
            };
        },
        clearSuccess: (state) => {
            state.isSuccess = false;
        },
        clearToken: (state) => {
            localStorage.removeItem('token');
            state.isLoggedIn = false;
        },
    }, extraReducers: (builder) => {
        // login
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                message: null,
                state: false,
            };
            state.isSuccess = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = {
                message: null,
                state: false,
            };
            state.isSuccess = true;
            state.isLoggedIn = true;
            state.tokens = action.payload.tokens;
            state.userData = action.payload.user;
            localStorage.setItem('token', action.payload.tokens.access.token);
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.error = {
                message: 'Something went wrong',
                state: true,
            };
            state.isSuccess = false;
        });
        // logout
        builder.addCase(logout.pending, (state, action) => {
            state.isLoading = true;
            state.error = {
                message: null,
                state: false,
            };
            state.isSuccess = false;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = {
                message: null,
                state: false,
            };
            state.isSuccess = true;
            state.isLoggedIn = false;
            localStorage.removeItem('token');
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = {
                message: action.payload?.response?.data?.message ??
                    'Something went wrong',
                state: true,
            };
            state.isSuccess = false;
        });
    },
});

export const {
    clearError,
    clearSuccess,
    clearToken,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
