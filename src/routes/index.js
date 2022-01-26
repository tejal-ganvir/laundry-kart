import React from 'react';
import {
    Routes as Switch,
    Route,
  } from "react-router-dom";
import Layout from '../layouts';
import Landing from '../pages/Landing';
import Login from '../pages/Login';

const Routes = () => {
  return (
        <Layout>
            <Switch>
                <Route path="/" exact element={<Landing />} />
                <Route path="/account/login" exact element={<Login />} />
                {/* <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/product/cart" exact element={<Cart />} /> */}
            </Switch>
        </Layout>
    );
};

export default Routes;
