import ServiceTable from "../../../components/Vendor/ServiceTable";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { connect, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ServiceStart } from "../../../store/actions/vendorServiceActions";
import { postJSON } from "../../../services/axiosConfig/api";
import { useState } from "react";

const VendorServices = (vendordetails) => {

  const laundryId = vendordetails.vendordetails.currentUser.objectId;

  const [data, setData] = useState([]);
  useEffect(() => {
    const response = postJSON("functions/getAllServicesDetails", {
      laundryId: laundryId,
    });
    response.then((data) => setData(data.result));
  }, []);

  const serviceList = data;

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
            component={Link} 
            to={'/vendor/create/services'}
            sx={{ borderRadius: 4 }}>
            Add Service
          </Button>
        </Stack>
        <ServiceTable setData={setData} data={serviceList} />
      </Container>
    </>
  );
};

const laundrydetails = createStructuredSelector({
  vendordetails: selectCurrentUser,
});

export default connect(laundrydetails)(VendorServices);
