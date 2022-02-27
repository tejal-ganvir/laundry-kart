import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TopNavbar from './TopNavbar';
import Footer from "./Footer"
import Sidebar from './Sidebar';
import LocationSetter from './LocationSetter';
import { useLocation, useNavigate } from 'react-router-dom';
import { setOpenSidebar } from '../store/actions/layoutActions';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

const Layout = ({children, openSidebar, isAuthLayout, role}) => {

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let locationArray = location.pathname.split("/");

    if (
      //locationArray[1] === "account" ||
      locationArray[1] === "vendor" ||
      locationArray[1] === "rider"
    )
      dispatch(setOpenSidebar(true));
    else dispatch(setOpenSidebar(false));

    if(role){
      if((role === 'user') && (locationArray[1] === "vendor" || locationArray[1] === "rider")){
        navigate("/login")
      }
      if((role === 'laundry') && (locationArray[1] === "account" || locationArray[1] === "rider")){
        navigate("/login")
      }
      if((role === 'rider') && (locationArray[1] === "account" || locationArray[1] === "vendor")){
        navigate("/login")
      }
    }

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
            {!isAuthLayout && (role === 'user') && <LocationSetter />}
            <Grid container direction="row" sx={{mt: role && (role !== 'user') ? 3 : 1}}>
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
