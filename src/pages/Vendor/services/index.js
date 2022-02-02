import ServiceTable from "../../../components/Vendor/ServiceTable";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import * as React from "react";
import Link from "@mui/material/Link";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ServiceModal from "./Addservice";

const VendorServices = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          spacing={0}>
          <AppBreadcrumb secondtext='Services' />
          <Button
            variant='outlined'
            color='primary'
            margin='normal'
            onClick={handleOpen}>
            Add Service
          </Button>
        </Stack>
        <ServiceTable />
        <ServiceModal open={open} close={handleClose} />
      </Container>
    </>
  );
};

export default VendorServices;
