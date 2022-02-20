import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import styles from '../components.module.css';
import OrderATS from './OrderATS';

const OrdersCard = (props) => {
    const {isCompleted} = props;
    const services = props && props.services ? props.services : [];
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
                                <tr>
                                    <td>Pickup Date</td>
                                    <td>{props.pickupDate}</td>
                                </tr>
                                <tr>
                                    <td>Pickup Code</td>
                                    <td style={{fontWeight:'bold', color:'#ec0883'}}>{props.pickupCode}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{textAlign:'center'}}>
                        <Typography variant='p' sx={{fontWeight:'bold', color: '#8055f5'}}>Status</Typography>
                        <OrderATS isCompleted={isCompleted} statusCode={props.orderStatus} />
                        { isCompleted &&
                            <Button
                                align="center" 
                                variant='outlined'
                                color='secondary'
                                sx={{borderRadius: 4, px: 3, mt: 3}}
                                size="small"
                            >
                                Add Review
                            </Button>
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
  );
};

export default OrdersCard;
