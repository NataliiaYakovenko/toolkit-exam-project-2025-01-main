import React, { useState, useEffect } from 'react';
import styles from "./EventTimer.module.sass"

const EventTimer = ({ eventDateTime, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(eventDateTime - Date.now());

  useEffect(() => {
    if (!isActive) return;

    const timerId = setInterval(() => {
      const newTimeLeft = eventDateTime - Date.now();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        clearInterval(timerId);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [eventDateTime, isActive]);

  const formatTime = (ms) => {
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0 };

    const totalMinutes = Math.floor(ms / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    return { days, hours, minutes };
  };

  const { days, hours, minutes } = formatTime(timeLeft);


  if (!isActive || timeLeft <= 0) {
    return <div>Event completed</div>;
  }

  return (
    <div className={styles.timer}>
      {days}d:{hours.toString().padStart(2, '0')}h:
      {minutes.toString().padStart(2, '0')}m
    </div>
  );
};

export default EventTimer;
