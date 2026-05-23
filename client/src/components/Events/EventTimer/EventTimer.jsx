import React, { useEffect, useState } from 'react';
import styles from './EventTimer.module.sass';

const EventTimer = ({ eventDateTime, isActive, eventName, className }) => {
  const [timeLeft, setTimeLeft] = useState(() => eventDateTime - Date.now());

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      const newTimeLeft = eventDateTime - Date.now();
      setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [eventDateTime, isActive]);

  if (!isActive || timeLeft <= 0) {
    return (
      <div
        className={
          className ? `${styles.completed} ${className}` : styles.completed
        }
      >
        <span>{eventName}</span>
        Event <br /> ended
      </div>
    );
  }

  const totalMinutes = Math.floor(timeLeft / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return (
    <div className={className ? `${styles.timer} ${className}` : styles.timer}>
      {days > 0 && <>{days}d:</>}
      {hours.toString().padStart(2, '0')}h:
      {minutes.toString().padStart(2, '0')}m
    </div>
  );
};

export default EventTimer;