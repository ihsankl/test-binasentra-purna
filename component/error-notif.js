import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearError as clearAsuransi } from '../redux/slicer/asuransi.slicer';
import { clearError as clearAppState } from '../redux/slicer/appstate.slicer';
import { clearError as clearAuth } from '../redux/slicer/auth.slicer';
import { clearError as clearInvoice } from '../redux/slicer/invoice.slicer';
import { clearError as clearOkupasi } from '../redux/slicer/okupasi.slicer';
import { clearError as clearUser } from '../redux/slicer/user.slicer';

const ErrorNotif = () => {
    const dispatch = useDispatch();
    const Invoice = useSelector(state => state.Invoice);
    const Auth = useSelector(state => state.Auth);
    const User = useSelector(state => state.User);
    const Asuransi = useSelector(state => state.Asuransi);
    const Okupasi = useSelector(state => state.Okupasi);

    const isError =
        Asuransi.error.state ||
        Invoice.error.state ||
        Auth.error.state ||
        User.error.state ||
        Okupasi.error.state;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        clearAllError();
    };

    const clearAllError = () => {
        dispatch(clearAsuransi());
        dispatch(clearAuth());
        dispatch(clearInvoice());
        dispatch(clearOkupasi());
        dispatch(clearUser());
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={isError}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={'error'}
            >
                {'Terjadi Masalah Pada Server'}
            </Alert>
        </Snackbar>
    )
}

export default ErrorNotif