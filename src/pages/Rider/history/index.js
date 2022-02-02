import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import HistoryTable from "../../../components/Rider/HistoryTable";

const RiderHistoryDetails = () => {
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
        <HistoryTable />
      </Container>
    </>
  );
};

export default RiderHistoryDetails;
