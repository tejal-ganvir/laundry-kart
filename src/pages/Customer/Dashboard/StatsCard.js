import React from 'react';
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const StatsCard = ({title, value, icon, btnText, btnAction}) => {
  return (
    <Card>
        <Box sx={{textAlign:'center', pt:2}}>
            {icon}
        </Box>
        <CardContent sx={{textAlign:'center'}}>
        <Typography variant="h4" component="div">
            {title}
        </Typography>
        <h4 className="extraBold">{value}</h4>
        {   btnText &&
            <Button 
                color='secondary' 
                variant="outlined"
                size="small"
                sx={{borderRadius: 4, px: 3, mt:2}}
                onClick={() => btnAction && btnAction()}
            >{btnText}</Button>
        }
        </CardContent>
    </Card>
  );
};

export default StatsCard;
