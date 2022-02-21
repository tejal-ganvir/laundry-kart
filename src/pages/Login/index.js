import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { setAuthLayout } from "../../store/actions/layoutActions";
import { useFormik } from "formik";
import * as yup from "yup";
import { createStructuredSelector } from "reselect";
import { LoginStart } from "../../store/actions/loginActions";
import { selectCurrentUser } from "../../store/selector/login.selectors";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = ({ loginstatus }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuthLayout(true));

    return () => dispatch(setAuthLayout(false));
  }, []);

  useEffect(() => {

    let lastUrl = localStorage.getItem('lastUrl');
    
    if(lastUrl && loginstatus.isLogin){
      navigate(lastUrl);
      localStorage.removeItem('lastUrl');
      return;
    }
    
    switch (loginstatus.role) {
      case "laundry":
        navigate("/vendor/dashboard");
        break;
      case "user":
        navigate("/account/profile");
        break;
      case "rider":
        navigate("/rider/dashboard");
        break;
      default:
        break;
    }
  },[loginstatus]);

  const validationSchema = yup.object({
    username: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(LoginStart(values));
    },
  });

  return (
    <React.Fragment>
      {!loginstatus.isLogin && (
        <Container maxWidth='sm'>
          <Box
            component='div'
            className='whiteBg'
            sx={{ boxShadow: 2, p: 2, m: 4 }}>
            <Typography variant='h6' align='center'>
              Sign In
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Box my={6}>
                <div className='form-control-area'>
                  <TextField
                    id='login-email-input'
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
                    id='login-password-input'
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
                  <Link to='/forgot-password'>
                    <Typography align='right' className='purpleLink'>
                      Forgot password?
                    </Typography>
                  </Link>
                </div>
                <div className='form-control-area text-center'>
                  <LoadingButton
                    loading={loginstatus.isLoading}
                    align='center'
                    variant='contained'
                    sx={{ borderRadius: 4, px: 3 }}
                    type="submit"
                  >
                    Login
                  </LoadingButton>
                </div>
                <div className='form-control-area'>
                  <Typography>
                    Don't have an account?{" "}
                    <Link to='/register' className='purpleLink'>
                      Sign up
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

const userdetails = createStructuredSelector({
  loginstatus: selectCurrentUser,
});

export default connect(userdetails)(Login);
