import { Box, Button, Input, Stack, TextField } from "@mui/material";
import MapboxModal from "../../../components/Mapbox/MapboxModal";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import LocationAutocomplete from "../../../components/SearchAutocomplete/LocationAutocomplete";

const LaundryInfo = ({
  profFirstName,
  profLastName,
  profileImg,
  userObjectId,
  hide,
}) => {
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState(profileImg);
  const [imageData, setImageData] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const name = file.name;
      setImageData(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgUrl(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

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
      // dispatch(AddProfileStart(values));
    },
  });
  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <Stack
          direction='row'
          justifyContent='space-around'
          alignItems='flex-start'
          spacing={1}
          sx={{ px: 5, mb: 3 }}>
          <Button variant='outlined' component='label'>
            Set Banner image
            <input
              type='file'
              onChange={(e) => onSelectFile(e)}
              accept='image/x-png,image/jpeg,image/jpg,image/png'
              hidden
            />
          </Button>
          <Button variant='outlined' component='label'>
            Set image 1
            <input
              type='file'
              onChange={(e) => onSelectFile(e)}
              accept='image/x-png,image/jpeg,image/jpg,image/png'
              hidden
            />
          </Button>
          <Button variant='outlined' component='label'>
            Set image 2
            <input
              type='file'
              onChange={(e) => onSelectFile(e)}
              accept='image/x-png,image/jpeg,image/jpg,image/png'
              hidden
            />
          </Button>
          <Button variant='outlined' component='label'>
            Set image 3
            <input
              type='file'
              onChange={(e) => onSelectFile(e)}
              accept='image/x-png,image/jpeg,image/jpg,image/png'
              hidden
            />
          </Button>
        </Stack>

        <div className='form-control-area'>
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
        </div>
        <div className='form-control-area'>
          <LocationAutocomplete addressFunc={{ address, setAddress }} />
        </div>
        <div className='form-control-area'>
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
        </div>
        <Stack
          sx={{ mb: 6 }}
          direction='row'
          justifyContent='center'
          alignItems='flex-start'
          spacing={2}>
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
    </>
  );
};

export default LaundryInfo;
