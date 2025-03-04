import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './core/Home';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Signup from './user/Signup';
import Signin from './user/Signin';
import UserDashboard from './user/UserDashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoutes path="/user/dashboard" exact component={UserDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
