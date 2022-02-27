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
import { toast } from "react-toastify";

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

  //console.log(data.itemName);

  const validationSchema = yup.object({
    itemName: yup
      .string("Enter the item name")
      .required("Item Name is required"),
    laundryPrice: yup
      .string("Enter the laundryPrice")
      .required("Laundry Price is required"),
    dryCleanPrice: yup
      .string("Enter the dryclean price")
      .required("dry clean price is required"),
    pressPrice: yup
      .string("Enter the Press price")
      .required("press price is required"),
  });

  const formik = useFormik({
    initialValues: {
      itemName: service && service.itemName ? service.itemName : "",
      laundryPrice: service && service.laundryPrice ? service.laundryPrice : "",
      dryCleanPrice:
        service && service.dryCleanPrice ? service.dryCleanPrice : "",
      pressPrice: service && service.pressPrice ? service.pressPrice : "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let data = { ...values, serviceId: serviceId };
      var response = postJSON("/functions/setServicesDetails", data);
      response
        .then((res) => toast("Service Updated Successfully"))
        .catch((err) => toast("Error in the service update"));
    },
  });

  return (
    <div>
      {!isSaved && (
        <Container maxWidth='xl'>
          <Box
            component='div'
            className='whiteBg'
            sx={{
              boxShadow: 2,
              p: 2,
              mx: 3,
              position: "relative",
              minWidth: 120,
            }}>
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
                label='Item Name'
                variant='outlined'
                value={formik.values.itemName}
                onChange={formik.handleChange("itemName")}
                error={
                  formik.touched.itemName && Boolean(formik.errors.itemName)
                }
                helperText={formik.touched.itemName && formik.errors.itemName}
              />

              <TextField
                fullWidth
                id='price'
                label='Press Price'
                variant='outlined'
                value={formik.values.pressPrice}
                onChange={formik.handleChange("pressPrice")}
                error={
                  formik.touched.pressPrice && Boolean(formik.errors.pressPrice)
                }
                helperText={
                  formik.touched.pressPrice && formik.errors.pressPrice
                }
              />
              <TextField
                fullWidth
                id='price'
                label='dryclean Price'
                variant='outlined'
                value={formik.values.dryCleanPrice}
                onChange={formik.handleChange("dryCleanPrice")}
                error={
                  formik.touched.dryCleanPrice &&
                  Boolean(formik.errors.dryCleanPrice)
                }
                helperText={
                  formik.touched.dryCleanPrice && formik.errors.dryCleanPrice
                }
              />

              <TextField
                fullWidth
                id='price'
                label='laundry Price'
                variant='outlined'
                value={formik.values.laundryPrice}
                onChange={formik.handleChange("laundryPrice")}
                error={
                  formik.touched.laundryPrice &&
                  Boolean(formik.errors.laundryPrice)
                }
                helperText={
                  formik.touched.laundryPrice && formik.errors.laundryPrice
                }
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
                <Button variant='contained' onClick={formik.handleSubmit}>
                  Save
                </Button>
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
