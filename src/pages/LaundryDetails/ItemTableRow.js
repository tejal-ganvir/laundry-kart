import { Button } from '@mui/material';
import React, { useState } from 'react';
import QuantityButton from './QuantityButton';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';

const ItemTableRow = ({ItemRow, ItemCell, itemData, formData}) => {

    const [quantity, setQuantity] = useState(0);
    const [data, setData] = useState(itemData);
    const [laundryCheck, setLaundryCheck] = useState(false);
    const [pressCheck, setPressCheck] = useState(false);
    const [dryCleanCheck, setDryCleanCheck] = useState(false);
    const {postData, setPostData, setTrigger} = formData;

    const handleIncrement = () => {
        let price = 0;

        if(laundryCheck) price += data.laundryPrice;
        if(pressCheck) price += data.pressPrice;
        if(dryCleanCheck) price += data.dryCleanPrice;

        setQuantity(quantity + 1);
        setData({...data, quantity: quantity + 1, total: data.total + price});

        let newPostData = postData;
        const manipulateIndex = newPostData.findIndex((obj => obj.itemName == data.itemName));
        if(manipulateIndex !== -1){
            newPostData[manipulateIndex].quantity = quantity + 1;
            newPostData[manipulateIndex].total = data.total + price;
            setPostData(newPostData);
        }
        setTrigger(quantity + 1)
    };
    
    const handleDecrement = () => {
        let price = 0;
        let newPostData = postData;

        if(laundryCheck) price += data.laundryPrice;
        if(pressCheck) price += data.pressPrice;
        if(dryCleanCheck) price += data.dryCleanPrice;

        setQuantity(quantity - 1);
        if((quantity - 1) === 0){
            setLaundryCheck(false);
            setPressCheck(false);
            setDryCleanCheck(false);
            /*****To remove the item name if quantity is set to zero*****/
            newPostData = postData.filter(function( obj ) {
                return obj.itemName !== data.itemName;
            });
        }
        setData({...data, quantity: quantity - 1, total: data.total - price});

        const manipulateIndex = newPostData.findIndex((obj => obj.itemName == data.itemName));
        if(manipulateIndex !== -1){
            newPostData[manipulateIndex].quantity = quantity - 1;
            newPostData[manipulateIndex].total = data.total - price;
        }
        setPostData(newPostData);
        setTrigger(quantity - 1)
    };

    const quantityObj = {quantity, handleIncrement, handleDecrement};

    const handelPriceCheckbox = (price, type, checkValue) =>{
        if(quantity <= 0){
            toast('Please select a quantity')
            return
        }

        if(type === 'laundry'){
            setLaundryCheck(!laundryCheck);
        }
        if(type === 'press'){
            setPressCheck(!pressCheck);
        }
        if(type === 'dryclean'){
            setDryCleanCheck(!dryCleanCheck);
        }

        if(!checkValue){
            setData({...data, quantity: quantity, total: data.total + (price * quantity)});
        }
        else{
            setData({...data, quantity: quantity, total: data.total - (price * quantity)});
        }

        /*****To remove the item name is already present*****/
        let newPostData = postData.filter(function( obj ) {
            return obj.itemName !== data.itemName;
        });

        newPostData.push({
            itemName: data.itemName, 
            isLaundry: (type === 'laundry') ? !laundryCheck : laundryCheck, 
            isPress: (type === 'press') ? !pressCheck : pressCheck, 
            isDryClean: (type === 'dryclean') ? !dryCleanCheck : dryCleanCheck, 
            quantity: quantity, 
            total: (!checkValue) ? data.total + (price * quantity) : data.total - (price * quantity),
        })

        setPostData(newPostData);
    }

  return (
    <ItemRow>
        {/* <Button onClick={() => {
            // let newData = data;
            // newData.total = newData.total + 2;
            setData({...data, total: data.total + 3});
        }}>click</Button> */}
        <ItemCell component="th" scope="row">
        {data.itemName}
        </ItemCell>
        <ItemCell align="left">
            <QuantityButton {...quantityObj} />
        </ItemCell>
        <ItemCell align="left">
            <Checkbox
                checked={laundryCheck}
                onChange={() => handelPriceCheckbox(data.laundryPrice, 'laundry', laundryCheck)}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            ₹ {data.laundryPrice}
        </ItemCell>
        <ItemCell align="left">
            <Checkbox
                checked={pressCheck}
                onChange={() => handelPriceCheckbox(data.pressPrice, 'press', pressCheck)}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            ₹ {data.pressPrice}</ItemCell>
        <ItemCell align="left">
            <Checkbox
                checked={dryCleanCheck}
                onChange={() => handelPriceCheckbox(data.dryCleanPrice, 'dryclean', dryCleanCheck)}
                inputProps={{ 'aria-label': 'controlled' }}
            />
            ₹ {data.dryCleanPrice}
        </ItemCell>
        <ItemCell align="left"><b>₹ {data.total}</b></ItemCell>
    </ItemRow>
  );
};

export default ItemTableRow;
