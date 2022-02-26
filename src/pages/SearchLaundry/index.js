import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import LaundryCard from '../../components/LaundryCard/LaundryCard';
import LoaderBackdrop from '../../components/LoaderBackdrop/LoaderBackdrop';
import { getLaundryList } from '../../store/actions/laundryActions';
import * as turf from "@turf/turf";
import { distanceFormula } from '../../utilis/functions';

const SearchLaundry = ({data, loading, error, locData}) => {

    const dispatch = useDispatch()
    let renderData = [];

    useEffect(() => {
        dispatch(getLaundryList());
    },[])

    const userLat = locData.lat || 20.5937;
    const userLong = locData.long || 78.9629;

    data && data.forEach((val) => {
        var from = turf.point([userLong, userLat]);
        var to = turf.point([val.long, val.lat]);
        var options = {units: 'kilometers'};
        var distance = turf.distance(from, to, options);
        renderData.push({...val, distance : Math.round(distance)});
    })

  return (
      <React.Fragment>
            {/* <Box sx={{py: 5, backgroundColor: '#f5f5f5'}}>
                <Container maxWidth="md">
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search Laundry"
                            inputProps={{ 'aria-label': 'search laundry' }}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Container>
            </Box> */}
            <Box className='container' sx={{minHeight: 440}}>
                <Grid container direction="row" spacing={2}>
                    { loading ? <LoaderBackdrop open={loading} />  :
                        renderData.length > 0 ? 
                        renderData.sort(distanceFormula).map((item, idx) => (
                            <Grid key={`laundry-list-item-${idx}`} item xs={12} sm={6} md={3}>
                                <LaundryCard {...item} />
                            </Grid>
                        ))
                        :
                        'No laundries found'
                    }
                </Grid>
            </Box>
      </React.Fragment>
  );
};

const mapStateToProps = state => {
    const {data, loading, error} = state.Laundry;
    const location = state.Location;
    let locData = location.data;
    return {data, loading, error, locData};
};
  
export default connect(mapStateToProps, null)(SearchLaundry);