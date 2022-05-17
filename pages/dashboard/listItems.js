import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import PendingIcon from '@mui/icons-material/Pending';

const MainListItems = ({ setMenu }) => {
    const AuthState = useSelector((state) => state.Auth);
    const UserData = AuthState.userData;
    const isAdmin = UserData?.role === 'admin';

    if (!isAdmin) return (
        <React.Fragment>
            <ListItemButton onClick={() => setMenu('profile')}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton onClick={() => setMenu('myrequest')}>
                <ListItemIcon>
                    <PendingIcon />
                </ListItemIcon>
                <ListItemText primary="My Request" />
            </ListItemButton>
        </React.Fragment>)
    return (
        <React.Fragment>
            <ListItemButton onClick={() => setMenu('request')}>
                <ListItemIcon >
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Request" />
            </ListItemButton>
            <ListItemButton onClick={() => setMenu('admin')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </React.Fragment>
    )
}

export default MainListItems;