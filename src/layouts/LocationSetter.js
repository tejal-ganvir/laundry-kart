import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import MapboxModal from '../components/Mapbox/MapboxModal';
import { connect, useDispatch } from 'react-redux';
import { postJSON } from '../services/axiosConfig/api';
import { setLocationData } from '../store/actions/locationActions';
import { useNavigate } from 'react-router-dom';
import { isObjEmpty } from '../utilis/functions';

const LocationSetter = (props) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [locatonText, setLocatonText] = useState('Laundries Near Me');
    const [isFirstLocation, setFirstLocation] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = props && props.currentUser && props.currentUser.objectId ? props.currentUser.objectId : '';

    useEffect(() => {
        const response = postJSON(`functions/getCustomerLocation?userId=${userId}`, {userId : userId});
        response.then(data => {
            if(isObjEmpty(data))
                setFirstLocation(true)
            else
                setFirstLocation(false)

            dispatch(setLocationData(data.result));
        })
    },[])

  return (
     <Box sx={{backgroundColor: '#7620FF', mb: 2, color: '#ffffff', py: 0.5}}>
         <div className="flexCenter animate purpuleBg">
            <div className="container flexSpaceCenter">
                <div>
                    <Button 
                        sx={{color: '#ffffff', fontWeight:'bold', fontSize: 15}} 
                        startIcon={<AddLocationAltIcon />}
                        onClick={() => setDialogOpen(true)}
                    >
                        {props.data && props.data.name ? props.data.name : 'Laundries Near Me'}
                    </Button>
                </div>
                {/* <div>
                    <Button sx={{
                        color: '#ffffff', 
                        fontWeight:'bold', 
                        fontSize: 15, 
                        borderColor: '#ffffff',
                        '&:hover': {
                            borderColor: '#ffffff'
                         },
                    }} 
                    variant='outlined' 
                    endIcon={<SearchIcon />}
                    onClick={() => navigate('/laundry')}
                    >
                        Search
                    </Button>
                </div> */}
            </div>
         </div>
         <MapboxModal
            size="sm"
            open={dialogOpen}
            hide={() => setDialogOpen(false)}
            setText={setLocatonText}
            firstTimeLocation={isFirstLocation}
         />
     </Box>
  );
};

const mapStateToProps = state => {
    const {data} = state.Location;
    const {currentUser} = state.login;
    return {data, currentUser};
};
  
export default connect(mapStateToProps, null)(LocationSetter);
