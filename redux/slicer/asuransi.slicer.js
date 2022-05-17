import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { API_URL } from '../../constant';
import { headersBuilder, createBasicReducer, initialState } from '../../helper/index';

const types = {
    GET_ASURANSI: 'getAsuransi',
    GET_ASURANSI_BY_ID: 'getAsuransiById',
    GET_ASURANSI_BY_USERID: 'getAsuransiByUserId',
    CREATE_ASURANSI: 'createAsuransi',
    UPDATE_ASURANSI: 'updateAsuransi',
    DELETE_ASURANSI: 'deleteAsuransi',
};

// get all asuransi
export const fetchAsuransi = createAsyncThunk(
    types.GET_ASURANSI,
    async (data = null, thunkAPI) => {
        try {
            const response = await Axios.get(`${API_URL}/asuransi`);
            return response.data;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// get asuransi with same userId with logged in user
export const fetchAsuransiByUserId = createAsyncThunk(
    types.GET_ASURANSI_BY_USERID,
    async (data = null, thunkAPI) => {
        try {
            const response = await Axios.get(`${API_URL}/asuransi?userId=${data.userId}`);
            return response.data;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// get asuransi by id
export const fetchAsuransiById = createAsyncThunk(
    types.GET_ASURANSI_BY_ID,
    async (data, thunkAPI) => {
        try {
            const response = await Axios.get(`${API_URL}/asuransi/${data.id}`);
            return response.data;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// create asuransi
export const createAsuransi = createAsyncThunk(
    types.CREATE_ASURANSI,
    async (data, thunkAPI) => {
        try {
            const dataresult = await Axios.post(`${API_URL}/asuransi`, data, {
                ...headersBuilder(),
            });
            return dataresult;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// update asuransi
export const updateAsuransi = createAsyncThunk(
    types.UPDATE_ASURANSI,
    async (data, thunkAPI) => {
        try {
            const dataresult = await Axios.put(`${API_URL}/asuransi/${data.id}`, data, {
                ...headersBuilder(),

            });
            const GlobalState = thunkAPI.getState();
            const AsuransiState = GlobalState.Asuransi;
            const oldData = AsuransiState.data;
            return {
                oldData,
                data: dataresult.data
            };
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

// delete asuransi
export const deleteAsuransi = createAsyncThunk(
    types.DELETE_ASURANSI,
    async (data, thunkAPI) => {
        try {
            await Axios.delete(`${API_URL}/asuransi/${data.id}`, {
                ...headersBuilder(),
            });
            return;
        } catch (error) {
            throw thunkAPI.rejectWithValue(error);
        }
    },
);

const asuransiSlice = createSlice({
    name: 'asuransi',
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
        // get asuransi
        builder.addCase(fetchAsuransi.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'GET');
        });
        builder.addCase(fetchAsuransi.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'GET');
        });
        builder.addCase(fetchAsuransi.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'GET');
        });
        // get asuransi by userId
        builder.addCase(fetchAsuransiByUserId.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'GET');
        });
        builder.addCase(fetchAsuransiByUserId.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'GET');
        });
        builder.addCase(fetchAsuransiByUserId.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'GET');
        });
        // get asuransi by id
        builder.addCase(fetchAsuransiById.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'GET');
        });
        builder.addCase(fetchAsuransiById.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'GET');
        });
        builder.addCase(fetchAsuransiById.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'GET');
        });
        // create asuransi
        builder.addCase(createAsuransi.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'POST');
        });
        builder.addCase(createAsuransi.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'POST');
        });
        builder.addCase(createAsuransi.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'POST');
        });
        // update asuransi
        builder.addCase(updateAsuransi.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'PUT');
        });
        builder.addCase(updateAsuransi.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'PUT');
        });
        builder.addCase(updateAsuransi.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'PUT');
        });
        // delete asuransi
        builder.addCase(deleteAsuransi.pending, (state, action) => {
            createBasicReducer(state, action, 'PENDING', 'DELETE');
        });
        builder.addCase(deleteAsuransi.fulfilled, (state, action) => {
            createBasicReducer(state, action, 'FULFILLED', 'DELETE');
        });
        builder.addCase(deleteAsuransi.rejected, (state, action) => {
            createBasicReducer(state, action, 'REJECTED', 'DELETE');
        });
    },
});

export const { clearError, clearSuccess } = asuransiSlice.actions;
export default asuransiSlice.reducer;