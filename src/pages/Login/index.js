import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthLayout } from '../../store/actions/layoutActions';

const Login = (props) => {
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
            Sign In
          </Typography>
          <Box my={6}>
            <div className='form-control-area'>
              <TextField
                id="login-email-input"
                label="Email"
                type="email"
                size="small"
                fullWidth
              />
            </div>
            <div className='form-control-area'>
              <TextField
                id="login-password-input"
                label="Password"
                type="password"
                size="small"
                autoComplete="current-password"
                fullWidth
              />
            </div>
            <div className='form-control-area'>
              <Link to="/forgot-password"><Typography align='right' className='purpleLink'>Forgot password?</Typography></Link>
            </div>
            <div className='form-control-area text-center'>
              <Button 
                align="center" 
                variant='contained'
                sx={{borderRadius: 4, px: 3}}
                onClick={() => navigate('/vendor/dashboard')}
              >Login</Button>
            </div>
            <div className='form-control-area'>
              <Typography>Don't have an account? <Link to="/register" className='purpleLink'>Sign up</Link></Typography>
            </div>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Login;
