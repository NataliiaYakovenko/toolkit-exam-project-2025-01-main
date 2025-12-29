import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  updateTimers,
  removeEvent,
  markEventAsInactive,
  loadEvents,
  selectActiveEvents,
  selectInactiveEvents,
  selectNotificationsCount,
} from '../../../store/slices/eventSlice';
import EventTimer from '../EventTimer/EventTimer';
import styles from './EventsList.module.sass';
import CONSTANTS from '../../../constants';

const EventsList = ({
  activeEvents,
  inactiveEvents,
  notificationsCount,
  removeEvent,
  updateTimers,
  markEventAsInactive,
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTimers();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [updateTimers]);

  return (
    <div className={styles.container}>
      <div className={styles.titels}>
        <h3>Upcomming events</h3>
        <h3 className={styles.remaining}>
          Remaining <br /> time
        </h3>
      </div>
      <div className={styles.list}>
        {activeEvents.map((event) => {
          return (
            <>
              <div className={styles.wrapper} key={event.id}>
                <div className={styles.eventName}>{event.name}</div>
                <div className={styles.rightPart}>
                  <EventTimer
                    className={styles.eventTimer}
                    timeLeft={event.timeLeft}
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
            </>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeEvents: selectActiveEvents(state),
  inactiveEvents: selectInactiveEvents(state),
  notificationsCount: selectNotificationsCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  removeEvent: (id) => dispatch(removeEvent(id)),
  updateTimers: () => dispatch(updateTimers()),
  markEventAsInactive: (id) => dispatch(markEventAsInactive(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
