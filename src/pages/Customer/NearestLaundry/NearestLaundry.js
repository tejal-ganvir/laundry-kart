import React from 'react';
import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LaundryCard from '../../../components/LaundryCard/LaundryCard';

const NearestLaundry = (props) => {
  return (
      <React.Fragment>
          <Box px={4}>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 3 }}
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
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <LaundryCard />
                </Grid>
            </Grid>
          </Box>
      </React.Fragment>
  );
};

export default NearestLaundry;
