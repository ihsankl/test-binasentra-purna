import {
  Autocomplete,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
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
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router'

import { API_URL, JANGKA_WAKTU } from '../../constant';
import axios from 'axios';
import { setAsuransiData } from '../../redux/slicer/appstate.slicer';

const defaultValues = {
  jangkaWaktu: 1,
  okupasi: "Rumah",
  hargaBangunan: 0,
  konstruksi: 1,
  alamat: "",
  provinsi: "",
  kabupaten: "",
  daerah: "",
  gempa: false,
}

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  const [formValues, setFormValues] = useState(defaultValues);
  const [okupasiData, setOkupasiData] = useState([]);
  const [ratePremiData, setRatePremiData] = useState([]);
  const [provinsiValue, setProvinsiValue] = useState('');
  const [kabupatenValue, setKabupatenValue] = useState('');
  const [daerahValue, setDaerahValue] = useState('');

  const [ProvinsiData, setProvinsiData] = useState([]);
  const [KabupatenData, setKabupatenData] = useState([]);
  const [DaerahData, setDaerahData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    getWilayah();
    getOkupasi();

    return () => {

    }
  }, []);

  const getWilayah = async (id_propinsi = null, id_kabupaten = null) => {
    try {
      if (id_propinsi) {
        const kabupatenKotaResult = await axios.get(`https://api.binderbyte.com/wilayah/kabupaten?api_key=3a4589dd7bf91b33ee0bd199a8172964facbc773aa898e7f7d5aff9bde4b3565&id_provinsi=${id_propinsi}`);
        if (kabupatenKotaResult) {
          setKabupatenData(kabupatenKotaResult.data.value);
        }
      }

      if (id_kabupaten) {
        const kecamatanResult = await axios.get(`https://api.binderbyte.com/wilayah/kecamatan?api_key=3a4589dd7bf91b33ee0bd199a8172964facbc773aa898e7f7d5aff9bde4b3565&id_kabupaten=${id_kabupaten}`);
        if (kecamatanResult) {
          setDaerahData(kecamatanResult.data.value);
        }
      }

      if (!id_propinsi && !id_kabupaten) {
        const provinsiResult = await axios.get(`https://api.binderbyte.com/wilayah/provinsi?api_key=3a4589dd7bf91b33ee0bd199a8172964facbc773aa898e7f7d5aff9bde4b3565`)

        if (provinsiResult) {
          setProvinsiData(provinsiResult.data.value);
        }
      }

    } catch (error) {
      console.log(error.message);
    }
  };

  const getOkupasi = async () => {
    try {
      const result = await axios.get(`${API_URL}/okupasi`);
      if (result) {
        setOkupasiData(result.data.data.results);
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleOnsubmit = (event) => {
    event.preventDefault();
    const ratePremi = okupasiData.find(item => item.namaOkupasi === formValues.okupasi).ratePremi;
    dispatch(setAsuransiData({ ...formValues, ratePremi }));
    router.push('/invoice');
  };

  const checkPremiDisabled = () => {
    if (
      !formValues.jangkaWaktu ||
      !formValues.okupasi ||
      !formValues.hargaBangunan ||
      !formValues.konstruksi ||
      !formValues.alamat ||
      !formValues.provinsi ||
      !formValues.kabupaten ||
      !formValues.daerah
    ) return true;
    return false;
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
      <form onSubmit={handleOnsubmit}>
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
                disabled={okupasiData.length === 0}
                fullWidth
                id="jangka-waktu-penggunaan"
                name='okupasi'
                value={formValues.okupasi}
                onChange={handleChange}
              >
                {okupasiData.map((value, index) => {
                  return (
                    <MenuItem
                      key={`okupasi-${index}`}
                      value={value.namaOkupasi}
                    >
                      {value.namaOkupasi}
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
                disabled={ProvinsiData.length === 0}
                value={provinsiValue}
                onChange={(event, newValue) => {
                  const value = { ...formValues };
                  value.provinsi = newValue?.name;
                  setProvinsiValue(newValue?.name);
                  setFormValues(value);
                  getWilayah(newValue?.id, null);
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
                    disabled={KabupatenData.length === 0}
                    value={kabupatenValue}
                    onChange={(event, newValue) => {
                      const value = { ...formValues };
                      value.kabupaten = newValue?.name;
                      setKabupatenValue(newValue?.name);
                      setFormValues(value);
                      getWilayah(null, newValue?.id);
                    }}
                    name="kabupaten"
                    options={KabupatenData.map((item) => {
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
                    disabled={DaerahData.length === 0}
                    value={daerahValue}
                    onChange={(event, newValue) => {
                      const value = { ...formValues };
                      value.daerah = newValue?.name;
                      setDaerahValue(newValue?.name);
                      setFormValues(value);
                    }}
                    name="daerah"
                    options={DaerahData.map((item) => {
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
                defaultValue="1"
                name="radio-buttons-group"
                onChange={e => {
                  const temp = { ...formValues };
                  temp.konstruksi = e.target.value;
                  setFormValues(temp);
                }}
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

        {/* SUBMIT BUTTON */}
        <Grid item xs={12} marginY={4}>
          <Button
            type='submit'
            disabled={checkPremiDisabled()}
            fullWidth
            variant="contained"
            sx={{ padding: "1em 2em" }}
          // onClick={() => alert('ok')}
          >Check Premi
          </Button>
        </Grid>
        {/* ---SUBMIT BUTTON--- */}
      </form>
    </section>
  )
}

export default Home