import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';
import LoaderBackdrop from '../../components/LoaderBackdrop/LoaderBackdrop';
import { postJSON } from '../../services/axiosConfig/api';
import BookingTable from './BookingTable';

const LaundryDetails = () => {

  const [details, setDetails] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const laundryId = searchParams.get("laundryId");

  useEffect(() => {
    setLoading(true);
    const response = postJSON(`functions/getLaundryById?laundryId=${laundryId}`, {laundryId: laundryId})
    response.then(data => {
      //console.log(data);
      setDetails(data.result[0][0]);
      setServices(data.result[1]);
      setLoading(false);
    })
  },[laundryId])

  const laundryInfoRef = details && details.objectId ? details.objectId : '';

  return (
    <React.Fragment>
      <Container maxWidth="xl" sx={{minHeight: 400}}>
        { loading ? <LoaderBackdrop open={loading} /> : 
          details.name ?
          <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:4, mb: 4}}>
            <Grid container direction="row" spacing={2}>
              <Grid item sm={12} lg={6}>
                <Carousel 
                  height={400}
                  images={[
                    {
                      label: details.bannerImg && details.bannerImg.name,
                      imgPath: details.bannerImg && details.bannerImg.url,
                    },
                    {
                      label: details.galleryImg1 && details.galleryImg1.name,
                      imgPath: details.galleryImg1 && details.galleryImg1.url,
                    },
                    {
                      label: details.galleryImg2 && details.galleryImg2.name,
                      imgPath: details.galleryImg2 && details.galleryImg2.url,
                    },
                    {
                      label: details.bannerImg3 && details.bannerImg3.name,
                      imgPath: details.bannerImg3 && details.bannerImg3.url,
                    },
                  ]}
                />
              </Grid>
              <Grid item sm={12} lg={6}>
                <Typography variant='h4' mb={2} className='text-center semiBold'>{details.name}</Typography>
                <Typography sx={{fontWeight: 'bold', fontSize:'16px'}} className='pinkColor'>About:</Typography>
                <Typography>
                  {details.about}
                </Typography>
                <br />
                <Typography sx={{fontWeight: 'bold', fontSize:'16px'}} className='pinkColor'>Address:</Typography>
                <Typography>
                  {details.address}
                </Typography>
              </Grid>
              <Grid item sm={12} lg={12}>
                {services.length > 0 ? <BookingTable laundryRef={laundryInfoRef} laundryId={laundryId} services={services} /> : 'Services are yet to be uploaded' }
              </Grid>
            </Grid>
          </Box>
          :
          'No details found'
        }
      </Container>
    </React.Fragment>
  );
};

export default LaundryDetails;
