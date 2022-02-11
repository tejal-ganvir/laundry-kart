import React, { useRef, useState } from 'react';
import Map, {Marker} from 'react-map-gl';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import SearchAutocomplete from '../SearchAutocomplete/SearchAutocomplete';
import { fetchJSON } from '../../services/api';
import { MAPBOX_TOKEN } from '../../constants/constant';

const MapboxModal = (props) => {

    const mapRef = useRef();
    const [currlong, setCurrLong] = useState(78.9629);
    const [currlat, setCurrLat] = useState(20.5937);
    const [autoOpen, setAutoOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [featureData, setFeatureData] = useState();

    const onMarkerDragEnd = ({lngLat}) => {
        const {lat, lng} = lngLat;
        setCurrLat(lat);
        setCurrLong(lng);
        mapRef.current.flyTo({center: [lng, lat], zoom: 10, duration: 2000});
        //console.log(mapRef.current.flyTo);
        const response = fetchJSON(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`)
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
                        zoom: 3.5,
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
                />
            </DialogContent>
        </Dialog>
    )
};

export default MapboxModal