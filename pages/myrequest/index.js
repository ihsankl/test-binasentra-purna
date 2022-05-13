import { Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

// Generate Data
function createData(id, noPolis, jenisPenanggungan, noInvoice, status) {
    return { id, noPolis, jenisPenanggungan, noInvoice, status };
}

const rows = [
    createData(
        0,
        'BSP01.01.F15.20.00002.0',
        'Asuransi Kebakaran',
        'K.01.001.00001',
        'Sudah Dibayar',
        '-',
    ),
    createData(
        1,
        'BSP01.01.F15.20.00002.0',
        'Asuransi Kebakaran',
        'K.01.001.00001',
        'Sudah Dibayar',
        '-',
    ),
    createData(
        2,
        'BSP01.01.F15.20.00002.0',
        'Asuransi Kebakaran',
        'K.01.001.00001',
        'Sudah Dibayar',
        '-',
    ),
];

const MyRequest = () => {
    return (
        <Box padding="2em" sx={{ background: "#DDD", height: "2000px" }}>
            <Paper sx={{
                padding: "1em",
                width: "100%",
                display: "flex",
                gap: "2em"
            }}
            >
                <Button variant="text" sx={{ padding: "14px" }}>Kebakaran</Button>
                <Button variant="text" sx={{ padding: "14px" }}>Gempa Bumi</Button>
                <Button variant="text" sx={{ padding: "14px" }}>Kendaraan Bermotor</Button>
                <Button variant="text" sx={{ padding: "14px" }}>Kecelakaan Diri</Button>
                <Button variant="text" sx={{ padding: "14px" }}>Kesehatan</Button>
                <Box sx={{ flex: 1 }} />
                <Button variant="contained" sx={{ padding: "14px", justifySelf: "flex-start" }}>Pengajuan Klaim</Button>
            </Paper>
            <Box margin="2em 0" />
            <Paper sx={{
                padding: "1em",
                width: "100%",
                display: "flex",
                gap: "2em"
            }}
            >
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nomor Polis</TableCell>
                            <TableCell>Jenis Penanggungan</TableCell>
                            <TableCell>No. Invoice</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.noPolis}</TableCell>
                                <TableCell>{row.jenisPenanggungan}</TableCell>
                                <TableCell>{row.noInvoice}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell align="right">{`Lihat Rincian`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

        </Box>
    )
}

export default MyRequest