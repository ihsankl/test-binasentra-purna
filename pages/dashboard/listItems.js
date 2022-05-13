import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SIGNED_IN, ADMIN } from '../../constant';

const MainListItems = ({ setMenu }) => {
    const isLoggedIn = SIGNED_IN;
    const isAdmin = ADMIN;
    if (!isAdmin) return (
        <React.Fragment>
            <ListItemButton onClick={() => setMenu('approval')}>
                <ListItemIcon >
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Approval" />
            </ListItemButton>
            <ListItemButton onClick={() => setMenu('profile')}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
        </React.Fragment>)
    return (
        <React.Fragment>
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