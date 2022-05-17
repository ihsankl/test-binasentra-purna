import React, { useEffect, useState } from 'react';
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
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/slicer/user.slicer';
import { useRouter } from 'next/router';

const defaultValues = {
    email: '',
    name: '',
    password: '',
    rePassword: '',
};

const Creator = process.env.REACT_APP_CREATOR;

const DisabledLink = styled(`button`)(({ theme }) => ({
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

const Copyright = (props) => {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props
            }>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/ihsankl">
                {Creator}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};


const Register = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [formValues, setFormValues] = useState(defaultValues);
    const UserState = useSelector((state) => state.User);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(() => {
        if (UserState.isSuccess) {
            router.push('/login');
        }
        return () => {

        };
    }, [UserState]);


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
                    Register
                </Typography>
                <Box
                    component="form"
                    onSubmit={(e) => e.preventDefault()}
                    noValidate sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        error={!formValues.name}
                        helperText={!formValues.name ? 'Username is required' : ''}
                        fullWidth
                        value={formValues.name}
                        onChange={handleInputChange}
                        id="name"
                        label="Name"
                        type='name'
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        error={!formValues.email}
                        helperText={!formValues.email ? 'Username is required' : ''}
                        fullWidth
                        value={formValues.email}
                        onChange={handleInputChange}
                        id="email"
                        label="Email"
                        type='email'
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        error={!formValues.password}
                        helperText={!formValues.password ? 'Password is required' : ''}
                        fullWidth
                        value={formValues.password}
                        onChange={handleInputChange}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        error={formValues.rePassword !== formValues.password}
                        helperText={formValues.rePassword !== formValues.password ?
                            'Password is not match' : ''}
                        fullWidth
                        value={formValues.rePassword}
                        onChange={handleInputChange}
                        name="rePassword"
                        label="re-Type Your Password"
                        type="password"
                        id="rePassword"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => {
                            const data = {
                                email: formValues.email,
                                password: formValues.password,
                                name: formValues.name,
                            };
                            if (formValues.password === formValues.rePassword) {
                                dispatch(createUser(data));
                            }
                        }}
                    >
                        Sign Up
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
                                sx={{
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    router.push('/login');
                                }}
                                variant="body2"
                            >
                                {'Already have an account? Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
};

export default Register;
