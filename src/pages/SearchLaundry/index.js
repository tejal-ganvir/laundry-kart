import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import LaundryCard from '../../components/LaundryCard/LaundryCard';
import LoaderBackdrop from '../../components/LoaderBackdrop/LoaderBackdrop';
import { getLaundryList } from '../../store/actions/laundryActions';

const SearchLaundry = ({data, loading, error}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLaundryList());
    },[])

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
            <Box className='container' sx={{minHeight: 400}}>
                <Grid container direction="row" spacing={2}>
                    { loading ? <LoaderBackdrop open={loading} />  :
                        data.length > 0 ? 
                        data.map((item, idx) => (
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
    return {data, loading, error};
};
  
export default connect(mapStateToProps, null)(SearchLaundry);