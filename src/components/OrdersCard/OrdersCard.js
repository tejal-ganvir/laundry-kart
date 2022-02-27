import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, Rating, Stack, Typography } from '@mui/material';
import styles from '../components.module.css';
import OrderATS from './OrderATS';
import { postJSON } from '../../services/axiosConfig/api';
import { toast } from 'react-toastify';

const OrdersCard = (props) => {
    const [rate, setRate] = useState();
    const {isCompleted} = props;
    const services = props && props.services ? props.services : [];
    const userRating = props && props.laundryInfoRef && props.laundryInfoRef.avgRating ? props.laundryInfoRef.avgRating : 0;
    const laundryObjectId = props && props.laundryInfoRef && props.laundryInfoRef.objectId ? props.laundryInfoRef.objectId : '';
    
    const addRating = () => {
        let avgRating = (userRating === 0) ? rate : (userRating + rate / 2);
        const response = postJSON('functions/updateLaundryInfo', {laundryObjectId, avgRating});
        response.then(data => {
            console.log(data);
            toast('Review successfully added');
        })
    }

    return (
        <Card sx={{mb:3}}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        {/* <Typography variant='p' sx={{ml: 1, fontWeight:'bold', color:'#ec0883'}}>#LK43455</Typography> */}
                        <table className={styles.order_card_table}>
                            <tbody>
                                <tr>
                                    <td>Vendor</td>
                                    <td>{props.laundryInfoRef.name}</td>
                                </tr>
                                <tr>
                                    <td>Items</td>
                                    <td>
                                        {services.length > 0 ? 
                                        services.map((item, idx) => (
                                            <span key={`order-item-name-${idx}`}>{item.itemName} ({item.quantity}) </span>
                                        ))
                                        : 'No Items'}
                                        {/* {
                                            services.length > 0 ? services.map((item) => {
                                                <p>{JSON.stringify(item)}</p>
                                            })
                                            :
                                            services.length
                                        } */}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Adderess</td>
                                    <td>{props.address}</td>
                                </tr>
                                { (props.orderStatus < 3 || props.orderStatus === 6) ?
                                    <tr>
                                        <td>Pickup Date</td>
                                        <td>{props.pickupDate}</td>
                                    </tr>
                                    :
                                    <tr>
                                        <td>Delivery Date</td>
                                        <td>{props.deliveryDate}</td>
                                    </tr>
                                }
                                { (props.orderStatus < 3 || props.orderStatus === 6) ?
                                    <tr>
                                        <td>Pickup Code</td>
                                        <td style={{fontWeight:'bold', color:'#ec0883'}}>{props.pickupCode}</td>
                                    </tr>
                                    :
                                    <tr>
                                        <td>Delivery Code</td>
                                        <td style={{fontWeight:'bold', color:'#ec0883'}}>{props.deliveryCode}</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{textAlign:'center'}}>
                        <Typography variant='p' sx={{fontWeight:'bold', color: '#8055f5', display:'block'}}>Status</Typography>
                        {   (props.orderStatus === 6) ?
                            <Button
                                align='center'
                                variant='contained'
                                color='error'
                                size='small'
                                sx={{ borderRadius: 4, px: 3, mt: 5 }}
                            >
                                Order Rejected
                            </Button>
                            :
                            <OrderATS isCompleted={isCompleted} statusCode={props.orderStatus} /> 
                        }
                        { isCompleted &&
                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={1}>
                                <Rating
                                    name="simple-controlled"
                                    value={rate || userRating}
                                    onChange={(event, newValue) => {
                                        setRate(newValue);
                                    }}
                                />
                                <Button
                                    align="center" 
                                    variant='outlined'
                                    color='secondary'
                                    sx={{borderRadius: 4, px: 3, mt: 3}}
                                    size="small"
                                    onClick={() => addRating()}
                                >
                                    Add Review
                                </Button>
                            </Stack>
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
  );
};

export default OrdersCard;
