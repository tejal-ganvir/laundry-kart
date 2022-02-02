import React from 'react';
import {
    Routes as Switch,
    Route,
  } from "react-router-dom";
import Layout from '../layouts';
import Dashboard from '../pages/Customer/Dashboard';
import NearestLaundry from '../pages/Customer/NearestLaundry/NearestLaundry';
import Orders from '../pages/Customer/Orders';
import OrdersHistory from '../pages/Customer/OrdersHistory';
import ForgotPassword from '../pages/ForgotPassword';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import SearchLaundry from '../pages/SearchLaundry';

const Routes = () => {
  return (
        <Layout>
            <Switch>
                <Route path="/" exact element={<Landing />} />
                <Route path="/search-laundry" exact element={<SearchLaundry />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/register" exact element={<Register />} />
                <Route path="/forgot-password" exact element={<ForgotPassword />} />
                <Route path="/account/logout" exact element={<Logout />} />
                <Route path="/account/dashboard" element={<Dashboard />} />
                <Route path="/account/nearest-laundry" element={<NearestLaundry />} />
                <Route path="/account/orders" element={<Orders />} />
                <Route path="/account/history" element={<OrdersHistory />} />
                <Route path="/account/profile" element={<Profile />} />
                {/* <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/product/cart" exact element={<Cart />} /> */}
            </Switch>
        </Layout>
    );
};

export default Routes;
