import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import HistoryTable from "../../../components/Rider/HistoryTable";
import { useEffect } from "react";
import { postJSON } from "../../../services/axiosConfig/api";
import { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../store/selector/login.selectors";

const RiderHistoryDetails = (riderDetails) => {
  const [data, setData] = useState([]);

  const riderId = riderDetails.riderDetails.currentUser.objectId;
  useEffect(() => {
    const response = postJSON("/functions/getRidersOrdersHistory", {
      riderId: riderId,
    });
    response.then((data) => setData(data.result));
  }, []);
  const orderList = data;
  console.log(data);
  return (
    <>
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          spacing={0}>
          <AppBreadcrumb secondtext='Order History' />
        </Stack>
        <HistoryTable data={orderList} />
      </Container>
    </>
  );
};
const riderDetails = createStructuredSelector({
  riderDetails: selectCurrentUser,
});
export default connect(riderDetails)(RiderHistoryDetails);
