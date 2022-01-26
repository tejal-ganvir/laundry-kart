import { Box } from '@mui/material';
import React from 'react';
import TopNavbar from '../components/Nav/TopNavbar';
import Footer from "../components/Sections/Footer"

const Layout = ({children}) => {
  return (
    <>
        <TopNavbar />
          <Box component="div" mt={12}>
            {children}
          </Box>
        <Footer />
    </>
  );
};

export default Layout;
