import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthLayout } from '../../store/actions/layoutActions';
import { useFormik } from 'formik';
import * as yup from 'yup';

const ForgotPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setAuthLayout(true));

        return(() => dispatch(setAuthLayout(false)))
        
    },[]);

    const validationSchema = yup.object({
        email: yup
          .string('Enter your email')
          .email('Enter a valid email')
          .required('Email is required')
    });

    const formik = useFormik({
        initialValues: {
          email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values);
        },
    });

  return (
    <React.Fragment>
    <Container maxWidth="sm">
      <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:2, m:5 }}>
        <Typography variant='h6' align='center'>
          Forgot Password
        </Typography>
            <Box my={6}>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control-area'>
                    <TextField
                        id="forgot-password-input"
                        label="Email"
                        type="text"
                        size="small"
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange('email')}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>
                <div className='form-control-area text-center'>
                    <Button 
                        type='submit'
                        align="center" 
                        variant='contained'
                        sx={{borderRadius: 4, px: 3}}
                        //onClick={() => navigate('/account/dashboard')}
                    >Submit</Button>
                </div>
            </form>
            <div className='form-control-area'>
                <Typography>Already have an account? <Link to="/login" className='purpleLink'>Sign in</Link></Typography>
            </div>
            </Box>
      </Box>
    </Container>
  </React.Fragment>
  );
};

export default ForgotPassword;
