import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from '../App'

import {Login, LoginNew, Metero} from '../_screens';

const AppNavigation = (props) =>{
    return(
        <Switch>
            <App>
            <Route
          path="/"
          exact
          component={LoginNew} />
             {/* <Route
          path="/"
          exact
          component={Metero} /> */}
          <Route
          path="/Metero"
          exact
          component={Metero} />
          
          {/*  <Route
          path="/logout"
          exact
          component={MeteroLogout} />
           <Route
          path="/logout-confirmation"
          exact
          component={MeteroLogoutConfirmation} />
            <Route
          path="/hub"
          exact
          component={Hub} /> */}
            </App>
        </Switch>
    )
}

export default AppNavigation;