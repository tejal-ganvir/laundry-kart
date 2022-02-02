import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const EditDailouge = (props) => {

    return (
    <Dialog
        fullWidth={true}
        maxWidth={props.size}
        open={props.open}
        onClose={props.hide}
    >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}
          <Box
            sx={{
              m: 'auto',
            }}
          >
            {props.component}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.hide}>Close</Button>
        </DialogActions>
      </Dialog>
    );
};

export default EditDailouge;
