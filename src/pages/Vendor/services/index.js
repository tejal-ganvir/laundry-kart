import ServiceTable from "../../../components/Vendor/ServiceTable";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ServiceStart } from "../../../store/actions/vendorServiceActions";

const VendorServices = (vendordetails) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const laundryId = vendordetails.vendordetails.currentUser.objectId;
  const value = useSelector((state) => state.vendorServices.serviceDetails);

  console.log(value);
  useEffect(() => {
    console.log("effect");
    dispatch(ServiceStart({ laundryId: laundryId }));
  }, []);

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
            onClick={() => navigate("/vendor/create/services")}
            sx={{ borderRadius: 4 }}>
            Add Service
          </Button>
        </Stack>
        <ServiceTable />
      </Container>
    </>
  );
};

const laundrydetails = createStructuredSelector({
  vendordetails: selectCurrentUser,
});

export default connect(laundrydetails)(VendorServices);
