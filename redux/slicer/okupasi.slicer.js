import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { API_URL } from '../../constant';
import { headersBuilder, createBasicReducer, initialState } from '../../helper/index';

const types = {
    GET_OKUPASI: 'getOkupasi',
    GET_OKUPASI_BY_ID: 'getOkupasiById',
    CREATE_OKUPASI: 'createOkupasi',
    UPDATE_OKUPASI: 'updateOkupasi',
    DELETE_OKUPASI: 'deleteOkupasi',
};

// get all okupasi
export const fetchOkupasi = createAsyncThunk(
    types.GET_OKUPASI,
    async (data = null, thunkAPI) => {
        try {
            const response = await Axios.get(`${API_URL}/okupasi`);
            return response.data;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// get okupasi by id
export const fetchOkupasiById = createAsyncThunk(
    types.GET_OKUPASI_BY_ID,
    async (data, thunkAPI) => {
        try {
            const response = await Axios.get(`${API_URL}/okupasi/${data.id}`);
            return response.data;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// create okupasi
export const createOkupasi = createAsyncThunk(
    types.CREATE_OKUPASI,
    async (data, thunkAPI) => {
        try {
            const dataresult = await Axios.post(`${API_URL}/okupasi`, data, {
                ...headersBuilder(),
            });
            const GlobalState = thunkAPI.getState();
            const OkupasiState = GlobalState.Okupasi;
            const oldData = OkupasiState.data;
            return {
                oldData,
                data: dataresult.data
            };
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// update okupasi
export const updateOkupasi = createAsyncThunk(
    types.UPDATE_OKUPASI,
    async (data, thunkAPI) => {
        try {
            const dataresult = await Axios.put(`${API_URL}/okupasi/${data.id}`, data, {
                ...headersBuilder(),

            });
            const GlobalState = thunkAPI.getState();
            const OkupasiState = GlobalState.Okupasi;
            const oldData = OkupasiState.data;
            return {
                oldData,
                data: dataresult.data
            };
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// delete okupasi
export const deleteOkupasi = createAsyncThunk(
    types.DELETE_OKUPASI,
    async (data, thunkAPI) => {
        try {
            const dataresult = await Axios.delete(`${API_URL}/okupasi/${data.id}`, {
                ...headersBuilder(),
            });
            const GlobalState = thunkAPI.getState();
            const OkupasiState = GlobalState.Okupasi;
            const oldData = OkupasiState.data;
            return {
                oldData,
                data: dataresult.data
            };
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

const okupasiSlice = createSlice({
    name: 'okupasi',
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
        // get okupasi
        builder.addCase(fetchOkupasi.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'GET');
        });
        builder.addCase(fetchOkupasi.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'GET');
        });
        builder.addCase(fetchOkupasi.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'GET');
        });
        // get okupasi by id
        builder.addCase(fetchOkupasiById.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'GET');
        });
        builder.addCase(fetchOkupasiById.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'GET');
        });
        builder.addCase(fetchOkupasiById.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'GET');
        });
        // create okupasi
        builder.addCase(createOkupasi.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'POST');
        });
        builder.addCase(createOkupasi.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'POST');
        });
        builder.addCase(createOkupasi.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'POST');
        });
        // update okupasi
        builder.addCase(updateOkupasi.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'PUT');
        });
        builder.addCase(updateOkupasi.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'PUT');
        });
        builder.addCase(updateOkupasi.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'PUT');
        });
        // delete okupasi
        builder.addCase(deleteOkupasi.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'DELETE');
        });
        builder.addCase(deleteOkupasi.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'DELETE');
        });
        builder.addCase(deleteOkupasi.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'DELETE');
        });
    },
});

export const { clearError, clearSuccess } = okupasiSlice.actions;
export default okupasiSlice.reducer;