import React from 'react';
import styles from './EventsPage.module.sass';
import EventsMain from '../../components/Events/EventsMain/EventsMain';

const EventsPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <EventsMain />
      </div>
    </div>
  );
};

export default EventsPage;
