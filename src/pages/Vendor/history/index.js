import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import HistoryTable from "../../../components/Vendor/HistoryTable";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { connect } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { postJSON } from "../../../services/axiosConfig/api";

const HistoryDetails = (vendordetails) => {
  const laundryId = vendordetails.vendordetails.currentUser.objectId;
  const [data, setData] = useState([]);
  // console.log(laundryId);
  useEffect(() => {
    const response = postJSON("/functions/getVendorHistory", {
      laundryId: laundryId,
    });
    response.then((data) => setData(data.result));
  }, []);

  const HistoryList = data;

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
        <HistoryTable list={HistoryList} />
      </Container>
    </>
  );
};

const laundrydetails = createStructuredSelector({
  vendordetails: selectCurrentUser,
});

export default connect(laundrydetails)(HistoryDetails);
