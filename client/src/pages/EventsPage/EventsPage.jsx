import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './EventsPage.module.sass';
import EventsMain from '../../components/Events/EventsMain/EventsMain';
import { clearNotifications } from '../../store/slices/eventSlice';

const EventsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearNotifications());
  }, [dispatch]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <EventsMain />
      </div>
    </div>
  );
};

export default EventsPage;
