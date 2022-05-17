import {
    Box,
    useTheme,
    Button,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL } from '../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { autoIncrement, rupiahFormatter } from '../../helper';
import { createAsuransi } from '../../redux/slicer/asuransi.slicer';

const Invoice = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const asuransiData = useSelector((state) => state.AppState.asuransiData);
    const AuthState = useSelector((state) => state.Auth);
    const UserData = AuthState.userData;

    const [newInvoice, setNewInvoice] = useState([]);

    useEffect(() => {
        getLastInvoice();
        return () => {

        }
    }, [])

    const getLastInvoice = async () => {
        try {
            const result = await axios.get(`${API_URL}/asuransi/last`);
            if (result) {
                const lastInvoice = result.data.data.nomorInvoice;
                {/* format: K.001.XXXXX */ }

                const splitLastInvoice = lastInvoice.split('.');
                const newInvoiceLastDigit = parseInt(splitLastInvoice[2]) + 1;
                const newInvoiceTemp = `K.001.${autoIncrement(newInvoiceLastDigit)}`
                setNewInvoice(newInvoiceTemp);
            }
        } catch (error) {
            setNewInvoice('K.001.00001');
            console.log(error.message);
        }
    };

    const PremiDasar = () => {
        // Premi Dasar = Harga Bangunan x rate premi / 1000 x jangka waktu (dalam tahun)
        const hargaBangunan = asuransiData.hargaBangunan;
        const jangkaWaktu = asuransiData.jangkaWaktu;
        return (hargaBangunan) * (asuransiData.ratePremi) / 1000 * (jangkaWaktu);
    };

    const Total = () => {
        // Total yang harus dibayar = Premi Dasar + Biaya Administrasi
        const premiDasar = PremiDasar();
        const biayaAdmin = 10000;
        return Number(premiDasar) + Number(biayaAdmin);
    };

    const handleOnsubmit = () => {
        try {
            const data = {
                jangkaWaktuPertanggungan: asuransiData?.jangkaWaktu,
                hargaBangunan: asuransiData?.hargaBangunan,
                konstruksi: asuransiData?.konstruksi,
                alamat: asuransiData?.alamat,
                provinsi: asuransiData?.provinsi,
                kabupaten: asuransiData?.kabupaten,
                daerah: asuransiData?.daerah,
                gempa: asuransiData?.gempa,
                nomorInvoice: newInvoice,
                userId: UserData?.id,
                premiDasar: PremiDasar(),
                okupasi: asuransiData?.okupasi,
                total: Total(),
            }
            dispatch(createAsuransi(data));
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <section style={{ padding: "2em", background: theme.palette.grey[200], height: "2000px" }}>
            <Paper sx={{ padding: "1em" }}>
                {/* HEADER */}
                <Grid container marginY={2}>
                    <Grid item xs={6}>
                        <Typography variant="h4" gutterBottom component="div">
                            Premi Terbaik
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h4" gutterBottom component="div">
                            Periode
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h4" gutterBottom component="div">
                            Perluasan
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h4" gutterBottom component="div">
                            Harga Bangunan
                        </Typography>
                    </Grid>
                </Grid>
                <Divider />
                {/* ---HEADER--- */}

                <Grid container marginY={2}>
                    {/* MAIN CONTENT */}
                    <Grid item xs={6}>
                        <Stack margin={2} justifyContent="center">
                            <Typography variant="h6" gutterBottom component="div">
                                Asuransi Kebakaran
                            </Typography>
                            <Typography variant="body1" gutterBottom component="div">
                                Rumah Tinggal bukan Ruko
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                No. Invoice: {newInvoice}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={2}>
                        <Stack direction="row" alignItems="center" height="100%">
                            <Typography variant="h6" gutterBottom component="div">
                                {asuransiData?.jangkaWaktu} Tahun
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={2}>
                        <Stack direction="row" alignItems="center" height="100%">
                            <Box
                                sx={{
                                    padding: "1em 2.5em",
                                    borderRadius: "2em",
                                    background: theme.palette.light,
                                    minWidth: "8em",
                                    maxWidth: "20em",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    gutterBottom
                                    component="div"
                                    color={theme.palette.primary.main}
                                >
                                    -
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={2}>
                        <Stack direction="row" alignItems="center" height="100%">
                            <Typography variant="h6" gutterBottom component="div">
                                {rupiahFormatter(asuransiData?.hargaBangunan)}
                            </Typography>
                        </Stack>
                    </Grid>
                    {/* ---MAIN CONTENT--- */}
                    <Grid item md={12}>
                        <Divider />
                    </Grid>

                    {/* INVOICE */}
                    <Grid item md={6} />
                    <Grid item md={6}>
                        <Stack
                            width="100%"
                            sx={{
                                borderLeft: "thin solid rgba(0, 0, 0, 0.12)",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Typography borderBottom="thin solid rgba(0, 0, 0, 0.12)" padding="1.5em" width="100%" textAlign="right" variant="h4" gutterBottom component="div">
                                {`Premi Dasar: ${rupiahFormatter(PremiDasar())}`}
                            </Typography>
                            <Typography borderBottom="thin solid rgba(0, 0, 0, 0.12)" padding="1.5em" width="100%" textAlign="right" variant="h4" gutterBottom component="div">
                                {`Biaya Admin: ${rupiahFormatter(10000)}`}
                            </Typography>
                            <Typography borderBottom="thin solid rgba(0, 0, 0, 0.12)" padding="1.5em" width="100%" textAlign="right" variant="h4" gutterBottom component="div">
                                {`Total: ${rupiahFormatter(Total())}`}
                            </Typography>
                        </Stack>
                        <Stack direction="row" width="100%" justifyContent="flex-end">
                            <Button
                                onClick={handleOnsubmit}
                                variant="contained"
                                sx={{ borderRadius: "9999px", padding: "1em 2em" }}
                                // disabled if no asuransiData
                                disabled={!asuransiData || Object.keys(asuransiData).length === 0}
                            >
                                Lanjutkan Ke Pembayaran
                            </Button>
                        </Stack>
                    </Grid>
                    {/* ---INVOICE--- */}

                </Grid>
            </Paper>
        </section >
    )
}

export default Invoice;