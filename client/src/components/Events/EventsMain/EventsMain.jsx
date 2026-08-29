
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './EventsMain.module.sass';
import EventsForm from '../EventsForm/EventsForm';
import { updateTimers } from '../../../store/slices/eventSlice';

const EventsMain = () => {
  const dispatch = useDispatch();
  const { isFeatching, error } = useSelector((state) => state.event);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(updateTimers());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  if (isFeatching) {
    return (
      <div>
        <span className={styles.loading}>!!!Loading...!!!</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <span className={styles.error}>!!!Something went wrong!!!</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>EVENTS FORM</h1>
      <EventsForm />
    </div>
  );
};

export default EventsMain;