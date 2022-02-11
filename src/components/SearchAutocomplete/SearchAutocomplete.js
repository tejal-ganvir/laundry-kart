import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { fetchJSON } from '../../services/api';
import { MAPBOX_TOKEN } from '../../constants/constant';

const SearchAutocomplete = (props) => {
    
    const [value, setValue] = useState();
    const [isValueSelected, setIsValueSelected] = useState(false);
    const {featureData, setFeatureData} = props.featureFunc;
    const {setCurrLat,setCurrLong} = props.latLng;

    const fetchLocation = (value) => {
        let string = encodeURIComponent(value.trim())
        const response = fetchJSON(`https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${MAPBOX_TOKEN}`)
        response.then((data) => {
            setFeatureData(data.features);
            let newOption = data.features.map((item, idx) => ({ label: item.place_name, id: idx }));
            props.setOptions(newOption);

            if(!isValueSelected)
                props.setOpen(true);
            else
                setIsValueSelected(false);
        })
    }

    const onValueChange = (value) => {
        setValue(value.id);
        props.setLocationText(value.label)
        props.currMapRef.current.flyTo({center: featureData[value.id].center, zoom: 10, duration: 2000});
        setCurrLong(featureData[value.id].center[0]);
        setCurrLat(featureData[value.id].center[1]);
        props.setOpen(false);
        setIsValueSelected(true);
    }

    const handelSubmit = () =>{
        console.log(featureData[value]);
    }

  return (
    <Box mt={2}>
        {/* {value && JSON.stringify(featureData)} */}
        <Autocomplete
            disablePortal={true}
            freeSolo
            id="combo-box-demo"
            onChange={(event, newValue) => {
                onValueChange(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                fetchLocation(newInputValue);
            }}
            open={props.open}
            sx={{mb:1}}
            options={props.options}
            renderInput={(params) => <TextField {...params} size='small' label="Enter Location" />}
        />
        <div className='form-control-area text-center'>
            <Button
                align="center" 
                variant='contained'
                sx={{borderRadius: 4, px: 3}}
                onClick={() => handelSubmit()}
            >Save</Button>
        </div>
    </Box>
  );
};

export default SearchAutocomplete;
