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
import DoRazorpay from './DoRazorpay';
import { RAZORPAY_KEY } from '../../constants/constant';

const BookingTable = (props) => {

    const userDetails = props.currentUser;
    const [postData, setPostData] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const [rows, setRows] = useState([]);
    const [trigger, setTrigger] = useState(0);
    const [pickUpDate, setPickUpDate] = useState(new Date(new Date().getTime()+(3*24*60*60*1000))); /*** 3 days from today ***/
    const [deliveryDate, setDeliveryDate] = useState(new Date(new Date().getTime()+(6*24*60*60*1000))); /*** 3 days from pickupdate ***/
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

    const saveOrder = ( paymentId ) => {
        const options = {
          address: props.data.name,
          landmark: landmark.current.value,
          pickupDate: formatDate(pickUpDate),
          deliveryDate: formatDate(deliveryDate),
          services: postData,
          userId: userDetails.objectId,
          laundryId: props.laundryId,
          orderStatus: 0,
          pickupCode: randomCode(5),
          deliveryCode: randomCode(5),
          isPaid: paymentId ? true : false,
          grandTotal: grandTotal,
          laundryInfoId: props.laundryRef,
          paymentId: paymentId,
          userName: `${userDetails.firstName} ${userDetails.lastName}`,
          userMobile: userDetails.mobile,
        }
        setLoading(true);
        const response = postJSON('functions/saveOrderDetails', options)
        response.then((data) => {
          setLoading(false)
          navigate("/account/orders");
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

      var razorpayOptions = {
        "key": RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        "amount": grandTotal * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "LaundryKart",
        "description": "Laundry Service Order",
        //"order_id": "order_IzLmH5SzX5XM6l", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            saveOrder(response.razorpay_payment_id);
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
        },
        "prefill": {
            "name": `${userDetails.firstName} ${userDetails.lastName}`,
            "email": userDetails.email,
            "contact": userDetails.mobile || '',
        },
        "notes": {
            "address": props.data.name
        },
        "remember_customer": false,
      };

      const rzp1 = new window.Razorpay(razorpayOptions);
      
      rzp1.open()

    }

  return (
    <TableContainer component={Paper} sx={{display: (props.role !== 'user') ? 'none' : 'block'}}>
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
            <StyledTableCell colSpan={4}>
              <Typography sx={{fontSize: 18, fontWeight: 'bold'}}>Schedule Pickup date</Typography>
              <Typography className='pinkColor' sx={{fontSize: 14, fontWeight: 'bold'}}>*Note: Order will take minimum 3 days to complete</Typography>
            </StyledTableCell>
            <StyledTableCell align="left"><b>Grand Total</b></StyledTableCell>
            <StyledTableCell><b>₹ {grandTotal}</b></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell colSpan={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Pickup Date"
                  views={["day", "month", "year"]}
                  value={pickUpDate}
                  minDate={new Date()}
                  onChange={(newValue) => {
                    setPickUpDate(newValue);
                    setDeliveryDate(new Date(newValue.getTime()+(3*24*60*60*1000)))
                  }}
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
            </StyledTableCell>
            <StyledTableCell colSpan={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Delivery Date"
                  views={["day", "month", "year"]}
                  value={deliveryDate}
                  minDate={new Date(pickUpDate.getTime()+(3*24*60*60*1000))}
                  onChange={(newValue) => {
                    setDeliveryDate(newValue);
                  }}
                  renderInput={(params) => <TextField size="small" {...params} />}
                />
              </LocalizationProvider>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell colSpan={3} align="left">
              <Typography sx={{fontSize: 13}}>*Pickup Address</Typography>
              <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>{props.data && props.data.name}</Typography>
            </StyledTableCell>
            <StyledTableCell colSpan={3} align="left">
              <TextField
                  id='landmark-booking-input'
                  label='Add Street Name - Block Number - Landmark'
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
  const {isLogin, role, currentUser} = state.login;
  return {data, isLogin, role, currentUser};
};

export default connect(mapStateToProps, null)(BookingTable);
