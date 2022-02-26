import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import OrderTable from "../../../components/Rider/OrderTable";
import { useState } from "react";
import { useEffect } from "react";
import { postJSON } from "../../../services/axiosConfig/api";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { connect } from "react-redux";

const RiderOrderDetails = (riderDetails) => {
  const [order, setOrder] = useState([]);
  const riderId = riderDetails.riderDetails.currentUser.objectId;

  useEffect(() => {
    const response = postJSON("functions/getRidersOrders", {
      riderId: riderId,
    });
    response.then((order) => setOrder(order.result));
  }, []);

  const orderlist = order;
  console.log(orderlist);
  return (
    <>
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          spacing={0}>
          <AppBreadcrumb secondtext='Orders' />
        </Stack>
        <OrderTable data={orderlist} />
      </Container>
    </>
  );
};
const riderDetails = createStructuredSelector({
  riderDetails: selectCurrentUser,
});
export default connect(riderDetails)(RiderOrderDetails);
