import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './core/Home';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import Signup from './user/Signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        {/* <PrivateRoutes path="/user/dashboard" exact component={} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
