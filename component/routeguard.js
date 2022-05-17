import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

export default function PrivateRoute({ protectedRoutes, children }) {
    const router = useRouter();
    const AuthState = useSelector((state) => state.Auth);
    const auth = AuthState.isLoggedIn;
    const isLoading = AuthState.isLoading;

    const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

    useEffect(() => {
        if (!auth && pathIsProtected) {
            // Redirect route, you can point this to /login
            router.push('/login');
        }
    }, [auth, pathIsProtected]);

    return children;
}