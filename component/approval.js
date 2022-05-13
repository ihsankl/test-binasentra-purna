import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

// Generate Order Data
function createData(id, noInvoice, alamat, tipeOkupasi, total) {
    return { id, noInvoice, alamat, tipeOkupasi, total };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

const Approval = () => {
    return (
        <Table size="medium">
            <TableHead>
                <TableRow>
                    <TableCell>Nomor Invoice</TableCell>
                    <TableCell>Alamat</TableCell>
                    <TableCell>Tipe Okupasi</TableCell>
                    <TableCell>Total yang dibayar</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.noInvoice}</TableCell>
                        <TableCell>{row.alamat}</TableCell>
                        <TableCell>{row.tipeOkupasi}</TableCell>
                        <TableCell>{row.total}</TableCell>
                        <TableCell align="right">{`-`}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default Approval