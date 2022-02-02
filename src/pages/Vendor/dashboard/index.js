import { Container } from "@mui/material";
import React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";


const VendorDashboard = () => {
  return (
    <>
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          spacing={0}>
          <AppBreadcrumb />
        </Stack>
      </Container>
    </>
  );
};

export default VendorDashboard;
