import { Box } from '@mui/material';
import React from 'react';
import OrdersCard from '../../../components/OrdersCard/OrdersCard';

const OrdersHistory = () => {
  return (
      <Box mx={2}>
        <OrdersCard isCompleted={true} />
      </Box>
  );
};

export default OrdersHistory;
