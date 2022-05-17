import { Alert, Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsuransiByUserId } from '../redux/slicer/asuransi.slicer';

const MyRequest = () => {
    const dispath = useDispatch();
    const AuthState = useSelector(state => state.Auth);
    const UserData = AuthState.userData;

    const AsuransiData = useSelector(state => state.Asuransi);
    const data = AsuransiData.data?.results || [];

    useEffect(() => {
        getMyRequest();

        return () => {

        }
    }, []);

    const getMyRequest = async () => {
        const data = {
            userId: UserData?.id
        }
        dispath(fetchAsuransiByUserId(data));
    };
    return (
        <Box padding="2em">
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
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.nomorPolis}</TableCell>
                                <TableCell>{row.jenisPenanggungan}</TableCell>
                                <TableCell>{row.nomorInvoice}</TableCell>
                                <TableCell>
                                    {row.statusPembayaran === 'Belum Dibayar' &&
                                        <Alert sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="standard" icon={false} severity="error">
                                            {row.statusPembayaran}
                                        </Alert>
                                    }
                                    {row.statusPembayaran === 'Sudah Dibayar' &&
                                        <Alert sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="standard" icon={false} severity="info">
                                            {row.statusPembayaran}
                                        </Alert>
                                    }
                                </TableCell>
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