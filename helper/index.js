
// headers builder
export const headersBuilder = (token = localStorage.getItem('token')) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

/**
 * basic redux reducers
 * @param {object} state state of the reducer.
 * @param {object} action action of the reducer.
 * @param {string} asyncState the type of async action.
 * @param {string} method the method of http request action.
 */
export const createBasicReducer = (state, action, asyncState, method) => {
    switch (asyncState) {
        case 'PENDING':
            state.isLoading = true;
            state.error = {
                message: null,
                state: false,
            };
            state.isSuccess = false;
            break;
        case 'FULFILLED':
            state.isLoading = false;
            state.error = {
                message: null,
                state: false,
            };
            if (method === 'GET') {
                state.data = action.payload.data;
            }
            if (method === 'POST') {
                // add new data to the list
                if (
                    action.type === 'createOkupasi/fulfilled'
                ) {
                    const dataToChange = { ...action.payload.oldData };
                    const array = [...dataToChange.results];
                    const newData = { ...action.payload.data.data };
                    array.push(newData);
                    dataToChange.results = array;
                    return state.data = dataToChange;
                }
                return state.data = null;
            }
            if (method === 'PUT') {
                // alter the old data
                if (
                    action.type === 'updateAsuransi/fulfilled' ||
                    action.type === 'updateOkupasi/fulfilled'
                ) {
                    const dataToChange = { ...action.payload.oldData };
                    const array = [...dataToChange.results];
                    const newData = { ...action.payload.data.data };
                    const index = dataToChange.results.findIndex(
                        (item) => item.id === newData.id,
                    );
                    array[index] = newData;
                    dataToChange.results = array;
                    return state.data = dataToChange;
                }
                return state.data = null;
            }

            if (method === 'DELETE') {
                // remove the old data
                if (
                    action.type === 'deleteOkupasi/fulfilled'
                ) {
                    const dataToChange = { ...action.payload.oldData };
                    const array = [...dataToChange.results];
                    const index = dataToChange.results.findIndex(
                        (item) => item.id === action.payload.data.id,
                    );
                    array.splice(index, 1);
                    dataToChange.results = array;
                    return state.data = dataToChange;
                }
                return state.data = null;
            }
            state.isSuccess = true;
            break;
        case 'REJECTED':
            state.isLoading = false;
            state.error = {
                message: 'Terjadi Kesalahan!',
                state: true,
            };
            state.isSuccess = false;
            break;
    }
};

// initial state for all reducers
export const initialState = {
    isLoading: false,
    error: {
        state: false,
        message: '',
    },
    isSuccess: false,
    data: null,
};

// rupiah formatter
export const rupiahFormatter = (value) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(value);
};

// auto increment for 5 digits
export const autoIncrement = (value) => {
    return value.toString().padStart(5, '0');
}

// capitalize
export const capitalizeFirstLetter = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}