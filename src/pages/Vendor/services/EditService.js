import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Container, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { connect, useDispatch, useSelector } from "react-redux";
import { ServiceCreateStart } from "../../../store/actions/vendorServiceActions";
import { useEffect } from "react";
import { postJSON } from "../../../services/axiosConfig/api";
import { useState } from "react";

const EditService = (vendordetails) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSaved = useSelector((state) => state.vendorServices.isSaved);
  const [service, setService] = useState({});
  const { serviceId } = useParams();

  const [itemName, setItemName] = useState("");
  const [pressPrice, setPressPrice] = useState("");
  const [dryCleanPrice, setDryCleanPrice] = useState("");
  const [laundryPrice, setLaundryPrice] = useState("");

  useEffect(() => {
    const response = postJSON("/functions/getServicesById", {
      serviceId: serviceId,
    });
    response.then((data) => setService(data.result));
  }, []);

  const data = service;

  const laundryId = vendordetails.vendordetails.currentUser.objectId;

  const itemnameHandler = (event) => {
    setItemName(event.target.value);
  };
  const pressPriceHandler = (event) => {
    setPressPrice(event.target.value);
  };
  const dryCleanPriceHandler = (event) => {
    setDryCleanPrice(event.target.value);
  };
  const laundryPriceHandler = (event) => {
    setLaundryPrice(event.target.value);
  };

  console.log(data.itemName);

  return (
    <div>
      {!isSaved && (
        <Container maxWidth='xl'>
          <Box>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              sx={{ mb: 3 }}>
              Edit Service
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                id='service-name'
                variant='outlined'
                value={data.itemName}
                helperText={"Enter Item Name"}
                onChange={itemnameHandler}
              />

              <TextField
                fullWidth
                id='price'
                variant='outlined'
                value={pressPrice}
                onChange={pressPriceHandler}
                helperText={"Enter Press Price"}
              />
              <TextField
                fullWidth
                id='price'
                variant='outlined'
                value={dryCleanPrice}
                onChange={dryCleanPriceHandler}
                helperText={"Enter Dry Clean Price"}
              />

              <TextField
                fullWidth
                id='price'
                variant='outlined'
                value={laundryPrice}
                onChange={laundryPriceHandler}
                helperText={"Enter Laundry Price"}
              />

              <Stack
                direction='row'
                justifyContent='flex-end'
                alignItems='flex-start'
                spacing={2}>
                <Button
                  variant='text'
                  onClick={() => navigate("/vendor/services")}>
                  Cancel
                </Button>
                <Button variant='contained'>Save</Button>
              </Stack>
            </Stack>
          </Box>
        </Container>
      )}
      {isSaved && navigate("/vendor/services")}
    </div>
  );
};
const laundrydetails = createStructuredSelector({
  vendordetails: selectCurrentUser,
});
export default connect(laundrydetails)(EditService);
