import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import userImg from '../../assets/img/user-1.jpg'
import { Avatar, Typography } from '@mui/material';
import EditIcon from '../../components/EditIcon/EditIcon';
import EditDailouge from './EditDialog';
import EditProfile from './EditProfile';
import EditProfileDetails from './EditProfileDetails';

const Profile = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState(1);
    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:2, textAlign:'center', position: 'relative' }}>
                    <EditIcon action={() => {setDialogOpen(true); setDialogType(1)}} />
                    <Avatar
                        alt="Angelina Jolie"
                        src={userImg}
                        sx={{ width: 150, height: 150, mx:'auto' }}
                    />
                    <Typography variant='h5' sx={{fontWeight:'bold', my: 1}} >Angelina Jolie</Typography>
                    <Typography variant='p' sx={{fontWeight:'bold', mt: 3}} >angelina.jolie@gmail.com</Typography>
                </Box>
                <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:2, my: 3, position: 'relative' }}>
                    <EditIcon action={() => {setDialogOpen(true); setDialogType(2)}} />
                    <table className='cust_card_table'>
                        <tbody>
                            <tr>
                                <td>Mobile Number</td>
                                <td>+91 7972152043</td>
                            </tr>
                            <tr>
                                <td>Date Of Birth</td>
                                <td>23 Jan 1997</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>Prashant Nagar Amravati, 444606</td>
                            </tr>
                        </tbody>
                    </table>
                </Box>
            </Container>
            <EditDailouge
                size="sm"
                open={dialogOpen}
                hide={() => setDialogOpen(false)}
                title="Edit Profile"
                component={(dialogType === 1) ? <EditProfile /> : (dialogType === 2) ? <EditProfileDetails /> : 'N/A'}
            />
        </React.Fragment>
    )
};
export default Profile;
 