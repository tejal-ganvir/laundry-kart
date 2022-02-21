import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchJSON } from '../../services/axiosConfig/api';
import { MAPBOX_TOKEN } from '../../constants/constant';

const LocationAutocomplete = (props) => {

    const [options, setOptions] = useState([]);
    const [featureData, setFeatureData] = useState();
    const {address, setAddress} = props.addressFunc;

    const fetchLocation = (value) => {
        let string = encodeURIComponent(value.trim())
        const response = fetchJSON(`https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${MAPBOX_TOKEN}`, 'map')
        response.then((data) => {
            setFeatureData(data.features);
            let newOption = data.features.map((item, idx) => ({ label: item.place_name, id: idx }));
            setOptions(newOption);
        })
    }

    const onValueChange = (value) => {
        setAddress(featureData[value.id]);
    }

  return (
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
            sx={{mb:1}}
            options={options}
            renderInput={(params) => <TextField {...params} size='small' label="Enter Location (optional)" />}
        />
  )
}

export default LocationAutocomplete