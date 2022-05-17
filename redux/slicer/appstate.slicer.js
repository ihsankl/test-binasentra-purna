import { createSlice } from '@reduxjs/toolkit';

const appStateSlice = createSlice({
    name: 'appState',
    initialState: {
        isSuccess: false,
        asuransiData: null,
    },
    reducers: {
        setSuccess: (state, action) => {
            state.isSuccess = true;
        },
        unsetSuccess: (state, action) => {
            state.isSuccess = false;
        },
        setAsuransiData: (state, action) => {
            state.asuransiData = action.payload;
        },
    },
});

export const {
    setSuccess,
    unsetSuccess,
    setAsuransiData,
} = appStateSlice.actions;
export default appStateSlice.reducer;
