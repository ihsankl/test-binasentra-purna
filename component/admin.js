import { Button, Grid, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteOkupasi, fetchOkupasi } from '../redux/slicer/okupasi.slicer';
import AddIcon from '@mui/icons-material/Add';
import AddOkupasi from './okupasi/add-okupasi';
import EditOkupasi from './okupasi/edit-okupasi';

const Admin = () => {
    const dispatch = useDispatch();
    const OkupasiState = useSelector((state) => state.Okupasi);
    const data = OkupasiState.data?.results || [];
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [idToEdit, setIdToEdit] = useState('');

    useEffect(() => {
        getOkupasi();

        return () => {

        }
    }, []);

    const getOkupasi = () => {
        dispatch(fetchOkupasi());
    };

    const handleDeleteOkupasi = (id) => {
        const data = { id }
        dispatch(deleteOkupasi(data));
    };

    const handleEditData = (id) => {
        // send row to edit modal
        setIdToEdit(id);
        setOpenEditModal(true);
    };

    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
                <Grid container space={2} marginY={2} padding="2em">
                    <Stack direction="row" width="100%" justifyContent='flex-end'>
                        <Button
                            onClick={() => setOpenAddModal(true)}
                            variant="contained"
                            color="info"
                            startIcon={<AddIcon />}
                        >
                            Add
                        </Button>
                    </Stack>
                    <Box marginY={2} />
                    <Grid item xs={12}>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Okupasi</TableCell>
                                    <TableCell>Rate Premi</TableCell>
                                    <TableCell align="right">Aksi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.namaOkupasi}</TableCell>
                                        <TableCell>{row.ratePremi}</TableCell>
                                        <TableCell align='right'>
                                            <Button onClick={() => {
                                                handleEditData(row.id);
                                            }} variant="contained" color="info">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDeleteOkupasi(row.id)} variant="contained" color="error">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </form>
            <AddOkupasi
                open={openAddModal}
                handleClose={() => setOpenAddModal(false)}
            />
            <EditOkupasi
                open={openEditModal}
                handleClose={() => setOpenEditModal(false)}
                data={data}
                id={idToEdit}
            />
        </>
    )
}

export default Admin