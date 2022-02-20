import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderBackdrop = (props) => {
  return (
    <Backdrop
        //sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        sx={{color: '#fff'}}
        open={props.open}
        //onClick={handleClose}
      >
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default LoaderBackdrop