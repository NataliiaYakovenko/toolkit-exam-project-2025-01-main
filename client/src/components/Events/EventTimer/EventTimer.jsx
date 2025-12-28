import React, { useState, useEffect } from 'react';

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
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);
  const totalHours = days * 24 + hours;

  if (!isActive)
    return (
      <div>
        <div>00:00:00:00</div>
        <div>Event completed</div>
      </div>
    );

  return (
    <div>
      <div>
        {days > 0 ? `${days.toString().padStart(2, '0')}:` : ' '}
        {totalHours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </div>
      <div>
        {days > 0
          ? 'Days: Hours: Minutes: Seconds:'
          : 'Hours: Minutes: Seconds:'}
      </div>
    </div>
  );
};

export default EventTimer;
