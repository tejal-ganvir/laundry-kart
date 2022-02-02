import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import styles from '../components.module.css';
import OrderATS from './OrderATS';

const OrdersCard = (props) => {
    const {isCompleted} = props;
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='p' sx={{ml: 1, fontWeight:'bold', color:'#ec0883'}}>#LK43455</Typography>
                        <table className={styles.order_card_table}>
                            <tbody>
                                <tr>
                                    <td>Vendor</td>
                                    <td>Super Laundry</td>
                                </tr>
                                <tr>
                                    <td>Service</td>
                                    <td>Washing and Ironing</td>
                                </tr>
                                <tr>
                                    <td>Adderess</td>
                                    <td>Prashant Nagar Amravati, 444606</td>
                                </tr>
                                <tr>
                                    <td>Pickup Date</td>
                                    <td>13 Jan 2022</td>
                                </tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{textAlign:'center'}}>
                        <Typography variant='p' sx={{fontWeight:'bold', color: '#8055f5'}}>Status</Typography>
                        <OrderATS isCompleted={isCompleted} />
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
