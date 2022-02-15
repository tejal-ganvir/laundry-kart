import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import MapboxModal from '../components/Mapbox/MapboxModal';
import { connect, useDispatch } from 'react-redux';
import { postJSON } from '../services/axiosConfig/api';
import { setLocationData } from '../store/actions/locationActions';

const LocationSetter = (props) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [locatonText, setLocatonText] = useState('Laundries Near Me');
    const dispatch = useDispatch();

    useEffect(() => {
        const response = postJSON(`functions/getCustomerLocation?userId=${'6jq76obiZM'}`, {userId : '6jq76obiZM'});
        response.then(data => {
            dispatch(setLocationData(data.result[0]));
        })
    },[])

  return (
     <Box sx={{backgroundColor: '#7620FF', mb: 2, color: '#ffffff', py: 0.5}}>
         <div className="flexCenter animate purpuleBg">
            <div className="container flexSpaceCenter">
                <div>
                    <Button 
                        sx={{color: 'white', fontWeight:'bold', fontSize: 15}} 
                        startIcon={<AddLocationAltIcon />}
                        onClick={() => setDialogOpen(true)}
                    >
                        {props.data && props.data.name ? props.data.name : 'Laundries Near Me'}
                    </Button>
                </div>
                <div>
                    <Button sx={{
                        color: 'white', 
                        fontWeight:'bold', 
                        fontSize: 15, 
                        borderColor: 'white',
                        '&:hover': {
                            borderColor: 'white'
                         },
                    }} variant='outlined' endIcon={<SearchIcon />}>
                        Search
                    </Button>
                </div>
            </div>
         </div>
         <MapboxModal
            size="sm"
            open={dialogOpen}
            hide={() => setDialogOpen(false)}
            setText={setLocatonText}
         />
     </Box>
  );
};

const mapStateToProps = state => {
    const {data} = state.Location;
    return {data};
};
  
export default connect(mapStateToProps, null)(LocationSetter);
