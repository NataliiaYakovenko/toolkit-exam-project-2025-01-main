import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CONSTANTS from '../../../constants';
import Spinner from '../../Spinner/Spinner';

const OnlyForCustomer = () => {
  const { data: user, isFetching } = useSelector((state) => state.userStore);

  if (isFetching) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== CONSTANTS.CUSTOMER) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default OnlyForCustomer;
