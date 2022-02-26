import React, { useEffect } from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import Layout from "../layouts";
import Dashboard from "../pages/Customer/Dashboard";
import NearestLaundry from "../pages/Customer/NearestLaundry/NearestLaundry";
import Orders from "../pages/Customer/Orders";
import OrdersHistory from "../pages/Customer/OrdersHistory";
import ForgotPassword from "../pages/ForgotPassword";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import SearchLaundry from "../pages/SearchLaundry";

import RiderHistoryDetails from "../pages/Rider/history";
import RiderOrderDetails from "../pages/Rider/order";
import PickupDetails from "../pages/Rider/order/Pickup";
import VendorDashboard from "../pages/Vendor/dashboard";
import HistoryDetails from "../pages/Vendor/history";
import OrderDetails from "../pages/Vendor/orders";
import RiderDetails from "../pages/Vendor/riders";
import VendorServices from "../pages/Vendor/services";
import LaundryDetails from "../pages/LaundryDetails";
import AddRaider from "../pages/Vendor/riders/AddRider";
import AddService from "../pages/Vendor/services/Addservice";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../store/selector/login.selectors";
import { connect, useDispatch } from "react-redux";
import { userMeRequestAction } from "../store/actions/loginActions";

const VendorRoutes = ({ role }) => {
  return (
    <Layout role={role}>
      <Switch>
        <Route path="/" exact element={<Landing />} />
        <Route path="/laundry" exact element={<SearchLaundry />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/laundry/details" element={<LaundryDetails />} />
        <Route path="/account/logout" exact element={<Logout />} />

        <Route path='/vendor/dashboard' element={<VendorDashboard />} />
        <Route path="/vendor/profile" element={<Profile />} />
        <Route path='/vendor/services' element={<VendorServices />} />
        <Route path='/vendor/create/services' element={<AddService />} />
        <Route path='/vendor/riders' element={<RiderDetails />} />
        <Route path='/vendor/create/riders' element={<AddRaider />} />
        <Route path='/vendor/orders' element={<OrderDetails />} />
        <Route path='/vendor/history' element={<HistoryDetails />} />
      </Switch>
    </Layout>
  );
};

const RiderRoutes = ({ role }) => {
  return (
    <Layout role={role}>
      <Switch>
        <Route path="/" exact element={<Landing />} />
        <Route path="/laundry" exact element={<SearchLaundry />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/laundry/details" element={<LaundryDetails />} />
        <Route path="/account/logout" exact element={<Logout />} />

        <Route path="/rider/profile" element={<Profile />} />
        <Route path='/rider/history' element={<RiderHistoryDetails />} />
        <Route path='/rider/orders' element={<RiderOrderDetails />} />
        <Route path='/rider/pickup' element={<PickupDetails />} />
      </Switch>
    </Layout>
  );
};

const CustomerRoutes = ({ role }) => {
  return (
    <Layout role={role}>
      <Switch>
        <Route path="/" exact element={<Landing />} />
        <Route path="/laundry" exact element={<SearchLaundry />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/laundry/details" element={<LaundryDetails />} />
        <Route path="/account/logout" exact element={<Logout />} />

        <Route path="/account/orders" element={<Orders />} />
        <Route path="/account/profile" element={<Profile />} />
      </Switch>
    </Layout>
  );
};


const PublicRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact element={<Landing />} />
        <Route path="/laundry" exact element={<SearchLaundry />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/forgot-password" exact element={<ForgotPassword />} />
        <Route path="/laundry/details" element={<LaundryDetails />} />
        <Route path="/account/logout" exact element={<Logout />} />
      </Switch>
    </Layout>
  );
};

const Routes = ({loginstatus}) => {

    const {isLogin, role, sessionToken} = loginstatus;
    const dispatch = useDispatch();

    if(isLogin){
      if(role === 'user') return <CustomerRoutes isLogin={isLogin} role={role} />
      else if(role === 'laundry') return <VendorRoutes isLogin={isLogin} role={role} />
      else return <RiderRoutes isLogin={isLogin} role={role} />
    }
    else{
      if (!sessionToken) {
        return <PublicRoutes />;
      } else {
        dispatch(userMeRequestAction(sessionToken));
        //return <LoaderBackdrop />;
      }
    }
}

const userdetails = createStructuredSelector({
  loginstatus: selectCurrentUser
});

export default connect(userdetails)(Routes);
