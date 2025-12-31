import React from 'react';
import styles from './EventTimer.module.sass';

const EventTimer = ({ timeLeft, isActive }) => {
  if (!isActive || timeLeft <= 0) {
    return <div className={styles.completed}>Event <br/> completed</div>;
  }

  const totalMinutes = Math.floor(timeLeft / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className={styles.timer}>
      {days > 0 && <>{days}d:</>}
      {hours.toString().padStart(2, '0')}h:
      {minutes.toString().padStart(2, '0')}m
    </div>
  );
};

export default EventTimer;
