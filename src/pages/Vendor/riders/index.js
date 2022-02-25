import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RiderTable from "../../../components/Vendor/RiderTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiderStart } from "../../../store/actions/vendorRidersActions";
import { postJSON } from "../../../services/axiosConfig/api";

const RiderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  useEffect(() => {
    const response = postJSON("functions/getAllRidersDetails", {});
    response.then((data) => setData(data.result));
    // dispatch(RiderStart());
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

export default RiderDetails;
