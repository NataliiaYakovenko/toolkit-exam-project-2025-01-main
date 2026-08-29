
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeEvent, clearNotifications } from '../../../store/slices/eventSlice';
import EventTimer from '../EventTimer/EventTimer';
import styles from './EventsList.module.sass';
import CONSTANTS from '../../../constants';

const EventsList = ({ events, notifications, removeEvent, clearNotifications }) => {
useEffect(() => {
  return () => {
    clearNotifications();
  };
}, [clearNotifications]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>
          Upcomming events
          {notifications > 0 && (
            <span className={styles.badge}>{notifications}</span>
          )}
        </h3>
        <h3 className={styles.remaining}>
          Remaining <br /> time
        </h3>
      </div>
      <div className={styles.list}>
        {events.map((event) => {
          const startTime = new Date(event.createdAt).getTime();
          const maxTime = event.eventDateTime - startTime;
          const progress = Math.max(
            0,
            Math.min(100, 100 - (event.timeLeft / maxTime) * 100)
          );
          return (
            <div className={styles.wrapper} key={event.id}>
              <div className={styles.eventName}>
                <span>{event.name}</span>
                <div
                  className={styles.progress}
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                  }}
                />
              </div>
              <div className={styles.rightPart}>
                <EventTimer
                  className={styles.eventTimer}
                  eventDateTime={event.eventDateTime}
                  isActive={event.isActive}
                />
                <button onClick={() => removeEvent(event.id)}>
                  <img
                    className={styles.trashIcon}
                    src={CONSTANTS.EVENTS_TRASH}
                    alt="Delete event"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events,
  notifications: state.event.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  removeEvent: (id) => dispatch(removeEvent(id)),
  clearNotifications: () => dispatch(clearNotifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);