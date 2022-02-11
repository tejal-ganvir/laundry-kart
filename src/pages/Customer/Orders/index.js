import { Box } from '@mui/material';
import React from 'react';
import OrdersCard from '../../../components/OrdersCard/OrdersCard';

const Orders = () => {
  return (
      <Box mx={2} sx={{minHeight: 400}}>
        <OrdersCard />
      </Box>
  );
};

export default Orders;
