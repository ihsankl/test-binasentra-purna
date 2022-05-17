import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { API_URL } from '../../constant';
import { headersBuilder, createBasicReducer, initialState } from '../../helper/index';

const types = {
    GET_USERS: 'getUsers',
    GET_USER_BY_ID: 'getUserByID',
    CREATE_USER: 'createUser',
    UPDATE_USER: 'updateUser',
    DELETE_USER: 'deleteUser',
};

// get all users
export const fetchUsers = createAsyncThunk(
    types.GET_USERS,
    async (data = null, thunkAPI) => {
        try {
            const response = await Axios.get(`${API_URL}/users`);
            return response.data;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// get user by id
export const fetchUserByID = createAsyncThunk(
    types.GET_USER_BY_ID,
    async (data, thunkAPI) => {
        try {
            const response = await Axios.get(`${API_URL}/users/${data.id}`);
            return response.data;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// create user
export const createUser = createAsyncThunk(
    types.CREATE_USER,
    async (data, thunkAPI) => {
        try {
            await Axios.post(`${API_URL}/users`, data);
            return;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// update user
export const updateUser = createAsyncThunk(
    types.UPDATE_USER,
    async (data, thunkAPI) => {
        try {
            await Axios.put(`${API_URL}/users/${data.id}`, data, {
                ...headersBuilder(),
            });
            return;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// delete user
export const deleteUser = createAsyncThunk(
    types.DELETE_USER,
    async (data, thunkAPI) => {
        try {
            await Axios.delete(`${API_URL}/users/${data.id}`, {
                ...headersBuilder(),
            });
            return;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

const userSlice = createSlice({
    name: 'user',
    initialState: { ...initialState },
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
    }, extraReducers: (builder) => {
        // get users
        builder.addCase(fetchUsers.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'GET');
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'GET');
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'GET');
        });
        // get user by id
        builder.addCase(fetchUserByID.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'GET');
        });
        builder.addCase(fetchUserByID.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'GET');
        });
        builder.addCase(fetchUserByID.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'GET');
        });
        // create user
        builder.addCase(createUser.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'POST');
        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'POST');
        });
        builder.addCase(createUser.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'POST');
        });
        // update user
        builder.addCase(updateUser.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'PUT');
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'PUT');
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'PUT');
        });
        // delete user
        builder.addCase(deleteUser.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'DELETE');
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'DELETE');
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'DELETE');
        });
    },
});

export const { clearError, clearSuccess } = userSlice.actions;
export default userSlice.reducer;
