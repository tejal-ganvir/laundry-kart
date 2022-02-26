import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import OrderTable from "../../../components/Rider/OrderTable";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { postJSON } from "../../../services/axiosConfig/api";

const PickupDetails = () => {
  const [data, setData] = useState([]);
  const { orderId } = useParams();

  const [code, setCode] = useState();
  const navigate = useNavigate();
  let otpcode = parseInt(code);

  useEffect(() => {
    const response = postJSON("/functions/getVendorOrderById", {
      orderId: orderId,
    });
    response.then((data) => setData(data.result));
  });

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const pickupotpHandler = () => {
    const otp = postJSON("functions/pickupOTPVerification", {
      orderId: orderId,
      riderId: data.riderId,
      pickupCode: otpcode,
    });
    otp
      .then((res) => navigate("/rider/orders"))
      .catch((err) => console.log(err));
  };

  const deliveryotpHandler = () => {
    const otp = postJSON("functions/deliveryOTPVerification", {
      orderId: orderId,
      riderId: data.riderId,
      deliveryCode: otpcode,
    });
    otp
      .then((res) => navigate("/rider/orders"))
      .catch((err) => console.log(err));
  };

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

        <Stack spacing={2}>
          {data.orderStatus == 1 && (
            <TextField
              fullWidth
              id='OTP'
              label='Enter OTP'
              variant='outlined'
              value={code}
              type='number'
              onChange={handleChange}
            />
          )}
          {data.orderStatus == 4 && (
            <TextField
              fullWidth
              id='OTP'
              label='Enter OTP'
              variant='outlined'
              value={code}
              type='number'
              onChange={handleChange}
            />
          )}
        </Stack>
        <Stack
          direction='row'
          justifyContent='flex-end'
          alignItems='flex-start'
          spacing={2}>
          {data.orderStatus == 1 && (
            <Button variant='contained' onClick={pickupotpHandler}>
              Verify
            </Button>
          )}
          {data.orderStatus == 4 && (
            <Button variant='contained' onClick={deliveryotpHandler}>
              Verify
            </Button>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default PickupDetails;
