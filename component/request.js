import { Alert, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../constant';
import { autoIncrement, rupiahFormatter } from '../helper';
import { fetchAsuransi, updateAsuransi } from '../redux/slicer/asuransi.slicer';

const Request = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const AsuransiData = useSelector(state => state.Asuransi);
    const data = AsuransiData.data?.results || [];
    const [nomorPolis, setNomorPolis] = useState('');

    useEffect(() => {
        getAllAsuransi();
        getLastNomorPolis();
        return () => {

        }
    }, [])

    const getAllAsuransi = () => {
        dispatch(fetchAsuransi());
    };

    const handleSubmit = (status, whichData) => {
        const data = {
            ...whichData,
            status,
            statusPembayaran: status === 'Approve' ? 'Sudah Dibayar' : 'Belum Dibayar',
            nomorPolis: status === 'Approve' ? nomorPolis : 'Belum Terbit',
        };
        dispatch(updateAsuransi(data));
    };

    const getLastNomorPolis = async () => {
        try {
            const result = await axios.get(`${API_URL}/asuransi/last`);
            if (result) {
                const lastInvoice = result.data.data.nomorInvoice;
                const splitLastInvoice = lastInvoice.split('.');
                const newInvoiceLastDigit = parseInt(splitLastInvoice[2]);
                // format: BSP01.01.F15.20.00001.0
                const newNoPolisTemp = `BSP01.01.F15.20.${autoIncrement(newInvoiceLastDigit)}.0`
                setNomorPolis(newNoPolisTemp);
            }
        } catch (error) {
            setNomorPolis('BSP01.01.F15.20.00001.0');
            console.log(error.message);
        }
    };

    return (
        <Table size="medium">
            <TableHead>
                <TableRow>
                    <TableCell>Nomor Invoice</TableCell>
                    <TableCell>Alamat</TableCell>
                    <TableCell>Tipe Okupasi</TableCell>
                    <TableCell>Total yang dibayar</TableCell>
                    <TableCell align="right">Status</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.nomorInvoice}</TableCell>
                        <TableCell>{row.alamat}</TableCell>
                        <TableCell>{row.okupasi}</TableCell>
                        <TableCell>{rupiahFormatter(row.total)}</TableCell>
                        {!row.status ?
                            <>
                                <TableCell align="right">
                                    <Button onClick={() => handleSubmit('Approve', row)} variant="contained" color="info">
                                        Approve
                                    </Button>
                                    <Button onClick={() => handleSubmit('Reject', row)} variant="contained" color="error">
                                        Reject
                                    </Button>
                                </TableCell>
                            </> :
                            <TableCell align="right">
                                {row.status === 'Approve' &&
                                    <Alert sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="standard" icon={false} severity="info">
                                        {row.status}
                                    </Alert>
                                }
                                {row.status === 'Reject' &&
                                    <Alert sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="standard" icon={false} severity="error">
                                        {row.status}
                                    </Alert>
                                }
                            </TableCell>
                        }
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default Request