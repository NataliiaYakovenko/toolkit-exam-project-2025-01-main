import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CONSTANTS from '../../../constants';
import Spinner from '../../Spinner/Spinner';

const OnlyForCreatorAndCustomer = () => {
  const { data: user, isFetching } = useSelector((state) => state.userStore);

  if (isFetching) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== CONSTANTS.CREATOR && user.role !== CONSTANTS.CUSTOMER) {
    return <Navigate to="/moderator/offers" replace />;
  }

  return <Outlet />;
};

export default OnlyForCreatorAndCustomer;
