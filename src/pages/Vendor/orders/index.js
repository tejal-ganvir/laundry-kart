import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import OrderTable from "../../../components/Vendor/OrdersTable";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { connect } from "react-redux";
import { postJSON } from "../../../services/axiosConfig/api";
import { useEffect } from "react";
import { useState } from "react";

const OrderDetails = (vendordetails) => {
  const laundryId = vendordetails.vendordetails.currentUser.objectId;
  const [data, setData] = useState([]);

  useEffect(() => {
    const response = postJSON(
      "/functions/getVendorOrderList",
      {
        laundryId: laundryId,
      },
      [],
    );
    response.then((data) => setData(data.result));
  }, []);

  const OrderList = data;
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
        <OrderTable data={OrderList} />
      </Container>
    </>
  );
};
const laundrydetails = createStructuredSelector({
  vendordetails: selectCurrentUser,
});
export default connect(laundrydetails)(OrderDetails);
