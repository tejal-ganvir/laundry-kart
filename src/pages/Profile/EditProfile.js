import React, { useRef, useState }  from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import AvatarEditor from 'react-avatar-editor';
import userImg from '../../assets/img/user-1.jpg'

const EditProfile = () => {

    const [imgUrl , setImgUrl] = useState(userImg);
    const profileRef = useRef();

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            /*Maximum allowed size in bytes
            20MB Example
            Change first operand(multiplier) for your needs*/
            const maxAllowedSize = 20 * 1024 * 1024;
            if (e.target.files[0].size > maxAllowedSize) {
                // Here you can ask your users to load correct file
                console.log('File Size too Large');
            } else {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    setImgUrl(reader.result);
                });
                reader.readAsDataURL(e.target.files[0]);
            }
        }
    };

  return (
    <React.Fragment>
        <Box>
            <div className='form-control-area'>
                <TextField
                    id="firstname-profile-input"
                    label="First Name"
                    type="text"
                    size="small"
                    value="Angelina"
                    fullWidth
                />
            </div>
            <div className='form-control-area'>
                <TextField
                    id="lastname-profile-input"
                    label="Last Name"
                    type="text"
                    size="small"
                    value="Jolie"
                    fullWidth
                />
            </div>
            <div className='form-control-area'>
                <Button
                    variant="outlined"
                    component="label"
                >
                    Set Profile Pic
                    <input
                        type="file"
                        onChange={(e) => onSelectFile(e)} 
                        accept="image/x-png,image/jpeg,image/jpg,image/png"
                        hidden
                    />
                </Button>
                <Box mt={2}>
                    <AvatarEditor
                        ref={profileRef}
                        image={imgUrl}
                        width={250}
                        height={250}
                        border={10}
                        borderRadius={150}
                        scale={1}
                    />
                </Box>
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

export default EditProfile;
