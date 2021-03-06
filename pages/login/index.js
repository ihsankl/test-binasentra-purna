import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { login } from '../../redux/slicer/auth.slicer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const defaultValues = {
    email: '',
    password: '',
};

const DisabledLink = styled(`button`)(({ }) => ({
    '&[disabled]': {
        'color': 'grey',
        'cursor': 'default',
        'background': 'none',
        'border': 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },
}));

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const AuthState = useSelector((state) => state.Auth);
    const auth = AuthState.isLoggedIn;
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(() => {
        if (auth) {
            router.push('/');
        }

        return () => {

        }
    }, [auth]);

    const handleOnsubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: formValues.email,
                password: formValues.password,
            };
            dispatch(login(data));
            // get return url from query parameters or default to '/'
            const returnUrl = router.query.returnUrl || '/';
            router.push(returnUrl);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleOnsubmit}
                    noValidate sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={formValues.email}
                        onChange={handleInputChange}
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={formValues.password}
                        onChange={handleInputChange}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link
                                underline='none'
                                component={DisabledLink}
                                disabled
                                href="#"
                                variant="body2"
                            >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                onClick={() => router.push('/register')}
                                sx={{
                                    cursor: 'pointer',
                                }}
                                variant="body2"
                            >
                                {'Don\'t have an account? Sign Up'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};


const Copyright = (props) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props
            }>
            {'Copyright ?? '}
            <Link color="inherit" href="https://github.com/ihsankl">
                {`ihsankl`}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

export default Login;