import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthLayout } from '../../store/actions/layoutActions';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setAuthLayout(true));

        return(() => dispatch(setAuthLayout(false)))

    },[])
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:2, m:4 }}>
          <Typography variant='h6' align='center'>
            Sign Up
          </Typography>
          <Box my={6}>
            <div className='form-control-area'>
              <TextField
                id="register-name-input"
                label="Name"
                type="text"
                size="small"
                fullWidth
              />
            </div>
            <div className='form-control-area'>
              <TextField
                id="register-email-input"
                label="Email"
                type="email"
                size="small"
                fullWidth
              />
            </div>
            <div className='form-control-area'>
              <TextField
                id="register-password-input"
                label="Password"
                type="password"
                size="small"
                autoComplete="current-password"
                fullWidth
              />
            </div>
            <div className='form-control-area'>
              <TextField
                id="register-confirm-password-input"
                label="Confirm Password"
                type="password"
                size="small"
                autoComplete="current-password"
                fullWidth
              />
            </div>
            <div className='form-control-area'>
                <FormLabel id="demo-row-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value="1" control={<Radio />} label="User" />
                    <FormControlLabel value="2" control={<Radio />} label="Vendor" />
                </RadioGroup>
            </div>
            <div className='form-control-area'>
              <TextField
                id="register-address-input"
                label="Address"
                type="text"
                size="small"
                autoComplete="current-password"
                fullWidth
              />
            </div>
            <div className='form-control-area'>
                <FormControlLabel control={<Checkbox defaultChecked />} label="I agree to Terms of Services and Privacy Policy" />
            </div>
            <div className='form-control-area text-center'>
              <Button 
                align="center" 
                variant='contained'
                sx={{borderRadius: 4, px: 3}}
                onClick={() => navigate('/account/dashboard')}
              >Sign Up</Button>
            </div>
            <div className='form-control-area'>
              <Typography>Already have an account? <Link to="/login" className='purpleLink'>Sign in</Link></Typography>
            </div>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Register;
