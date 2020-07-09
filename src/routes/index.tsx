import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/products/:id" component={Product} isPrivate />
  </Switch>
);

export default Routes;
