import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import LocationAutocomplete from '../../components/SearchAutocomplete/LocationAutocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { postJSON } from '../../services/axiosConfig/api';
import { formatDate, isObjEmpty } from '../../utilis/functions';
import { useDispatch } from 'react-redux';
import { LoginSuccess } from '../../store/actions/loginActions';
import { setLocationData } from '../../store/actions/locationActions';
import LoadingButton from '@mui/lab/LoadingButton';

const EditProfileDetails = (props) => {
    const [address, setAddress] = useState({});
    const [loading, setLoading] = useState(false);
    const {mobile, dob, addressObjectId, userObjectId, hide, role} = props;
    const dispatch = useDispatch();
    
      const formik = useFormik({
        initialValues: {
            mobile: mobile,
            dob: dob,
        },
        onSubmit: (values) => {
            if(values.mobile == "" || values.dob == null){
                toast("Please fill all values");
                return
            }

            setLoading(true);

            const saveUser = postJSON('functions/updateProfileDetails', {objectId: userObjectId, mobile: values.mobile, dob: formatDate(values.dob)});
                saveUser.then(data => {
                    if(!isObjEmpty(address)){
                        const options = {
                            long: address.center[0],
                            lat: address.center[1],
                            name: address.place_name,
                            address: address.place_name,
                            city: address.context[0].text,
                            pin: address.context[1].short_code || address.context[2].short_code,
                            state: address.context[1].text,
                            country: address.context[2].text,
                            userId: userObjectId,
                            objectId: addressObjectId,
                        };
                        
                        let response = postJSON('functions/saveLocationDetails', options);
                        response.then(({result})=> {
                            dispatch(setLocationData({...options, objectId: result.objectId}));
                            setAddress({});
                        })
                    }
                    dispatch(LoginSuccess(data.result));
                    hide();
                    setLoading(false);
                })
        },
      });

  return (
    <React.Fragment>
        <form onSubmit={formik.handleSubmit}>
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
                {   (role === 'user') &&
                    <div className='form-control-area'>
                        <LocationAutocomplete
                            addressFunc={{address, setAddress}}
                        />
                    </div>
                }
                <div className='form-control-area text-center'>
                    <LoadingButton 
                        align="center" 
                        variant='contained'
                        sx={{borderRadius: 4, px: 3}}
                        type="submit"
                        loading={loading}
                    >Save</LoadingButton>
                </div>
            </Box>
        </form>
    </React.Fragment>
  );
};

export default EditProfileDetails;
