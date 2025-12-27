import React from 'react';
import styles from './EventsMain.module.sass';
import EventsForm from '../EventsForm/EventsForm';

const EventsMain = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
       EVENTS FORM
      </h1>
      <EventsForm />
    </div>
  );
};

export default EventsMain;
