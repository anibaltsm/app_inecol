import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth-service';

function PrivateRoute({ children }) {
  const user = getCurrentUser();
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;