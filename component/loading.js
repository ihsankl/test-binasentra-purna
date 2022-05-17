import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

const Loading = ({ children }) => {
    const AppState = useSelector(state => state.AppState);
    const Invoice = useSelector(state => state.Invoice);
    const Auth = useSelector(state => state.Auth);
    const User = useSelector(state => state.User);
    const Asuransi = useSelector(state => state.Asuransi);
    const Okupasi = useSelector(state => state.Okupasi);

    const isLoading =
        AppState.isLoading ||
        Invoice.isLoading ||
        Auth.isLoading ||
        User.isLoading ||
        Asuransi.isLoading ||
        Okupasi.isLoading;

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 3 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loading