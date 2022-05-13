import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Divider, Grid } from '@mui/material';
import Approval from '../../component/approval';
import Profile from '../../component/profile';
import Admin from '../../component/admin';

// Generate Data
function createData(id, noInvoice, alamat, tipeOkupasi, total) {
    return { id, noInvoice, alamat, tipeOkupasi, total };
}

const rows = [
    createData(
        0,
        'K.01.001.00001',
        'Mampang Prapatan',
        'Rumah',
        'IDR 1,000,000.00',
        '-',
    ),
    createData(
        1,
        'K.01.001.00002',
        'Mampang Prapatan',
        'Rumah',
        'IDR 1,000,000.00',
        '-',
    ),
    createData(
        2,
        'K.01.001.00003',
        'Mampang Prapatan',
        'Ruko',
        'IDR 1,000,000.00',
        '-',
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Content({ menu }) {
    const title = menu === 'approval' ? 'Approval' : 'Profile';
    return (
        <React.Fragment>
            <Title>{title}</Title>
            <Divider />
            {menu === 'approval' && <Approval />}
            {menu === 'profile' && <Profile />}
            {menu === 'admin' && <Admin />}
        </React.Fragment>
    );
}