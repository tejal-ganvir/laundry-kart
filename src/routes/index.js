import React from 'react';
import {
    Routes as Switch,
    Route,
  } from "react-router-dom";
import Layout from '../layouts';
import Dashboard from '../pages/Customer/Dashboard';
import NearestLaundry from '../pages/Customer/NearestLaundry/NearestLaundry';
import Landing from '../pages/Landing';
import Login from '../pages/Login';

const Routes = () => {
  return (
        <Layout>
            <Switch>
                <Route path="/" exact element={<Landing />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/account/dashboard" element={<Dashboard />} />
                <Route path="/account/nearest-laundry" element={<NearestLaundry />} />
                {/* <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/product/cart" exact element={<Cart />} /> */}
            </Switch>
        </Layout>
    );
};

export default Routes;
