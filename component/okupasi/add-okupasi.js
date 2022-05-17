import { Button, FormControl, Modal, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createOkupasi } from '../../redux/slicer/okupasi.slicer';

const defaultValues = {
    namaOkupasi: "",
    ratePremi: 0,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddOkupasi = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(defaultValues);

    const handleOnsubmit = (e) => {
        e.preventDefault();
        const data = { ...formValues };
        if (data.namaOkupasi !== '' || data.ratePremi !== 0) {
            dispatch(createOkupasi(data));
        } else {
            alert("Data tidak boleh kosong");
        }
        handleClose();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    Tambahkan Okupasi
                </Typography>
                <Box marginY={2} />
                <form onSubmit={handleOnsubmit}>
                    <FormControl fullWidth>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Okupasi
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name="namaOkupasi"
                            displayEmpty
                            onChange={handleInputChange}
                            value={formValues.namaOkupasi}
                        />
                    </FormControl>
                    <Box marginY={2} />
                    <FormControl fullWidth>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Rate Premi
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name="ratePremi"
                            displayEmpty
                            onChange={handleInputChange}
                            value={formValues.ratePremi}
                        />
                    </FormControl>
                    <Box marginY={2} />
                    <Stack direction='row' gap='1em'>
                        <Button
                            type="submit"
                            variant="contained"
                            color="info"
                        >
                            Ok
                        </Button>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            color="error"
                        >
                            Cancel
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Modal>
    )
}

export default AddOkupasi