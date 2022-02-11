import { Container, Grid } from "@mui/material";
import React from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import MDBox from "../../../components/MDBox";
import WidgetCard from "../../../components/widgets/widgets";

const VendorDashboard = () => {
  return (
    <>
      <Container maxWidth='xl'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
          spacing={0}>
          <AppBreadcrumb />
          <WidgetCard
                  color='dark'
                  icon='weekend'
                  title='Bookings'
                  count={281}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
                />

          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <WidgetCard
                  color='dark'
                  icon='weekend'
                  title='Bookings'
                  count={281}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <WidgetCard
                  icon='leaderboard'
                  title="Today's Users"
                  count='2,300'
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <WidgetCard
                  color='success'
                  icon='store'
                  title='Revenue'
                  count='34k'
                  percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <WidgetCard
                  color='primary'
                  icon='person_add'
                  title='Followers'
                  count='+91'
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid> */}
        </Stack>
      </Container>
    </>
  );
};

export default VendorDashboard;
