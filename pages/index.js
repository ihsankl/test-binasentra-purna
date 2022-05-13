import {
  Autocomplete,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useState } from 'react';
import { Box } from '@mui/system';
import { JANGKA_WAKTU, OKUPASI } from '../constant';

const defaultValues = {
  jangkaWaktu: 1,
  okupasi: "Rumah",
  hargaBangunan: 0,
  konstruksi: 1,
  alamat: "",
  provinsi: "",
  kota: "",
  kabupaten: "",
  daerah: "",
  gempa: false,
}

const Home = () => {
  const theme = useTheme();
  const [formValues, setFormValues] = useState(defaultValues);
  const [provinsiValue, setProvinsiValue] = useState('');
  const ProvinsiData = [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <section style={{ padding: "2em" }}>
      {/* HEADER */}
      <Stack direction={"row"} justifyContent="space-between">
        <Typography variant="h4" gutterBottom component="div">
          Asuransi Kebakaran
        </Typography>
        <IconButton style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ArrowDownwardIcon />
        </IconButton>
      </Stack>
      <Divider />
      {/* ---HEADER--- */}

      {/* MAIN CONTENT */}
      <Grid container spacing={2} marginY={2}>
        {/* LEFT SIDE */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="subtitle1" gutterBottom component="div">
              Jangka Waktu Pertanggungan
            </Typography>
            <Select
              fullWidth
              id="jangka-waktu-penggunaan"
              name='jangkaWaktu'
              displayEmpty
              value={formValues.jangkaWaktu}
              onChange={handleChange}
            >
              {JANGKA_WAKTU.map((value, index) => {
                return (
                  <MenuItem
                    key={`jangka-waktu-${index}`}
                    value={value}
                  >
                    {value}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Box marginY={2} />
          <FormControl fullWidth>
            <Typography variant="subtitle1" gutterBottom component="div">
              Okupasi
            </Typography>
            <Select
              fullWidth
              id="jangka-waktu-penggunaan"
              name='okupasi'
              value={formValues.okupasi}
              onChange={handleChange}
            >
              {OKUPASI.map((value, index) => {
                return (
                  <MenuItem
                    key={`okupasi-${index}`}
                    value={value}
                  >
                    {value}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <Box marginY={2} />
          <FormControl fullWidth>
            <Typography variant="subtitle1" gutterBottom component="div">
              Harga Bangunan
            </Typography>
            <OutlinedInput
              id="outlined-basic"
              variant="outlined"
              name="hargaBangunan"
              displayEmpty
              type='number'
              value={formValues.hargaBangunan}
              onChange={handleChange}
              startAdornment={<InputAdornment position="start">Rp.</InputAdornment>}
            />
          </FormControl>
          <Box marginY={2} />
        </Grid>
        {/* RIGHT SIDE */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="subtitle1" gutterBottom component="div">
              Alamat Objek Pertanggungan
            </Typography>
            <TextField
              multiline
              rows={6}
              id="outlined-basic"
              variant="outlined"
              name="alamat"
              displayEmpty
              value={formValues.alamat}
              onChange={handleChange}
            />
          </FormControl>
          <Box marginY={2} />
          <FormControl fullWidth>
            <Typography variant="subtitle1" gutterBottom component="div">
              Provinsi
            </Typography>
            <Autocomplete
              value={provinsiValue}
              onChange={(event, newValue) => {
                const value = { ...formValues };
                value.provinsi = newValue?.id;
                setProvinsiValue(newValue?.name);
                setFormValues(value);
              }}
              name="provinsi"
              options={ProvinsiData.map((item) => {
                return {
                  ...item, label: `${item.name}`,
                };
              })}
              // eslint-disable-next-line max-len
              renderInput={(params) =>
                <TextField
                  // VALIDATION
                  // error={!formValues.provinsi} 
                  {...params}
                />
              }
            />
            {/* VALIDATION */}
            {/* {!formValues.provinsi &&
              <FormHelperText error={!formValues.provinsi}>
                Provinsi Harus diisi!
              </FormHelperText>
            } */}
          </FormControl>
          <Box marginY={2} />
          <Grid container>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Typography variant="subtitle1" gutterBottom component="div">
                  Kota/Kabupaten
                </Typography>
                <Autocomplete
                  value={provinsiValue}
                  onChange={(event, newValue) => {
                    const value = { ...formValues };
                    value.provinsi = newValue?.id;
                    setProvinsiValue(newValue?.name);
                    setFormValues(value);
                  }}
                  name="provinsi"
                  options={ProvinsiData.map((item) => {
                    return {
                      ...item, label: `${item.name}`,
                    };
                  })}
                  // eslint-disable-next-line max-len
                  renderInput={(params) =>
                    <TextField
                      // VALIDATION
                      // error={!formValues.provinsi} 
                      {...params}
                    />
                  }
                />
                {/* VALIDATION */}
                {/* {!formValues.provinsi &&
              <FormHelperText error={!formValues.provinsi}>
                Provinsi Harus diisi!
              </FormHelperText>
            } */}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth >
                <Typography variant="subtitle1" gutterBottom component="div">
                  Daerah
                </Typography>
                <Autocomplete
                  value={provinsiValue}
                  onChange={(event, newValue) => {
                    const value = { ...formValues };
                    value.provinsi = newValue?.id;
                    setProvinsiValue(newValue?.name);
                    setFormValues(value);
                  }}
                  name="provinsi"
                  options={ProvinsiData.map((item) => {
                    return {
                      ...item, label: `${item.name}`,
                    };
                  })}
                  // eslint-disable-next-line max-len
                  renderInput={(params) =>
                    <TextField
                      // VALIDATION
                      // error={!formValues.provinsi} 
                      {...params}
                    />
                  }
                />
                {/* VALIDATION */}
                {/* {!formValues.provinsi &&
              <FormHelperText error={!formValues.provinsi}>
                Provinsi Harus diisi!
              </FormHelperText>
            } */}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container >
        {/* LEFT SIDE */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="subtitle1" gutterBottom component="div">
              Konstruksi
            </Typography>
            <RadioGroup
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="1"
                control={
                  <Radio />}
                label="Kelas I"
              />
              <Typography
                marginLeft={4}
                variant="body2"
                gutterBottom
                color={theme.palette.disabled}
                component="div"
              >
                Dinding, lantai, dan semua komponen penunjang strukturalnya serta penutup atap terbuat seluruhnya dan sepenuhnya dari bahan-bahan yang tidak mudah terbakar
              </Typography>
              <FormControlLabel
                value="2"
                control={
                  <Radio />
                }
                label="Kelas II"
              />
              <Typography
                marginLeft={4}
                variant="body2"
                gutterBottom
                color={theme.palette.disabled}
                component="div"
              >
                Penutup atap terbuat dari strap kayu keras, dinding-dinding mengandung bahan-bahan yang dapat terbakar sampai maksimum 20% dari luas dinding. Lantai dan struktur-struktur penunjangnya terbuat dari kayu.
              </Typography>
              <FormControlLabel
                value="3"
                control={
                  <Radio />
                }
                label="Kelas 3"
              />
              <Typography
                marginLeft={4}
                variant="body2"
                gutterBottom
                color={theme.palette.disabled}
                component="div"
              >
                Selain konstruksi Kelas I dan Kelas II
              </Typography>
            </RadioGroup>
          </FormControl>
        </Grid>
        {/* RIGHT SIDE */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <Typography variant="subtitle1" gutterBottom component="div">
              Perluasan
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  value={formValues.gempa}
                  onChange={() => {
                    const temp = { ...formValues };
                    temp.gempa = !formValues.gempa;
                    setFormValues(temp);
                  }}
                />}
              label="Gempa Bumi"
            />
          </FormControl>
        </Grid>
      </Grid>
      {/* --- MAIN CONTENT --- */}
    </section>
  )
}

export default Home