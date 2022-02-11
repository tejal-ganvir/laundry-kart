import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Carousel from '../../components/Carousel/Carousel';
import BookingTable from './BookingTable';

const LaundryDetails = () => {
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:4, mb: 4}}>
          <Grid container direction="row" spacing={2}>
            <Grid item sm={12} lg={6}>
              <Carousel height={400} />
            </Grid>
            <Grid item sm={12} lg={6}>
              <Typography variant='h4' mb={2} className='text-center semiBold'>Super Laundry</Typography>
              <Typography sx={{fontWeight: 'bold', fontSize:'16px'}} className='pinkColor'>About:</Typography>
              <Typography>
                I'll go over the colors one more time that we use: Titanium white, Thalo green, Prussian blue, Van Dyke brown, Alizarin crimson, Sap green, Cad yellow, and Permanent red. There is no right or wrong - as long as it makes you happy and doesn't hurt anyone. It takes dark in order to show light. Just make a decision and let it go. This is probably the greatest thing to happen in my life - to be able to share this with you. Maybe there's a happy little bush that lives right there. We spend so much of our life looking - but never seeing. Let your imagination just wonder around when you're doing these things. There's not a thing in the world wrong with washing your brush. Let's get wild today. Let's give him a friend too. Everybody needs a friend. Even the worst thing we can do here is good.
              </Typography>
              <br />
              <Typography sx={{fontWeight: 'bold', fontSize:'16px'}} className='pinkColor'>Address:</Typography>
              <Typography>
                Prashant Nagar Amravati, 444606
              </Typography>
            </Grid>
            <Grid item sm={12} lg={12}>
              <BookingTable />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default LaundryDetails;
