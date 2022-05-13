import { Box, FormControl, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

const Profile = () => {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <Grid container space={2} marginY={2} padding="2em">
                {/* LEFT SIDE */}
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Nama
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name="alamat"
                            displayEmpty
                        />
                    </FormControl>
                    <Box marginY={2} />
                    <FormControl fullWidth>
                        <Typography variant="subtitle1" gutterBottom component="div">
                            Email
                        </Typography>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name="alamat"
                            displayEmpty
                        />
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    )
}

export default Profile