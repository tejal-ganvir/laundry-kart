import { Box, Button, Input, Stack, TextField } from "@mui/material";
import MapboxModal from "../../../components/Mapbox/MapboxModal";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import LocationAutocomplete from "../../../components/SearchAutocomplete/LocationAutocomplete";
import axios from "axios";
import { APPLICATION_ID, REST_API_KEY } from "../../../constants/constant";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

const LaundryInfo = ({
  profFirstName,
  profLastName,
  profileImg,
  userObjectId,
  hide,
}) => {
  const [open, setOpen] = useState(false);

  const [bannerImgUrl, setBannerImgUrl] = useState();
  const [bannerImg, setBannerImg] = useState();
  const [bannerLoading, setBannerLoading] = useState(false);

  const [img1, setImg1] = useState();
  const [img1Url, setImg1Url] = useState();

  const [img2, setImg2] = useState();
  const [img2Url, setImg2Url] = useState();

  const [img3, setImg3] = useState();
  const [img3Url, setImg3Url] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSelectFile = async (e, type) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const name = file.name;

      if(type === 'bannerImg')
       setBannerLoading(true);

      await axios({
        method: 'post',
        url: 'https://parseapi.back4app.com/files/a.jpeg',
        data: e.target.files[0],
        headers: {
          'X-Parse-Application-Id': APPLICATION_ID,
          'X-Parse-REST-API-Key': REST_API_KEY,
          'Content-Type': 'image/jpeg', 
        }
      })
      .then((response)=>{
        console.log(response.data);
        let newProfileImg = {
            "name": response.data.name,
            "url": response.data.url,
            "__type": "File"
        };
        if(type === 'bannerImg'){
          setBannerImgUrl(response.data.url);
          setBannerImg(newProfileImg);
          setBannerLoading(false);
        }
        if(type === 'img1'){
          setImg1Url(response.data.url);
          setImg1(newProfileImg);
        }
        if(type === 'img2'){
          setImg2Url(response.data.url);
          setImg2(newProfileImg);
        }
        if(type === 'img3'){
          setImg3Url(response.data.url);
          setImg3(newProfileImg);
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
      // console.log(bannerImg);
      // console.log(img1);
      // console.log(img2);
      // console.log(img3);
      if(!bannerImg){
        toast('Please select banner image.');
        return;
      }

      if(!address){
        toast('Please add address');
        return;
      }

      console.log(address);
      let long = address.center[0];
      let lat = address.center[1];
      // dispatch(AddProfileStart(values));
    },
  });
  return (
    <>
      <Box component="div" className='whiteBg' sx={{boxShadow: 2, p:2, mx:3, position: 'relative', minWidth:120 }}>
        <Stack
          direction='row'
          justifyContent='space-around'
          alignItems='flex-start'
          spacing={1}
          sx={{ px: 5, mb: 3 }}>
          <LoadingButton loading={bannerLoading} variant='outlined' component='label'>
            Set Banner image
            <input
              type='file'
              onChange={(e) => onSelectFile(e, 'bannerImg')}
              accept='image/x-png,image/jpeg,image/jpg,image/png'
              hidden
            />
          </LoadingButton>
          {
            bannerImgUrl && 
            <img src={bannerImgUrl} height={100} width={100} />
          }
          <Button variant='outlined' component='label'>
            Set image 1
            <input
              type='file'
              onChange={(e) => onSelectFile(e, 'img1')}
              accept='image/x-png,image/jpeg,image/jpg,image/png'
              hidden
            />
          </Button>
          {
            img1Url && 
            <img src={img1Url} height={100} width={100} />
          }
          <Button variant='outlined' component='label'>
            Set image 2
            <input
              type='file'
              onChange={(e) => onSelectFile(e, 'img2')}
              accept='image/x-png,image/jpeg,image/jpg,image/png'
              hidden
            />
          </Button>
          {
            img2Url && 
            <img src={img2Url} height={100} width={100} />
          }
          <Button variant='outlined' component='label'>
            Set image 3
            <input
              type='file'
              onChange={(e) => onSelectFile(e, 'img3')}
              accept='image/x-png,image/jpeg,image/jpg,image/png'
              hidden
            />
          </Button>
          {
            img3Url && 
            <img src={img3Url} height={100} width={100} />
          }
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
