import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute ({authed}) {
    console.log("Private: " + authed);
    return authed ? <Outlet /> : <Navigate to="/SignRules" />;
  }

export default PrivateRoute;