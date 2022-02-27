import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";

import {
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import AssignRider from "../../../components/Vendor/AssignRider";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { postJSON } from "../../../services/axiosConfig/api";
import { useState } from "react";

const AssignOrders = (props) => {
  const { orderId } = useParams();

  const [data, setData] = useState({});
  const [rider, setRider] = useState([]);
  const [assign, setAssign] = React.useState("");

  useEffect(() => {
    const response = postJSON("/functions/getVendorOrderById", {
      orderId: orderId,
    });
    response.then((data) => setData(data.result));
    const riders = postJSON("/functions/getAllRidersDetails", {});
    riders.then((data) => setRider(data.result));
  }, []);

  const navigate = useNavigate();

  const validationSchema = yup.object({});

  console.log(rider);
  const formik = useFormik({
    initialValues: {
      riderId: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = { ...values };
      console.log(data);
    },
  });

  const handleChange = (event) => {
    setAssign(event.target.value);
  };

  const RejectOrder = () => {
    const status = data.orderStatus + 1;
    const result = postJSON("/functions/ChangeOrderStatus", {
      orderId: orderId,
      orderStatus: 6,
    });
    result.then((res) => navigate("/vendor/orders"));
  };

  const StatusChange = () => {
    const status = data.orderStatus + 1;
    const result = postJSON("/functions/ChangeOrderStatus", {
      orderId: orderId,
      orderStatus: status,
    });
    result.then((res) => navigate("/vendor/orders"));
  };
  const AssignRider = () => {
    const status = data.orderStatus + 1;
    const result = postJSON("/functions/AssignRider", {
      orderId: orderId,
      orderStatus: status,
      riderId: assign,
    });
    result.then((res) => navigate("/vendor/orders"));
  };

  const AssignDelivery = () => {
    const status = data.orderStatus + 1;
    const result = postJSON("/functions/DeliveryAssignRider", {
      orderId: orderId,
      orderStatus: status,
      riderId: assign,
    });
    result.then((res) => navigate("/vendor/orders"));
  };

  console.log(data);
  return (
    <div>
      <Container>
        <Box>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ mb: 3 }}>
            Order details Summary
          </Typography>
          <Stack spacing={2}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={2}>
              <Typography variant='h6' gutterBottom component='div'>
                Order id : {data.objectId}
              </Typography>
              <Typography variant='h6' gutterBottom component='div'>
                Price : {data.grandTotal}
              </Typography>
              <Typography variant='h6' gutterBottom component='div'>
                Address : {data.address}
              </Typography>
            </Stack>

            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={2}>
              <Typography variant='h6' gutterBottom component='div'>
                Landmark : {data.landmark}
              </Typography>
              <Typography variant='h6' gutterBottom component='div'>
                {data.orderStatus == 0 && "status : order Placed"}
                {data.orderStatus == 1 && "status : Rider Assigned"}
                {data.orderStatus == 2 && "status : Picked Up"}
                {data.orderStatus == 3 && "status : In laundry"}
                {data.orderStatus == 4 && "status : Out for Delivery"}
                {data.orderStatus == 5 && "status : Delivered"}
                {data.orderStatus == 6 && "status : Rejected"}
              </Typography>
              <Typography variant='h6' gutterBottom component='div'>
                {data.isPaid && "Payment: Paid"}
                {!data.isPaid && "Payment: Pending"}
              </Typography>
            </Stack>
            {data.orderStatus == 0 && (
              <>
                <FormControl fullWidth>
                  <InputLabel id='assign-rider'>Assign Rider</InputLabel>
                  <Select
                    labelId='assign-rider'
                    id='rider-select'
                    value={assign}
                    onChange={handleChange}
                    label='Assign Rider'>
                    {rider.map((rid) => (
                      <MenuItem key={rid.objectId} value={rid.objectId}>
                        {rid.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            {data.orderStatus == 3 && (
              <>
                <FormControl fullWidth>
                  <InputLabel id='assign-rider'>Assign Rider</InputLabel>
                  <Select
                    labelId='assign-rider'
                    id='rider-select'
                    value={assign}
                    onChange={handleChange}
                    label='Assign Rider'>
                    {rider.map((rid) => (
                      <MenuItem key={rid.objectId} value={rid.objectId}>
                        {rid.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            <Stack
              direction='row'
              justifyContent='flex-end'
              alignItems='flex-start'
              spacing={2}>
              {data.orderStatus == 0 && (
                <Button variant='text' onClick={RejectOrder}>
                  Reject Order
                </Button>
              )}
              {data.orderStatus == 0 && (
                <Button variant='contained' onClick={AssignRider}>
                  Accept & Assign
                </Button>
              )}
              {data.orderStatus == 2 && (
                <Button variant='contained' onClick={StatusChange}>
                  In laundry
                </Button>
              )}
              {data.orderStatus == 3 && (
                <Button variant='contained' onClick={AssignDelivery}>
                  Out for delivery
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </div>
  );
};

export default AssignOrders;
