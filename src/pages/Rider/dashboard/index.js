import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import AppBreadcrumb from "../../../components/Vendor/Breadcrumbs";
import Stack from "@mui/material/Stack";
import MDBox from "../../../components/MDBox";
import WidgetCard from "../../../components/widgets/widgets";
import { connect, useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../store/selector/login.selectors";
import { ProfileStart } from "../../../store/actions/vendorProfileActions";
import FullScreenDialog from "../../../components/Vendor/Profilepopup";

const RiderDashboard = (vendordetails) => {
  const dispatch = useDispatch();
  const laundryId = vendordetails.vendordetails.currentUser.objectId;
  const profile = useSelector((state) => state.profile);
  console.log(profile.profileDetails);
  useEffect(() => {
    // dispatch(ProfileStart(laundryId));
  }, []);

  return (
    <>
      {/* {JSON.stringify(profile)} */}
      {profile.profileDetails !== {} && (
        <Container maxWidth='xl' sx={{mt:2}}>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <WidgetCard
                  color='primary'
                  icon='weekend'
                  title='All Orders'
                  count="-"
                  percentage={{
                    color: "primary",
                    amount: "",
                    label: "than lask week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={1.5}>
                <WidgetCard
                  icon='leaderboard'
                  title='Current Orders'
                  count='-'
                  percentage={{
                    color: "success",
                    amount: "-",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </Container>
      )}
      {profile.profileDetails === {} && <FullScreenDialog />}
    </>
  );
};

const Profiledetails = createStructuredSelector({
  vendordetails: selectCurrentUser,
});

export default connect(Profiledetails)(RiderDashboard);
