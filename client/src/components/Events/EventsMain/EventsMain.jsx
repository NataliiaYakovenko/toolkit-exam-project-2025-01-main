import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadEvents} from '../../../store/slices/eventSlice';
import styles from './EventsMain.module.sass';
import EventsForm from '../EventsForm/EventsForm';

const EventsMain = () => {
  const dispatch = useDispatch();
  const { isFeatching, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(loadEvents())
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
