import React from 'react';
import styles from '../components.module.css'
import { Divider, Rating, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import firstImg from '../../assets/img/contact-3.jpg'

const LaundryCard = () => {
  return (
    <div className={styles.image_element_class}>
        <div className={styles.tiles}>
            <Link to="/laundry/details" className={styles.tile}>
                <span>
                    <img src={firstImg} alt="Super Laundry" className={styles.image} />
                </span>
                <div className={styles.details}>
                    <span className={styles.title}>Super Laundry</span>
                    <span className={styles.info}>Washing</span>
                </div>
            </Link>
        </div>
        <div className={styles.profile_container}>
            <Stack direction="row" spacing={1} >
                <div className={styles.pro_name }><Link to={`/dashboard`}>Super Laundry</Link></div>
                <div className={`${styles.pro_view } pinkColor`}>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} size="small" readOnly />
                </div>
            </Stack>
            <Divider />
            <Typography className={`${styles.pro_name } pinkColor`}>3 km away</Typography>
        </div>
    </div>
  );
};

export default LaundryCard;
