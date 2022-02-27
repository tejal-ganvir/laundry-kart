import React from 'react';
import styles from '../components.module.css'
import { Divider, Rating, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const LaundryCard = ({laundryId, name, bannerImg, avgRating, distance, address}) => {
  return (
    <div className={styles.image_element_class}>
        <div className={styles.tiles}>
            <Link to={`/laundry/details?laundryId=${laundryId}`} className={styles.tile}>
                <span>
                    <img src={bannerImg.url} alt={name} className={styles.image} />
                </span>
                <div className={styles.details}>
                    <span className={styles.title}>{name}</span>
                    <span className={styles.info}>{address}</span>
                </div>
            </Link>
        </div>
        <div className={styles.profile_container}>
            <Stack direction="row" spacing={1} >
                <div className={styles.pro_name }>{name}</div>
                <div className={`${styles.pro_view } pinkColor`}>
                    <Rating name="half-rating-read" defaultValue={avgRating} precision={0.5} size="small" readOnly />
                </div>
            </Stack>
            <Divider sx={{margin: 0}} />
            <Typography className={`${styles.pro_name } pinkColor`}>{distance} km away</Typography>
        </div>
    </div>
  );
};

export default LaundryCard;
