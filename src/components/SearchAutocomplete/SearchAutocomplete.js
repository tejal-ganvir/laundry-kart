import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';
import { fetchJSON, postJSON } from '../../services/axiosConfig/api';
import { MAPBOX_TOKEN } from '../../constants/constant';
import { connect, useDispatch } from 'react-redux';
import { setLocationData } from '../../store/actions/locationActions';

const SearchAutocomplete = (props) => {
    
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    const [loading, setLoading] = useState(false);
    const [isValueSelected, setIsValueSelected] = useState(false);
    const {featureData, setFeatureData} = props.featureFunc;
    const {setCurrLat,setCurrLong} = props.latLng;
    const userId = props && props.currentUser && props.currentUser.objectId ? props.currentUser.objectId : '';
    const addressObjectId = props && props.currLocData && props.currLocData.objectId ? props.currLocData.objectId : '';

    const fetchLocation = (value) => {
        let string = encodeURIComponent(value.trim())
        const response = fetchJSON(`https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${MAPBOX_TOKEN}`, 'map')
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
        props.setOpen(false);
        props.currMapRef.current.flyTo({center: featureData[value.id].center, zoom: 10, duration: 2000});
        setCurrLong(featureData[value.id].center[0]);
        setCurrLat(featureData[value.id].center[1]);
        setIsValueSelected(true);
    }

    const handelSubmit = () =>{
        setLoading(true);
        const location = featureData[value];
        const options = {
            long: location.center[0],
            lat: location.center[1],
            name: location.place_name,
            address: location.place_name,
            city: location.context[0].text,
            pin: location.context[1].short_code,
            state: location.context[1].text,
            country: location.context[2].text,
            userId: userId,
            objectId: addressObjectId,
        };
        let response = postJSON('functions/saveLocationDetails', options);
        response.then(({result}) => {
            setLoading(false);
            props.setLocationText(location.place_name);
            props.hideModal();
            dispatch(setLocationData({...options, objectId: result.objectId}));
        })
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
            <LoadingButton
                loading={loading}
                align="center" 
                variant='contained'
                sx={{borderRadius: 4, px: 3}}
                onClick={() => handelSubmit()}
            >Save</LoadingButton>
        </div>
    </Box>
  );
};
  
export default SearchAutocomplete;
