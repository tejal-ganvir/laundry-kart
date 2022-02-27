import React, { useEffect } from 'react'
import { Button } from '@mui/material';
import { loadScript } from '../../utilis/functions';
import { RAZORPAY_KEY } from '../../constants/constant';
import { razorpayOrder } from '../../services/axiosConfig/api';

const DoRazorpay = () => {

    // useEffect(() => {
    //     const res = loadScript('https://checkout.razorpay.com/v1/checkout.js')

	// 	if (!res) {
	// 		alert('Razorpay SDK failed to load. Are you online?')
	// 		return
	// 	}

    // },[])

    var options = {
        "key": RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        //"order_id": "order_IzLmH5SzX5XM6l", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "remember_customer": false,
    };

    const rzp1 = new window.Razorpay(options);

    const displayRazorpay = async () =>{
        //const response = razorpayOrder('https://api.razorpay.com/v1/orders', option)
        //console.log(response);
        //response.then(data => console.log(data))
        rzp1.open()
    }

  return (
    <div>
        <Button onClick={() => displayRazorpay()}>
            check
        </Button>
    </div>
  )
}

export default DoRazorpay;
