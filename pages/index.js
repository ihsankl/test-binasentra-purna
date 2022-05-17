import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainListItems from './dashboard/listItems';
import Content from './dashboard/Content';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardContent, Menu, MenuItem, Stack } from '@mui/material';
import { capitalizeFirstLetter } from '../helper';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slicer/auth.slicer';

const drawerWidth = 240;
const isMain = true;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

function DashboardContent() {
    const AuthState = useSelector((state) => state.Auth);
    const tokens = AuthState.tokens;
    const UserData = AuthState.userData;
    const isAdmin = UserData?.role === 'admin';

    const router = useRouter();
    const dispatch = useDispatch();
    const [menu, setMenu] = React.useState(!isAdmin ? 'profile' : 'request');
    const [anchorEl, setAchorEl] = React.useState(null);

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    {/* <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {/* {capitalizeFirstLetter(menu)} */}
                    </Typography>
                    <IconButton onClick={(e) => setAchorEl(e.currentTarget)} color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={!!anchorEl}
                        onClose={() => setAchorEl(null)}
                    >
                        <MenuItem onClick={() => {
                            setMenu('profile');
                            setAchorEl(null)
                        }}>
                            My Profile
                        </MenuItem>
                        <MenuItem onClick={() => {
                            const data = {
                                refreshToken: tokens.refresh.token
                            };
                            dispatch(logout(data));
                        }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            {/* <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>

                </Toolbar>
                <Divider />
                <List component="nav">
                    <MainListItems setMenu={setMenu} />
                    <Divider sx={{ my: 1 }} />
                </List>
            </Drawer> */}
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '450px' }}>
                                <Stack direction='row' gap='1em' flexWrap='wrap'>
                                    <Card >
                                        <CardActionArea onClick={() => router.push('/request')} sx={{ padding: '1em 2em' }}>
                                            <CardContent >
                                                Pengajuan Asuransi Baru
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                    <Card >
                                        <CardActionArea onClick={() => router.push('/dashboard')} sx={{ padding: '1em 2em' }}>
                                            <CardContent >
                                                Dashboard
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}