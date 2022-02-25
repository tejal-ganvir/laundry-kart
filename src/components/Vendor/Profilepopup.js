import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/system";
import MapboxModal from "../../components/Mapbox/MapboxModal";
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { AddProfileStart } from "../../store/actions/vendorProfileActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const FullScreenDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const dispatch = useDispatch();

  const validationSchema = yup.object({
    name: yup.string("Enter your name").required("name is required"),
    about: yup.string("enter your about").required("About is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      about: "",
      lat: "",
      long: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(AddProfileStart(values));
    },
  });

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Add Profile
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ minWidth: 120 }}>
          <Stack
            direction='row'
            justifyContent='space-around'
            alignItems='flex-start'
            spacing={1}
            sx={{ px: 5, mb: 3 }}>
            <Input
              accept='image/*'
              id='contained-button-file'
              multiple
              type='file'
            />
            <Input
              accept='image/*'
              id='contained-button-file'
              multiple
              type='file'
            />
            <Input
              accept='image/*'
              id='contained-button-file'
              multiple
              type='file'
            />
            <Input
              accept='image/*'
              id='contained-button-file'
              multiple
              type='file'
            />
          </Stack>
          <Stack
            direction='row'
            justifyContent='space-around'
            alignItems='flex-start'
            sx={{ px: 5 }}
            spacing={1}>
            <TextField
              fullWidth
              id='name'
              label='Name'
              value={formik.values.name}
              onChange={formik.handleChange("name")}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              variant='outlined'
            />
            <TextField
              fullWidth
              id='address'
              label='Address'
              value={address}
              onChange={formik.handleChange("address")}
              variant='outlined'
              name='address'
            />
            <TextField
              fullWidth
              id='about'
              multiline
              rows={4}
              label='About'
              variant='outlined'
              value={formik.values.about}
              onChange={formik.handleChange("about")}
              error={formik.touched.about && Boolean(formik.errors.about)}
              helperText={formik.touched.about && formik.errors.about}
            />
            <input
              type='hidden'
              name='lat'
              value={formik.values.lat}
              onChange={formik.handleChange("lat")}
            />
            <input
              type='hidden'
              name='long'
              value={formik.values.long}
              onChange={formik.handleChange("long")}
            />
          </Stack>
          <Stack
            sx={{ mb: 6 }}
            direction='row'
            justifyContent='center'
            alignItems='flex-start'
            spacing={2}>
            <Button variant='outlined' onClick={() => setDialogOpen(true)}>
              fetch from map
            </Button>
            <Button variant='outlined' onClick={formik.handleSubmit}>
              Save
            </Button>
          </Stack>
          <MapboxModal
            size='sm'
            open={dialogOpen}
            hide={() => setDialogOpen(false)}
            setText={setAddress}
          />
        </Box>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { data } = state.Location;
  return { data };
};

export default connect(mapStateToProps, null)(FullScreenDialog);
