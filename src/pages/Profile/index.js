import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import userImg from '../../assets/img/user-1.jpg'
import { Avatar, Chip, Typography } from '@mui/material';
import EditIcon from '../../components/EditIcon/EditIcon';
import EditDailouge from './EditDialog';
import EditProfile from './EditProfile';
import EditProfileDetails from './EditProfileDetails';
import { connect } from 'react-redux';

const Profile = ({loginstatus, data}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState(1);
    const {currentUser} = loginstatus;

    const address = data && data.address ? data.address : '';
    const addressObjectId = data && data.objectId ? data.objectId : '';
    const userObjectId = currentUser && currentUser.objectId ? currentUser.objectId : '';
    const setProfileImg = currentUser && currentUser.profileImg && currentUser.profileImg.url ? currentUser.profileImg.url : '';

    return (
        <React.Fragment>
            <Container maxWidth="lg" sx={{minHeight: 400}}>
                <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:2, textAlign:'center', position: 'relative' }}>
                    <EditIcon action={() => {setDialogOpen(true); setDialogType(1)}} />
                    <Avatar
                        alt={currentUser.username}
                        src={setProfileImg}
                        sx={{ width: 150, height: 150, mx:'auto' }}
                    />
                    <Typography variant='h5' sx={{fontWeight:'bold', my: 1}} >
                        {
                            (currentUser.firstName && currentUser.lastName) ?
                            `${currentUser.firstName} ${currentUser.lastName}` :
                            currentUser.username
                        } 
                    </Typography>
                    <Typography variant='p' sx={{fontWeight:'bold', mt: 3}} >{currentUser.username}</Typography>
                </Box>
                <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:2, my: 3, position: 'relative' }}>
                    <EditIcon action={() => {setDialogOpen(true); setDialogType(2)}} />
                    <table className='cust_card_table'>
                        <tbody>
                            <tr>
                                <td>Mobile Number</td>
                                <td>{currentUser.mobile || <Chip label="Click edit to add!" /> }</td>
                            </tr>
                            <tr>
                                <td>Date Of Birth</td>
                                <td>{currentUser.dob || <Chip label="Click edit to add!" /> }</td>
                            </tr>
                            {   (loginstatus.role === 'user') &&
                                <tr>
                                    <td>Address</td>
                                    <td>{address || <Chip label="Click edit to add!" /> }</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </Box>
            </Container>
            <EditDailouge
                size="sm"
                open={dialogOpen}
                hide={() => setDialogOpen(false)}
                title="Edit Profile"
                component={(dialogType === 1) ? 
                    <EditProfile 
                        profFirstName={currentUser.firstName || ''} 
                        profLastName={currentUser.lastName || ''} 
                        profileImg={setProfileImg}
                        userObjectId={userObjectId} 
                        hide={() => setDialogOpen(false)}
                    /> : 
                    (dialogType === 2) 
                    ? 
                    <EditProfileDetails 
                        userObjectId={userObjectId} 
                        mobile={currentUser.mobile || ''} 
                        dob={currentUser.dob || new Date()} 
                        currAddress={address || ''} 
                        addressObjectId={addressObjectId}
                        hide={() => setDialogOpen(false)}
                        role={loginstatus.role}
                    /> : 
                    'N/A'}
            />
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    const {data} = state.Location;
    const loginstatus = state.login;
    return {data, loginstatus};
};
  
export default connect(mapStateToProps, null)(Profile);
 