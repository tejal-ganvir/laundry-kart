import { Box, Button, Input, Stack, TextField } from "@mui/material";
import MapboxModal from "../../../components/Mapbox/MapboxModal";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import LocationAutocomplete from "../../../components/SearchAutocomplete/LocationAutocomplete";
import axios from "axios";
import { postJSON } from "../../../services/axiosConfig/api";
import { APPLICATION_ID, REST_API_KEY } from "../../../constants/constant";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { connect } from "react-redux";

const EditLaundryInfo = (vendordetails) => {
  const [open, setOpen] = useState(false);

  const [bannerImgUrl, setBannerImgUrl] = useState();
  const [bannerImg, setBannerImg] = useState();
  const [bannerLoading, setBannerLoading] = useState(false);

  const [img1, setImg1] = useState();
  const [img1Url, setImg1Url] = useState();
  const [img1Loading, setImg1Loading] = useState(false);

  const [img2, setImg2] = useState();
  const [img2Url, setImg2Url] = useState();
  const [img2Loading, setImg2Loading] = useState(false);

  const [img3, setImg3] = useState();
  const [img3Url, setImg3Url] = useState();
  const [img3Loading, setImg3Loading] = useState(false);
  const laundryId = vendordetails.vendordetails.currentUser.objectId;

  useEffect(() => {
    const response = postJSON(
      `functions/getLaundryById?laundryId=${laundryId}`,
      { laundryId: laundryId },
    );
    response.then((res) => console.log(res.result[0][0].address));
  });

  const onSelectFile = async (e, type) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const name = file.name;

      if (type === "bannerImg") setBannerLoading(true);
      if (type === "img1") setImg1Loading(true);
      if (type === "img2") setImg2Loading(true);
      if (type === "img3") setImg3Loading(true);

      await axios({
        method: "post",
        url: "https://parseapi.back4app.com/files/a.jpeg",
        data: e.target.files[0],
        headers: {
          "X-Parse-Application-Id": APPLICATION_ID,
          "X-Parse-REST-API-Key": REST_API_KEY,
          "Content-Type": "image/jpeg",
        },
      }).then((response) => {
        console.log(response.data);
        let newProfileImg = {
          name: response.data.name,
          url: response.data.url,
          __type: "File",
        };
        if (type === "bannerImg") {
          setBannerImgUrl(response.data.url);
          setBannerImg(newProfileImg);
          setBannerLoading(false);
        }
        if (type === "img1") {
          setImg1Url(response.data.url);
          setImg1(newProfileImg);
          setImg1Loading(false);
        }
        if (type === "img2") {
          setImg2Url(response.data.url);
          setImg2(newProfileImg);
          setImg2Loading(false);
        }
        if (type === "img3") {
          setImg3Url(response.data.url);
          setImg3(newProfileImg);
          setImg3Loading(false);
        }
      });
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [address, setAddress] = useState();

  const validationSchema = yup.object({
    name: yup.string("Enter your name").required("name is required"),
    about: yup.string("enter your about").required("About is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      about: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!bannerImg) {
        toast("Please select banner image.");
        return;
      }

      if (!img1) {
        toast("Please select img1 image");
        return;
      }
      if (!img2) {
        toast("Please select img2 image");
        return;
      }
      if (!img3) {
        toast("Please select img3 image");
        return;
      }

      if (!address) {
        toast("Please add address");
        return;
      }

      let long = address.center[0];
      let lat = address.center[1];
      let data = {
        ...values,
        long: long,
        lat: lat,
        bannerImg: bannerImg,
        galleryImg1: img1,
        galleryImg2: img2,
        galleryImg3: img3,
        address: address.place_name,
        laundryId: laundryId,
      };
      console.log(data);
      const response = postJSON("/functions/setLaundryInfo", data);
      response.then((res) => console.log(res)).catch((err) => console.log(err));
    },
  });
  return (
    <>
      <Box
        component='div'
        className='whiteBg'
        sx={{ boxShadow: 2, p: 2, mx: 3, position: "relative", minWidth: 120 }}>
        <Stack
          direction='row'
          justifyContent='space-around'
          alignItems='flex-start'
          spacing={1}
          sx={{ px: 5, mb: 3 }}>
          <Stack>
            <LoadingButton
              loading={bannerLoading}
              variant='outlined'
              component='label'
              sx={{ mb: 3 }}>
              Set Banner image
              <input
                type='file'
                onChange={(e) => onSelectFile(e, "bannerImg")}
                accept='image/x-png,image/jpeg,image/jpg,image/png'
                hidden
              />
            </LoadingButton>
            {bannerImgUrl && (
              <img src={bannerImgUrl} height={100} width={100} />
            )}
          </Stack>

          <Stack>
            <LoadingButton
              variant='outlined'
              loading={img1Loading}
              component='label'
              sx={{ mb: 3 }}>
              Set image 1
              <input
                type='file'
                onChange={(e) => onSelectFile(e, "img1")}
                accept='image/x-png,image/jpeg,image/jpg,image/png'
                hidden
              />
            </LoadingButton>
            {img1Url && <img src={img1Url} height={100} width={100} />}
          </Stack>
          <Stack>
            <LoadingButton
              variant='outlined'
              loading={img2Loading}
              component='label'
              sx={{ mb: 3 }}>
              Set image 2
              <input
                type='file'
                onChange={(e) => onSelectFile(e, "img2")}
                accept='image/x-png,image/jpeg,image/jpg,image/png'
                hidden
              />
            </LoadingButton>
            {img2Url && <img src={img2Url} height={100} width={100} />}
          </Stack>
          <Stack>
            <LoadingButton
              variant='outlined'
              loading={img3Loading}
              component='label'
              sx={{ mb: 3 }}>
              Set image 3
              <input
                type='file'
                onChange={(e) => onSelectFile(e, "img3")}
                accept='image/x-png,image/jpeg,image/jpg,image/png'
                hidden
              />
            </LoadingButton>
            {img3Url && <img src={img3Url} height={100} width={100} />}
          </Stack>
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

const laundrydetails = createStructuredSelector({
  vendordetails: selectCurrentUser,
});

export default connect(laundrydetails)(EditLaundryInfo);
