import React, { useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import ItemTableRow from './ItemTableRow';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
// import {
//   DatePicker,
//   MuiPickersUtilsProvider,
// } from '@material-ui/pickers';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

const BookingTable = (props) => {

    const [postData, setPostData] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [trigger, setTrigger] = useState(0);
    const [selectedDate, handleDateChange] = useState(new Date());

    useEffect(() => {
      let newTotal = postData.reduce(function(sum, current) {
        return sum + current.total;
      }, 0);
      setGrandTotal(newTotal)

    },[postData,trigger])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        "&:nth-of-type(even)": {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        "&:last-child td, &:last-child th": {
          border: 0,
        },
    }));

    function createData(itemName, laundryPrice, pressPrice, dryCleanPrice) {
        return { itemName, laundryPrice, pressPrice, dryCleanPrice, quantity : 0, total : 0 };
    }
    
    const rows = [
        createData('Shirt', 5, 7, 9),
        createData('Pant', 4, 6, 8),
        createData('Joggers', 6, 8, 10),
    ];

    const handelBookingOrder = () => {
      if(postData.length <= 0){
        toast('Please select a service');
        return;
      }
      console.log(postData);
    }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 720 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Item</StyledTableCell>
            <StyledTableCell align="left">Quantity</StyledTableCell>
            <StyledTableCell align="left">Laundry</StyledTableCell>
            <StyledTableCell align="left">Press</StyledTableCell>
            <StyledTableCell align="left">Dry Clean</StyledTableCell>
            <StyledTableCell align="left">Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, idx) => (
            <ItemTableRow key={`item-row-${idx}`} 
              ItemRow={StyledTableRow} 
              ItemCell={StyledTableCell} 
              itemData={row} 
              formData={{postData, setPostData, setTrigger}} 
            />
          ))}
          <StyledTableRow>
            <StyledTableCell colSpan={2}>
              <Typography sx={{fontSize: 18, fontWeight: 'bold'}}>Select Delivery date</Typography>
              <Typography className='pinkColor' sx={{fontSize: 14, fontWeight: 'bold'}}>*Note: Order will take minimum 2 days to complete</Typography>
            </StyledTableCell>
            <StyledTableCell colSpan={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Delivery Date"
                  views={["day", "month", "year"]}
                  value={selectedDate}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    handleDateChange(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </StyledTableCell>
            <StyledTableCell align="left"><b>Grand Total</b></StyledTableCell>
            <StyledTableCell><b>₹ {grandTotal}</b></StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <div className='form-control-area text-center'>
        <Button 
          align="center" 
          variant='contained'
          sx={{borderRadius: 4, px: 3, mb: 2}}
          onClick={() => handelBookingOrder()}
        >Proceed</Button>
      </div>
    </TableContainer>
  );
}

export default BookingTable;
