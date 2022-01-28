import React from 'react';
import styles from '../customer.module.css'
import { Avatar, Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import firstImg from '../../../assets/img/add/3.jpg'
import userImg from '../../../assets/img/user-1.jpg'

const NearestLaundry = (props) => {
  return (
      <React.Fragment>
          <Box px={4}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <div className={styles.image_element_class}>
                        <div className={styles.tiles}>
                            <Link to="/" className={styles.tile}>
                                <span>
                                    <img src={firstImg} alt="Super Laundry" className={styles.image} />
                                </span>
                                <div className={styles.details}>
                                    <span className={styles.title}>Super Laundry</span>
                                    <span className={styles.info}>Services</span>
                                </div>
                            </Link>
                        </div>
                        <div className={styles.profile_container}>
                            <Stack direction="row" spacing={1} >
                                <Avatar alt="Super Laundry" src={userImg} sx={{ width: 30, height: 30 }} />
                                <div className={styles.pro_name }><Link to={`/dashboard`}>Super Laundry</Link></div>
                                <div className={`${styles.pro_view } pinkColor`}>
                                    $234
                                </div>
                            </Stack>
                        </div>
                    </div>
                </Grid>
            </Grid>
          </Box>
      </React.Fragment>
  );
};

export default NearestLaundry;
