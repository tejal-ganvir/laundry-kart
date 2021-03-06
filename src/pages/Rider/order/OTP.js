import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import AssignRider from "../../../components/Vendor/AssignRider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const OTPModal = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ mb: 3 }}>
            Please Enter OTP
          </Typography>
          <Stack spacing={2}>
            <TextField fullWidth id='OTP' label='OTP' variant='outlined' />
            <Stack
              direction='row'
              justifyContent='flex-end'
              alignItems='flex-start'
              spacing={2}>
              <Button variant='text' onClick={props.close}>
                Navigate to map
              </Button>
              <Button variant='contained' onClick={props.close}>
                Pickup
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default OTPModal;
