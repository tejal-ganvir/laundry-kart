import React, { useEffect, useRef, useState } from 'react';
import Map, { Marker} from 'react-map-gl';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SearchAutocomplete from '../SearchAutocomplete/SearchAutocomplete';
import { fetchJSON, postJSON } from '../../services/axiosConfig/api';
import { MAPBOX_TOKEN } from '../../constants/constant';
import { connect, useDispatch } from 'react-redux';
import { setLocationData } from '../../store/actions/locationActions';

const MapboxModal = (props) => {

    const mapRef = useRef();
    const [currlong, setCurrLong] = useState(78.9629);
    const [currlat, setCurrLat] = useState(20.5937);
    const [zoom, setZoom] = useState(3.5);
    const [autoOpen, setAutoOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [featureData, setFeatureData] = useState();
    const dispatch = useDispatch();
    const userId = props && props.currentUser && props.currentUser.objectId ? props.currentUser.objectId : '';
    const addressObjectId = props && props.data && props.data.objectId ? props.data.objectId : '';

    useEffect(() => {
        if(props.firstTimeLocation){
            if ("geolocation" in navigator) { 
                navigator.geolocation.getCurrentPosition(position => {
                    const response = fetchJSON(`https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${MAPBOX_TOKEN}`, 'map')
                    response.then((data) => {
                        let nowFeature = data.features[2];
                        const options = {
                            long: nowFeature.center[0],
                            lat: nowFeature.center[1],
                            name: nowFeature.place_name,
                            address: nowFeature.place_name,
                            city: nowFeature.context[0].text,
                            pin: nowFeature.context[1].short_code,
                            state: nowFeature.context[1].text,
                            country: nowFeature.context[2].text,
                            userId: userId,
                            objectId: addressObjectId,
                        };
                        let response = postJSON('functions/saveLocationDetails', options);
                        response.then(({result})=> {
                            props.setText(nowFeature.place_name);
                            dispatch(setLocationData({...options, objectId: result.objectId}));
                        })
                        setCurrLong(position.coords.longitude);
                        setCurrLat(position.coords.latitude);
                        setZoom(10);
                    })
                });
            }
        }
    },[props.firstTimeLocation])

    const onMarkerDragEnd = ({lngLat}) => {
        const {lat, lng} = lngLat;
        setCurrLat(lat);
        setCurrLong(lng);
        mapRef.current.flyTo({center: [lng, lat], zoom: 10, duration: 2000});
        //console.log(mapRef.current.flyTo);
        const response = fetchJSON(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`, 'map')
        response.then((data) => {
            let newOption = data.features.map((item, idx) => ({ label: item.place_name, id: idx }));
            setFeatureData(data.features);
            setOptions(newOption);
            setAutoOpen(true);
        })
    };

  return (
        <Dialog
            fullWidth={true}
            maxWidth={props.size}
            open={props.open}
            onClose={props.hide}
        >
            {props.title && <DialogTitle>{props.title}</DialogTitle>}
            <DialogContent>
                <Map
                    ref={mapRef}
                    initialViewState={{
                        longitude: currlong,
                        latitude: currlat,
                        zoom: zoom,
                        bearing: 0,
                        pitch: 0
                    }}
                    style={{width: '100%', height: '60vh'}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={MAPBOX_TOKEN}
                >
                    <Marker 
                        longitude={currlong} 
                        latitude={currlat} 
                        anchor="bottom" 
                        draggable
                        rotationAlignment="auto"
                        onDragEnd={onMarkerDragEnd}
                    />
                </Map>
                <SearchAutocomplete 
                    open={autoOpen}
                    setOpen={setAutoOpen}
                    options={options} 
                    setOptions={setOptions}
                    currMapRef={mapRef}
                    featureFunc={{featureData, setFeatureData}}
                    latLng={{setCurrLat,setCurrLong}}
                    setLocationText={props.setText}
                    hideModal={props.hide}
                    currLocData={props.data}
                    currentUser={props.currentUser}
                />
            </DialogContent>
        </Dialog>
    )
};

const mapStateToProps = state => {
    const {data} = state.Location;
    const {currentUser} = state.login;
    return {data, currentUser};
};
  
export default connect(mapStateToProps, null)(MapboxModal);