import React, { useState } from 'react';
import { Box } from '@mui/system';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import MapboxModal from '../components/Mapbox/MapboxModal';

const LocationSetter = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [locatonText, setLocatonText] = useState('Laundries Near Me');

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
                        {locatonText}
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

export default LocationSetter;
