import { Container, Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LaundryCard from '../../components/LaundryCard/LaundryCard';
import MapboxModal from '../../components/Mapbox/MapboxModal';

const SearchLaundry = () => {
  return (
      <React.Fragment>
            <Box sx={{py: 5, backgroundColor: '#f5f5f5'}}>
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
            </Box>
            <Box className='container flexSpaceCenter' sx={{py: 3}}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <LaundryCard />
                    </Grid>
                </Grid>
            </Box>
      </React.Fragment>
  );
};

export default SearchLaundry;
