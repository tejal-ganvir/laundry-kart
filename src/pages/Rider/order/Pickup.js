import Container from "@mui/material/Container";
import * as React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import OrderTable from "../../../components/Rider/OrderTable";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { postJSON } from "../../../services/axiosConfig/api";
import { toast } from "react-toastify";

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
      .catch((err) => toast("OTP entered is invalid"));
  };

  const deliveryotpHandler = () => {
    const otp = postJSON("functions/deliveryOTPVerification", {
      orderId: orderId,
      riderId: data.riderId,
      deliveryCode: otpcode,
    });
    otp
      .then((res) => navigate("/rider/orders"))
      .catch((err) => toast("OTP entered is invalid"));
  };

  return (
    <>
      <Container maxWidth='xl'>
        <Box
          component='div'
          className='whiteBg'
          sx={{
            boxShadow: 2,
            p: 2,
            mx: 3,
            position: "relative",
            minHeight: 320,
          }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
            spacing={0}>
            <AppBreadcrumb secondtext='Order Pickup' />
          </Stack>
          <Container maxWidth='sm'>
            <table className='cust_card_table cust_assign_table'>
              <tbody>
                <tr>
                  <td>Order id</td>
                  <td className='pinkColor'>#{data.objectId}</td>
                </tr>
                <tr>
                  <td>User Name</td>
                  <td>{data.userName}</td>
                </tr>
                <tr>
                  <td>Mobile No</td>
                  <td>{data.userMobile}</td>
                </tr>

                <tr>
                  <td>Price</td>
                  <td>₹ {data.grandTotal}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{data.address}</td>
                </tr>
                <tr>
                  <td>Landmark</td>
                  <td>{data.landmark}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    {data.orderStatus == 0 && "Order Placed"}
                    {data.orderStatus == 1 && "Rider Assigned"}
                    {data.orderStatus == 2 && "Picked Up"}
                    {data.orderStatus == 3 && "In laundry"}
                    {data.orderStatus == 4 && "Out for Delivery"}
                    {data.orderStatus == 5 && "Delivered"}
                    {data.orderStatus == 6 && "Rejected"}
                  </td>
                </tr>
                <tr>
                  <td>Payment</td>
                  <td>
                    {data.isPaid && "Paid"}
                    {!data.isPaid && "Pending"}
                  </td>
                </tr>
              </tbody>
            </table>
          </Container>
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
              <Button
                variant='contained'
                sx={{ mt: 2 }}
                onClick={pickupotpHandler}>
                Verify
              </Button>
            )}
            {data.orderStatus == 4 && (
              <Button
                variant='contained'
                sx={{ mt: 2 }}
                onClick={deliveryotpHandler}>
                Verify
              </Button>
            )}
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default PickupDetails;
