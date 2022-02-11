import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TopNavbar from './TopNavbar';
import Footer from "./Footer"
import Sidebar from './Sidebar';
import LocationSetter from './LocationSetter';
import { useLocation } from 'react-router-dom';
import { setOpenSidebar } from '../store/actions/layoutActions';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const Layout = ({children, openSidebar, isAuthLayout}) => {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let locationArray = location.pathname.split("/");

    if (
      //locationArray[1] === "account" ||
      locationArray[1] === "vendor" ||
      locationArray[1] === "rider"
    )
      dispatch(setOpenSidebar(true));
    else dispatch(setOpenSidebar(false));

    return () => dispatch(setOpenSidebar(false));
  }, [location.pathname]);

  return (
    <>
        <TopNavbar />
          <Box 
            className={`${openSidebar ? 'lightBg' : 'whiteBg'} ${isAuthLayout && 'authentication-bg'}` } 
            component="div" 
            pt={10}
          >
            {!isAuthLayout && <LocationSetter />}
            <Grid container direction="row">
              { openSidebar &&
                <Grid item xs={12} md={3} sx={{pl:3}}>
                  <Sidebar />
                </Grid>
              }
              <Grid item xs={12} md={openSidebar ? 9 : 12} >
                {children}
              </Grid>
            </Grid>
          </Box>
      <Footer />
    </>
  );
};

const mapStateToProps = state => {
  const {openSidebar, isAuthLayout} = state.Layout;
  return {openSidebar, isAuthLayout};
};

export default connect(mapStateToProps, null)(Layout);
