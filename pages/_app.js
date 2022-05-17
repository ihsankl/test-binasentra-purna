import '../styles/globals.css'
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import storage from '../redux/store';
import RouteGuard from '../component/routeguard';
import Loading from '../component/loading';
import ErrorNotif from '../component/error-notif';

const protectedRoutes = [
  '/',
  '/home',
  '/invoice',
  '/myrequest',
  '/dashboard',
  '/request'
];

const { Store, Persistor } = storage();

const theme = createTheme({
  palette: {
    disabled: "#8a8888",
    light: "#e7effb"
  },
});

function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <RouteGuard protectedRoutes={protectedRoutes}>
            <Loading />
            <ErrorNotif />
            <Component {...pageProps} />
          </RouteGuard>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp
