import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import OrderTable from "../../../components/Rider/OrderTable";

const PickupDetails = () => {
  return (
    <>
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          spacing={0}>
          <AppBreadcrumb secondtext='Order Pickup' />
        </Stack>
        
      </Container>
    </>
  );
};

export default PickupDetails;