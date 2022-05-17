import { combineReducers } from 'redux';
import AppState from './appstate.slicer';
import Invoice from './invoice.slicer';
import Auth from './auth.slicer';
import User from './user.slicer';
import Asuransi from './asuransi.slicer';
import Okupasi from './okupasi.slicer';

const appReducer = combineReducers({
    AppState,
    Invoice,
    Auth,
    User,
    Asuransi,
    Okupasi
});

const rootReducer = (state, action) => {
    if (action.type === 'logout/fulfilled' || !state?.Auth?.userData) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;