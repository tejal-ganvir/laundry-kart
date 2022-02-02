import React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AvatarEditor from 'react-avatar-editor';
import userImg from '../../assets/img/user-1.jpg'

const EditProfileDetails = () => {
  return (
    <React.Fragment>
        <Box>
            <div className='form-control-area'>
                <TextField
                    id="mobile-profile-input"
                    label="Modile Number"
                    type="text"
                    size="small"
                    value="+91 7972152043"
                    fullWidth
                />
            </div>
            <div className='form-control-area'>
                <TextField
                    id="dob-profile-input"
                    label="Date Of Birth"
                    type="text"
                    size="small"
                    value="23 Jan 1997"
                    fullWidth
                />
            </div>
            <div className='form-control-area'>
                <TextField
                    id="address-profile-input"
                    label="Address"
                    type="text"
                    size="small"
                    value="Prashant Nagar Amravati, 444606"
                    fullWidth
                />
            </div>
            <div className='form-control-area text-center'>
                <Button 
                    align="center" 
                    variant='contained'
                    sx={{borderRadius: 4, px: 3}}
                    //onClick={() => navigate('/account/dashboard')}
                >Save</Button>
            </div>
        </Box>
    </React.Fragment>
  );
};

export default EditProfileDetails;
