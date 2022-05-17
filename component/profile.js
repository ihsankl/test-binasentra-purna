import { Box, Button, FormControl, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByID, updateUser } from '../redux/slicer/user.slicer';
import EditIcon from '@mui/icons-material/Edit';

const defaultValues = {
    name: "",
    email: "",
    role: "",
    password: "",
    rePassword: "",
    isEmailVerified: false,
}

const Profile = () => {
    const dispatch = useDispatch();
    const AuthState = useSelector((state) => state.Auth);
    const userData = AuthState.userData;
    const isAdmin = userData?.role === 'admin';
    const UserState = useSelector((state) => state.User);
    const [isEdit, setIsEdit] = useState(false);
    const [formValues, setFormValues] = useState(UserState.data || userData || defaultValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    React.useEffect(() => {
        if (!UserState.data) {
            getProfile();
        }
        return () => {
        }
    }, [UserState.data]);

    const getProfile = () => {
        const data = { ...userData }
        dispatch(fetchUserByID(userData));
    };

    const handleOnsubmit = (e) => {
        e.preventDefault();
        const data = { ...formValues };
        if (data.password === data.rePassword) {
            if (data.password === '') {
                delete data.password;
            }
            dispatch(updateUser(data));
        } else {
            alert("Password not match");
        }
    };

    return (
        <form onSubmit={handleOnsubmit} style={{ width: '100%' }}>
            <Grid container space={2} marginY={2} padding="2em">
                <Stack direction="row" width="100%" justifyContent='flex-end'>
                    <Button
                        onClick={() => setIsEdit(!isEdit)}
                        variant="contained"
                        color="info"
                        startIcon={<EditIcon />}
                    >
                        Edit
                    </Button>
                </Stack>
                <Box marginY={2} />
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Nama
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name="name"
                            disabled={!isEdit}
                            displayEmpty
                            onChange={handleInputChange}
                            value={formValues.name}
                        />
                    </FormControl>
                    <Box marginY={2} />
                    <FormControl fullWidth>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Email
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name="email"
                            disabled={!isEdit}
                            onChange={handleInputChange}
                            value={formValues.email}
                            displayEmpty
                        />
                    </FormControl>
                    <Box marginY={2} />
                    <FormControl fullWidth>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Password
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name="password"
                            type='password'
                            disabled={!isEdit}
                            onChange={handleInputChange}
                            value={formValues.password}
                            displayEmpty
                        />
                    </FormControl>
                    <Box marginY={2} />
                    <FormControl fullWidth>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Tulis Ulang Password
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name="rePassword"
                            type='password'
                            disabled={!isEdit}
                            onChange={handleInputChange}
                            value={formValues.rePassword}
                            displayEmpty
                        />
                    </FormControl>
                    <Box marginY={2} />
                    <FormControl fullWidth>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Role
                        </Typography>
                        <Select
                            fullWidth
                            disabled={!isAdmin || !isEdit}
                            id="jangka-waktu-penggunaan"
                            name='jangkaWaktu'
                            displayEmpty
                            value={formValues.role}
                            onChange={handleInputChange}
                        >
                            <MenuItem
                                value={'admin'}
                            >
                                Admin
                            </MenuItem>
                            <MenuItem
                                value={'user'}
                            >
                                User
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Stack
                    direction='row'
                    justifyContent='flex-end'
                    padding='2em 0'
                >
                    {isEdit && <>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                        >
                            Simpan
                        </Button>
                    </>
                    }
                </Stack>
            </Grid>
        </form>
    )
}

export default Profile