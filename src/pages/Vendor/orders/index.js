import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import OrderTable from "../../../components/Vendor/OrdersTable";

const OrderDetails = () => {

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
        <OrderTable />
      </Container>
    </>
  );
};

export default OrderDetails;
