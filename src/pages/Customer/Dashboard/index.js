import { Grid } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import IronIcon from '@mui/icons-material/Iron';
import StatsCard from './StatsCard';
import { Container } from "@mui/material";

const Dashboard = () => {
  return (
    <React.Fragment>
      <Box px={2}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="Wallet"
              value="$34"
              icon={<AccountBalanceWalletIcon sx={{ fontSize: 70, color: '#7620FF'}} />}
              btnText="Add to Wallet"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="Total Orders"
              value="4"
              icon={<LocalMallIcon sx={{ fontSize: 70, color: '#7620FF'}} />}
              btnText="View Orders"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatsCard
              title="Total Clothes"
              value="42"
              icon={<IronIcon sx={{ fontSize: 70, color: '#7620FF'}} />}
              btnText="Details"
            />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;
