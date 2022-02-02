import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

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

const ServiceModal = (props) => {
    
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
            Add a new Service
          </Typography>
          <Stack spacing={2}>
            <TextField
              fullWidth
              id='service-name'
              label='Service Name'
              variant='outlined'
            />

            <TextField fullWidth id='price' label='Price' variant='outlined' />

            <TextField fullWidth id='unit' label='Unit' variant='outlined' />
            <Stack
              direction='row'
              justifyContent='flex-end'
              alignItems='flex-start'
              spacing={2}>
              <Button variant='text' onClick={props.close}>Cancel</Button>
              <Button variant='contained' onClick={props.close}>Save</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ServiceModal;
