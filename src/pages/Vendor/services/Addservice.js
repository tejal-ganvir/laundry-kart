import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Container, Stack } from "@mui/material";
import AssignService from "../../../components/Vendor/AssignService";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { connect, useDispatch, useSelector } from "react-redux";
import { ServiceCreateStart } from "../../../store/actions/vendorServiceActions";

const AddService = (vendordetails) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    itemName: yup
      .string("Enter the item name")
      .required("Item Name is required"),
    laundryPrice: yup.addMethod(yup.string, 'integer', function () {
      return this.matches(/^\d+$/, 'The field should have digits only')
    }),

    dryCleanPrice: yup
      .string("Enter the dryclean price")
      .required("dry clean price is required"),
    pressPrice: yup
      .string("Enter the Press price")
      .required("press price is required"),
  });

  const laundryId = vendordetails.vendordetails.currentUser.objectId;

  const formik = useFormik({
    initialValues: {
      itemName: "",
      laundryPrice: "",
      dryCleanPrice: "",
      pressPrice: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = { ...values, laundryId: laundryId };
      dispatch(ServiceCreateStart({ data, navigate }));
    },
  });

  return (
    <div>
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
            Add a new Service
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id='service-name'
              label='Item Name'
              variant='outlined'
              value={formik.values.itemName}
              onChange={formik.handleChange("itemName")}
              error={formik.touched.itemName && Boolean(formik.errors.itemName)}
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
              helperText={formik.touched.pressPrice && formik.errors.pressPrice}
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
    </div>
  );
};
const laundrydetails = createStructuredSelector({
  vendordetails: selectCurrentUser,
});
export default connect(laundrydetails)(AddService);
