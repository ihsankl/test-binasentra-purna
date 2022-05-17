import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';
import { API_URL } from '../../constant';
import { headersBuilder, createBasicReducer, initialState } from '../../helper/index';

const types = {
  GET_INVOICE: 'getInvoice',
  GET_INVOICE_BY_ID: 'getInvoiceById',
  CREATE_INVOICE: 'createInvoice',
  UPDATE_INVOICE: 'updateInvoice',
  DELETE_INVOICE: 'deleteInvoice',
};
// get all invoice
export const getInvoice = createAsyncThunk(
  types.GET_INVOICE,
  async (data = null, thunkAPI) => {
    try {
      const response = await Axios.get(`${API_URL}/invoice`);
      return response.data;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  },
);

// get invoice by id
export const getInvoiceById = createAsyncThunk(
  types.GET_INVOICE_BY_ID,
  async (data, thunkAPI) => {
    try {
      const response = await Axios.get(`${API_URL}/invoice/${data.id}`, {
        ...headersBuilder(),
      });
      return response.data;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  },
);

// create invoice
export const createInvoice = createAsyncThunk(
  types.CREATE_INVOICE,
  async (data, thunkAPI) => {
    try {
      await Axios.post(`${API_URL}/invoice`, data, {
        ...headersBuilder(),
      });
      return;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  },
);

// update invoice
export const updateInvoice = createAsyncThunk(
  types.UPDATE_INVOICE,
  async (data, thunkAPI) => {
    try {
      await Axios.put(`${API_URL}/invoice/${data.id}`, data, {
        ...headersBuilder(),
      });
      return;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  },
);

// delete invoice
export const deleteInvoice = createAsyncThunk(
  types.DELETE_INVOICE,
  async (data, thunkAPI) => {
    try {
      await Axios.delete(`${API_URL}/invoice/${data.id}`, {
        ...headersBuilder(),
      });
      return;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  },
);

// slicer
const invoiceSlice = createSlice({
  name: 'invoice',
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
  },
  extraReducers: (builder) => {
    // get all
    builder.addCase(getInvoice.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING', 'GET');
    });
    builder.addCase(getInvoice.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED', 'GET');
    });
    builder.addCase(getInvoice.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED', 'GET');
    });
    // get 1
    builder.addCase(getInvoiceById.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING', 'GET');
    });
    builder.addCase(getInvoiceById.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED', 'GET');
    });
    builder.addCase(getInvoiceById.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED', 'GET');
    });
    // create
    builder.addCase(createInvoice.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING', 'POST');
    });
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED', 'POST');
    });
    builder.addCase(createInvoice.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED', 'POST');
    });
    // update
    builder.addCase(updateInvoice.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING', 'PUT');
    });
    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED', 'PUT');
    });
    builder.addCase(updateInvoice.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED', 'PUT');
    });
    // delete
    builder.addCase(deleteInvoice.pending, (state, action) => {
      createBasicReducer(state, action, 'PENDING', 'DELETE');
    });
    builder.addCase(deleteInvoice.fulfilled, (state, action) => {
      createBasicReducer(state, action, 'FULFILLED', 'DELETE');
    });
    builder.addCase(deleteInvoice.rejected, (state, action) => {
      createBasicReducer(state, action, 'REJECTED', 'DELETE');
    });
  },
});

export const { clearError, clearSuccess } = invoiceSlice.actions;
export default invoiceSlice.reducer;