import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OrdersCard from '../../../components/OrdersCard/OrdersCard';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { connect } from "react-redux";
import { postJSON } from '../../../services/axiosConfig/api';
import LoaderBackdrop from '../../../components/LoaderBackdrop/LoaderBackdrop';

const Orders = ({loginstatus}) => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = loginstatus && loginstatus.currentUser ? loginstatus.currentUser.objectId : '';

  useEffect(() => {
    setLoading(true);
    const response = postJSON('functions/getCustomerOrders', {userId})
    response.then((data) => {
      setOrders(data.result);
      setLoading(false);
    })
    
  },[])

  return (
      <Box className='container' sx={{minHeight: 400}}>
        { loading ? <LoaderBackdrop open={loading} /> :
          orders.length > 0 ?
          orders.map((item, idx) => (
            <OrdersCard key={`order-card-${idx}`} {...item} isCompleted={(item.orderStatus === 5)}  />
          ))
          :
          'No Orders Yet'
        }
      </Box>
  );
};

const userdetails = createStructuredSelector({
  loginstatus: selectCurrentUser,
});

export default connect(userdetails)(Orders);
