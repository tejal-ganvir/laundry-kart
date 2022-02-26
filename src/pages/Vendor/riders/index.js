import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RiderTable from "../../../components/Vendor/RiderTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { RiderStart } from "../../../store/actions/vendorRidersActions";
import { postJSON } from "../../../services/axiosConfig/api";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";

const RiderDetails = (vendordetails) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const laundryId = vendordetails.vendordetails.currentUser.objectId;

  const [data, setData] = useState([]);
  useEffect(() => {
    const response = postJSON("functions/getAllRidersDetails", {
      laundryId: laundryId,
    });
    response.then((data) => setData(data.result));
  }, []);

  const riderlist = data;
  return (
    <>
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          spacing={0}>
          <AppBreadcrumb secondtext='Riders' />
          <Button
            variant='outlined'
            color='primary'
            margin='normal'
            onClick={() => navigate("/vendor/create/riders")}>
            Add Rider
          </Button>
        </Stack>
        <RiderTable data={riderlist} />
      </Container>
    </>
  );
};
const laundrydetails = createStructuredSelector({
  vendordetails: selectCurrentUser,
});
export default connect(laundrydetails)(RiderDetails);
