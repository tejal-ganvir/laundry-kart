import React, { useEffect, useRef, useState } from 'react';
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ItemTableRow from './ItemTableRow';
import { toast } from 'react-toastify';
import TextField from '@mui/material/TextField';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { connect } from 'react-redux';
import { formatDate, randomCode } from '../../utilis/functions';
import { postJSON } from '../../services/axiosConfig/api';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingTable = (props) => {

    const [postData, setPostData] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [rows, setRows] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const landmark = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      let newTotal = postData.reduce(function(sum, current) {
        return sum + current.total;
      }, 0);
      setGrandTotal(newTotal);
      
      if(rows.length <= 0)
      handelSetRows();

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
    
    const handelSetRows = () => {
      props.services && props.services.forEach((item) => {
        let newRow = createData(item.itemName, parseInt(item.laundryPrice), parseInt(item.pressPrice), parseInt(item.dryCleanPrice))
        setRows(prevState => [...prevState, newRow]);
      })
    }

    const handelBookingOrder = () => {

      if(!props.isLogin){
        let url = `${location.pathname}${location.search}`;
        localStorage.setItem('lastUrl', url);
        navigate("/login");
        toast("Need to login before order");
        return;
      }

      if(!props.data){
        toast("Please set a location");
        return;
      }

      if(postData.length <= 0){
        toast('Please select a service');
        return;
      }
      if(landmark.current.value === ''){
        toast('Please enter landmark');
        return;
      }
      const options = {
        address: props.data.name,
        landmark: landmark.current.value,
        pickupDate: formatDate(selectedDate),
        services: postData,
        userId: props.data.userId,
        laundryId: props.laundryId,
        orderStatus: 0,
        pickupCode: randomCode(5),
        deliveryCode: randomCode(5),
        isPaid: false,
        grandTotal: grandTotal,
        laundryInfoId: props.laundryRef,
      }
      setLoading(true);
      const response = postJSON('functions/saveOrderDetails', options)
      response.then((data) => {
        setLoading(false)
        navigate("/account/orders");
      })

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
              <Typography sx={{fontSize: 18, fontWeight: 'bold'}}>Schedule Pickup date</Typography>
              <Typography className='pinkColor' sx={{fontSize: 14, fontWeight: 'bold'}}>*Note: Order will take minimum 2 days to complete</Typography>
            </StyledTableCell>
            <StyledTableCell colSpan={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Pickup Date"
                  views={["day", "month", "year"]}
                  value={selectedDate}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    handleDateChange(newValue);
                  }}
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
            </StyledTableCell>
            <StyledTableCell align="left"><b>Grand Total</b></StyledTableCell>
            <StyledTableCell><b>₹ {grandTotal}</b></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell colSpan={3} align="left">
              <Typography sx={{fontSize: 13}}>*Pickup Address</Typography>
              <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>{props.data && props.data.name}</Typography>
            </StyledTableCell>
            <StyledTableCell colSpan={3} align="left">
              <TextField
                  id='landmark-booking-input'
                  label='Add Landmark'
                  type='text'
                  size='small'
                  fullWidth
                  inputRef={landmark}
              />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <div className='form-control-area text-center'>
        <LoadingButton 
          loading={loading}
          align="center" 
          variant='contained'
          sx={{borderRadius: 4, px: 3, mb: 2}}
          onClick={() => handelBookingOrder()}
        >Proceed</LoadingButton>
      </div>
    </TableContainer>
  );
}

const mapStateToProps = state => {
  const {data} = state.Location;
  const {isLogin, role} = state.login;
  return {data, isLogin, role};
};

export default connect(mapStateToProps, null)(BookingTable);
