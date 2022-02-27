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
import LoaderBackdrop from "../../../components/LoaderBackdrop/LoaderBackdrop";
import { connect } from "react-redux";

const AssignOrders = (props) => {
  const { orderId } = useParams();
  const { currentUser } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [rider, setRider] = useState([]);
  const [assign, setAssign] = React.useState("");

  useEffect(() => {
    setLoading(true);
    const response = postJSON("/functions/getVendorOrderById", {
      orderId: orderId,
    });
    response.then((data) => {
      console.log(data.result);
      setData(data.result);
      const riders = postJSON("/functions/getAllRidersDetails", {
        laundryId: currentUser.objectId,
      });
      riders.then((data) => setRider(data.result));
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const validationSchema = yup.object({});

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

  return (
    <div>
      <Container>
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
          {loading ? (
            <LoaderBackdrop open={loading} />
          ) : (
            <>
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
              <Stack spacing={2} mt={2}>
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
                  justifyContent='center'
                  alignItems='center'
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
                  {data.orderStatus == 5 && (
                    <Button
                      align='center'
                      variant='contained'
                      color='success'
                      sx={{ borderRadius: 4, px: 3 }}>
                      Order Delivered
                    </Button>
                  )}
                </Stack>
              </Stack>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { currentUser } = state.login;
  return { currentUser };
};

export default connect(mapStateToProps, null)(AssignOrders);
