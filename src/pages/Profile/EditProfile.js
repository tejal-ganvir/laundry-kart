import React, { useRef, useState }  from 'react';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import userImg from '../../assets/img/user-1.png'
import { postJSON } from '../../services/axiosConfig/api';
import { useDispatch } from 'react-redux';
import LoadingButton from '@mui/lab/LoadingButton';
import { LoginSuccess } from '../../store/actions/loginActions';
import { ucFirst } from '../../utilis/functions';
import { APPLICATION_ID, REST_API_KEY } from '../../constants/constant';
import axios from 'axios';

const EditProfile = ({profFirstName, profLastName, profileImg, userObjectId, hide}) => {

    const [imgUrl , setImgUrl] = useState(profileImg || userImg);
    const [firstName , setFirstName] = useState(profFirstName);
    const [lastName , setLastName] = useState(profLastName);
    const [imageData , setImageData] = useState();
    const [loading, setLoading] = useState(false);
    const profileRef = useRef();
    const dispatch = useDispatch();
    let newProfileImg;

    const onSelectFile = (e) => {
        
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const name = file.name;
            setImageData(e.target.files[0])
            
            /*Maximum allowed size in bytes
            20MB Example
            Change first operand(multiplier) for your needs*/
            //const maxAllowedSize = 20 * 1024 * 1024;
            // if (e.target.files[0].size > maxAllowedSize) {
            //     // Here you can ask your users to load correct file
            //     console.log('File Size too Large');
            // } else {
                
            // }
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgUrl(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
            
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        
        if(imageData){
            await axios({
                method: 'post',
                url: 'https://parseapi.back4app.com/files/a.jpeg',
                data: imageData,
                headers: {
                  'X-Parse-Application-Id': APPLICATION_ID,
                  'X-Parse-REST-API-Key': REST_API_KEY,
                  'Content-Type': 'image/jpeg', 
                }
            })
            .then((response)=>{
                newProfileImg = {
                    "name": response.data.name,
                    "url": response.data.url,
                    "__type": "File"
                };
                const saveImg = postJSON('functions/updateProfileDetails', 
                {   
                    objectId: userObjectId,
                    profileImg: newProfileImg,
                });
                saveImg.then(data => {
                    //console.log(data);
                    dispatch(LoginSuccess(data.result));
                });
                //console.log(newProfileImg);
            })
        }
        const saveUser = postJSON('functions/updateProfileDetails', 
        {   
            objectId: userObjectId, 
            firstName: ucFirst(firstName), 
            lastName: ucFirst(lastName),
        });
        saveUser.then(data => {
            dispatch(LoginSuccess(data.result));
            hide();
            setLoading(false);
        });
        
    }

  return (
    <React.Fragment>
        <Box>
            <div className='form-control-area'>
                <TextField
                    id="firstname-profile-input"
                    label="First Name"
                    type="text"
                    size="small"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                />
            </div>
            <div className='form-control-area'>
                <TextField
                    id="lastname-profile-input"
                    label="Last Name"
                    type="text"
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
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
                <LoadingButton 
                    loading={loading}
                    align="center" 
                    variant='contained'
                    sx={{borderRadius: 4, px: 3}}
                    onClick={() => handleSubmit()}
                >Save</LoadingButton>
            </div>
        </Box>
    </React.Fragment>
  );
};

export default EditProfile;
