import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const Login = (props) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Box component="div" sx={{boxShadow: 2, p:4, m:4 }}>
          <Typography variant='h6' align='center'>
            Welcome to LaundryKart
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
            <div className='form-control-area text-center'>
              <Button 
                align="center" 
                variant='contained'
                sx={{borderRadius: 4, px: 3}}
              >Login</Button>
            </div>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Login;
