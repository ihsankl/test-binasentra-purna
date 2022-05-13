import {
    Box,
    useTheme,
    Button,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography
} from '@mui/material'
import React from 'react'

const Invoice = () => {
    const theme = useTheme();
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
                                No. Invoice: K.001.0001
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={2}>
                        <Stack direction="row" alignItems="center" height="100%">
                            <Typography variant="h6" gutterBottom component="div">
                                1 Tahun
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
                                IDR 1,000,000,000.00
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
                                {`Premi Dasar: IDR 38,750.00`}
                            </Typography>
                            <Typography borderBottom="thin solid rgba(0, 0, 0, 0.12)" padding="1.5em" width="100%" textAlign="right" variant="h4" gutterBottom component="div">
                                {`Biaya Admin: IDR 10,000.00`}
                            </Typography>
                            <Typography borderBottom="thin solid rgba(0, 0, 0, 0.12)" padding="1.5em" width="100%" textAlign="right" variant="h4" gutterBottom component="div">
                                {`Total: IDR 48,750.00`}
                            </Typography>
                        </Stack>
                        <Stack direction="row" width="100%" justifyContent="flex-end">
                            <Button variant="contained" sx={{ borderRadius: "9999px", padding: "1em 2em" }}>Lanjutkan Ke Pembayaran</Button>
                        </Stack>
                    </Grid>
                    {/* ---INVOICE--- */}

                </Grid>
            </Paper>
        </section >
    )
}

export default Invoice