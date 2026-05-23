import React from 'react';
import { useSelector } from 'react-redux';
import styles from './EventsMain.module.sass';
import EventsForm from '../EventsForm/EventsForm';

const EventsMain = () => {
  const { isFeatching, error } = useSelector((state) => state.event);

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
