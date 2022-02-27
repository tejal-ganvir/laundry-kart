import { Box, Button, Input, Stack, TextField } from "@mui/material";
import MapboxModal from "../../../components/Mapbox/MapboxModal";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState, useEffect } from "react";
import LocationAutocomplete from "../../../components/SearchAutocomplete/LocationAutocomplete";
import axios from "axios";
import { postJSON } from "../../../services/axiosConfig/api";
import { APPLICATION_ID, REST_API_KEY } from "../../../constants/constant";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import { connect, useDispatch } from "react-redux";
import { setLaundryInfoSuccess } from "../../../store/actions/laundryActions";
import { useNavigate } from "react-router-dom";

const LaundryInfo = ({ currentUser, vendorLaundry }) => {
  const [open, setOpen] = useState(false);
  const laundryId = currentUser.objectId;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const response = postJSON("functions/getLaundryById", {
      laundryId: laundryId,
    });
    response.then((data) => {
      dispatch(setLaundryInfoSuccess(data.result[0][0]));
    });
  }, [laundryId]);

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
  console.log(vendorLaundry);
  const vendorBanner =
    vendorLaundry && vendorLaundry.bannerImg && vendorLaundry.bannerImg
      ? vendorLaundry.bannerImg.url
      : "";
  const vendorImg1 =
    vendorLaundry && vendorLaundry.galleryImg1 && vendorLaundry.galleryImg1
      ? vendorLaundry.galleryImg1.url
      : "";
  const vendorImg2 =
    vendorLaundry && vendorLaundry.galleryImg2 && vendorLaundry.galleryImg2
      ? vendorLaundry.galleryImg2.url
      : "";
  const vendorImg3 =
    vendorLaundry && vendorLaundry.galleryImg3 && vendorLaundry.galleryImg3
      ? vendorLaundry.galleryImg3.url
      : "";
  const vendorAddress =
    vendorLaundry && vendorLaundry.address ? vendorLaundry.address : "";
  const vendorLat =
    vendorLaundry && vendorLaundry.long ? vendorLaundry.long : "";
  const vendorLong =
    vendorLaundry && vendorLaundry.lat ? vendorLaundry.lat : "";
  const laundryObjectId =
    vendorLaundry && vendorLaundry.objectId ? vendorLaundry.objectId : "";
  const validationSchema = yup.object({
    name: yup.string("Enter your name").required("name is required"),
    about: yup.string("enter your about").required("About is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: vendorLaundry && vendorLaundry.name ? vendorLaundry.name : "",
      about: vendorLaundry && vendorLaundry.about ? vendorLaundry.about : "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!bannerImg && !vendorBanner) {
        toast("Please select banner image.");
        return;
      }

      if (!img1 && !vendorImg1) {
        toast("Please select img1 image");
        return;
      }
      if (!img2 && !vendorImg2) {
        toast("Please select img2 image");
        return;
      }
      if (!img3 && !vendorImg3) {
        toast("Please select img3 image");
        return;
      }

      if (!address && !vendorAddress) {
        toast("Please add address");
        return;
      }
      let laundrylong;
      let laundrylat;

      if (address && address.center[0]) {
        laundrylong = address.center[0];
      } else {
        laundrylong = vendorLong;
      }
      if (address && address.center[1]) {
        laundrylat = address.center[1];
      } else {
        laundrylat = vendorLat;
      }
      let laundryBanner;
      if (bannerImg) {
        laundryBanner = bannerImg;
      } else {
        laundryBanner = vendorLaundry.bannerImg;
      }
      let laundryimg1;
      if (img1) {
        laundryimg1 = img1;
      } else {
        laundryimg1 = vendorLaundry.galleryImg1;
      }
      let laundryimg2;
      if (img2) {
        laundryimg2 = img2;
      } else {
        laundryimg2 = vendorLaundry.galleryImg2;
      }
      let laundryimg3;
      if (img3) {
        laundryimg3 = img3;
      } else {
        laundryimg3 = vendorLaundry.galleryImg3;
      }

      let laundryAddress;
      if (address && address.place_name) {
        laundryAddress = address.place_name;
      } else {
        laundryAddress = vendorAddress;
      }

      let data = {
        ...values,
        long: laundrylong,
        lat: laundrylat,
        bannerImg: laundryBanner,
        galleryImg1: laundryimg1,
        galleryImg2: laundryimg2,
        galleryImg3: laundryimg3,
        address: laundryAddress,
        laundryId: laundryId,
      };
      if (laundryObjectId) {
        const response = postJSON("/functions/UpdateLaundryInfo", data);
        response
          .then((res) => toast("Profile Updated Successfully"))
          .catch((err) => toast("failed in profile update"));
      } else {
        const response = postJSON("/functions/setLaundryInfo", data);
        response
          .then((res) => toast("Profile added successfully"))
          .catch((err) => toast("Error in profile creation"));
      }
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
            {(bannerImgUrl || vendorBanner) && (
              <img
                src={bannerImgUrl || vendorBanner}
                height={100}
                width={100}
              />
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
            {(img1Url || vendorImg1) && (
              <img src={img1Url || vendorImg1} height={100} width={100} />
            )}
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
            {(img2Url || vendorImg2) && (
              <img src={img2Url || vendorImg2} height={100} width={100} />
            )}
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
            {(img3Url || vendorImg3) && (
              <img src={img3Url || vendorImg3} height={100} width={100} />
            )}
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
          <LocationAutocomplete
            value={vendorAddress}
            addressFunc={{ address, setAddress }}
          />
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

const mapStateToProps = (state) => {
  const { vendorLaundry } = state.Laundry;
  const { currentUser } = state.login;
  return { currentUser, vendorLaundry };
};

export default connect(mapStateToProps, null)(LaundryInfo);
