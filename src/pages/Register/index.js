import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { setAuthLayout } from "../../store/actions/layoutActions";
import { useFormik } from "formik";
import * as yup from "yup";
import { RegisterStart } from "../../store/actions/registerActions";
import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";

const Register = ({isLoading}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthLayout(true));

    return () => dispatch(setAuthLayout(false));
  }, []);

  const isRegister = useSelector((state) => state.register.isRegister);
  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your First Name")
      .required("First Name is required"),
    lastName: yup
      .string("Enter your Last Name")
      .required("Last Name is required"),
    username: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .required("password is required"),
    role: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      role: "user",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let value = { ...values, email: values.username };
      dispatch(RegisterStart(value));
    },
  });

  return (
    <React.Fragment>
      {isRegister && navigate("/login")}
      {!isRegister && (
        <Container maxWidth='sm'>
          <Box
            component='div'
            className='whiteBg'
            sx={{ boxShadow: 2, p: 2, m: 4 }}>
            <Typography variant='h6' align='center'>
              Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box my={6}>
                <div className='form-control-area'>
                  <TextField
                    id='register-firstname-input'
                    label='First Name'
                    type='text'
                    size='small'
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    error={
                      formik.touched.firstName && Boolean(formik.errors.firstName)
                    }
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </div>
                <div className='form-control-area'>
                  <TextField
                    id='register-lastname-input'
                    label='Last Name'
                    type='text'
                    size='small'
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange("lastName")}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </div>
                <div className='form-control-area'>
                  <TextField
                    id='register-email-input'
                    label='Email'
                    type='email'
                    size='small'
                    fullWidth
                    value={formik.values.username}
                    onChange={formik.handleChange("username")}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={formik.touched.username && formik.errors.username}
                  />
                </div>
                <div className='form-control-area'>
                  <TextField
                    id='register-password-input'
                    label='Password'
                    type='password'
                    size='small'
                    autoComplete='current-password'
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </div>

                <div className='form-control-area'>
                  <FormLabel id='demo-row-radio-buttons-group-label'>
                    Role
                  </FormLabel>
                  <RadioGroup
                    row
                    value={formik.values.role}
                    onChange={formik.handleChange("role")}
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'>
                    <FormControlLabel
                      value='user'
                      name='picked'
                      control={<Radio />}
                      label='User'
                    />
                    <FormControlLabel
                      value='laundry'
                      name='picked'
                      control={<Radio />}
                      label='Vendor'
                    />
                  </RadioGroup>
                </div>

                <div className='form-control-area'>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label='I agree to Terms of Services and Privacy Policy'
                  />
                </div>
                <div className='form-control-area text-center'>
                  <LoadingButton
                    loading={isLoading}
                    align='center'
                    variant='contained'
                    sx={{ borderRadius: 4, px: 3 }}
                    type="submit"
                    >
                    Sign Up
                  </LoadingButton>
                </div>
                <div className='form-control-area'>
                  <Typography>
                    Already have an account?{" "}
                    <Link to='/login' className='purpleLink'>
                      Sign in
                    </Link>
                  </Typography>
                </div>
              </Box>
            </form>
          </Box>
        </Container>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  const {isLoading} = state.register;
  return {isLoading};
};

export default connect(mapStateToProps, null)(Register);
