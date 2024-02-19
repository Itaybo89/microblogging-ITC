import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TootContext } from '../../MyContext';

const PrivateRoute = ({ children }) => {
  const { userId } = useContext(TootContext);
  return userId ? children : <Navigate to="/" />;
};

export default PrivateRoute;
