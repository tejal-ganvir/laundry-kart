import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import LocationAutocomplete from '../../components/SearchAutocomplete/LocationAutocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';

const EditProfileDetails = () => {
    const [address, setAddress] = useState('Prashant Nagar Amravati, 444606');
    const [selectedDate, handleDateChange] = useState(new Date());
    
      const formik = useFormik({
        initialValues: {
            mobile: "",
            dob: new Date(),
        },
        onSubmit: (values) => {
            if(values.mobile == "" || values.dob == null || address.length <= 0){
                toast("Please fill all values");
                return
            }
            console.log(values);
        },
      });

  return (
    <React.Fragment>
        <Box>
            <div className='form-control-area'>
                <TextField
                    id="mobile-profile-input"
                    label="Modile Number"
                    type="text"
                    size="small"
                    fullWidth
                    value={formik.values.mobile}
                    onChange={formik.handleChange('mobile')}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                />
            </div>
            <div className='form-control-area'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                    label="Date of Birth"
                    value={formik.values.dob}
                    onChange={(newValue) => {
                        formik.setFieldValue('dob', newValue)
                        //handleDateChange(newValue);
                    }}
                    //onChange={formik.handleChange('dob')}
                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                    helperText={formik.touched.dob && formik.errors.dob}
                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div className='form-control-area'>
                <LocationAutocomplete
                    addressFunc={{address, setAddress}}
                />
            </div>
            <div className='form-control-area text-center'>
                <Button 
                    align="center" 
                    variant='contained'
                    sx={{borderRadius: 4, px: 3}}
                    onClick={formik.handleSubmit}
                    //onClick={() => navigate('/account/dashboard')}
                >Save</Button>
            </div>
        </Box>
    </React.Fragment>
  );
};

export default EditProfileDetails;
