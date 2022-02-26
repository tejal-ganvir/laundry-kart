import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Container, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { RiderCreateStart } from "../../../store/actions/vendorRidersActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";

const AddRaider = (laundryDetails) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const laundryId = laundryDetails.laundryDetails.currentUser.objectId;

  const isSaved = useSelector((state) => state.vendorRiders.isSaved);

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    firstName: yup.string("Enter First Name").required("FirstName is required"),
    lastName: yup.string("Enter Last Name").required("Lastname is required"),
    mobile: yup
      .string("Enter your Phone number")
      .required("mobile Number is required"),
    password: yup
      .string("Enter your password")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      password: "",
      role: "rider",
      email: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        username: formik.values.email,
        parentId: laundryId,
      };
      dispatch(RiderCreateStart(data));
    },
  });

  return (
    <div>
      {!isSaved && (
        <Container maxWidth='xl'>
          <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:2, mx:3, position: 'relative', minWidth:120 }}>
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              sx={{ mb: 3 }}>
              Add a new Rider
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                id='first-name'
                label='First Name'
                variant='outlined'
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                fullWidth
                id='last-name'
                label='Last Name'
                variant='outlined'
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />

              <TextField
                fullWidth
                id='mobile'
                label='Phone'
                variant='outlined'
                type='text'
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />

              <TextField
                fullWidth
                id='email'
                label='Email'
                variant='outlined'
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id='password'
                label='Password'
                type='password'
                variant='outlined'
                value={formik.values.password}
                onChange={formik.handleChange("password")}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Stack
                direction='row'
                justifyContent='flex-end'
                alignItems='flex-start'
                spacing={2}>
                <Button variant='text'>Cancel</Button>
                <Button variant='contained' onClick={formik.handleSubmit}>
                  Save
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Container>
      )}
      {isSaved && navigate("/vendor/riders")}
    </div>
  );
};
const laundryDetails = createStructuredSelector({
  laundryDetails: selectCurrentUser,
});
export default connect(laundryDetails)(AddRaider);
