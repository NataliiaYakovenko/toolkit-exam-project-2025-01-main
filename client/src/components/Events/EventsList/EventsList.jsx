import React from 'react';
import { connect } from 'react-redux';
import { removeEvent } from '../../../store/slices/eventSlice';
import EventTimer from '../EventTimer/EventTimer';
import styles from './EventsList.module.sass';
import CONSTANTS from '../../../constants';

const EventsList = ({ events, removeEvent }) => {
  const maxTime = 30 * 24 * 60 * 60 * 1000;

  return (
    <div className={styles.container}>
      <div className={styles.titels}>
        <h3>Upcomming events</h3>
        <h3 className={styles.remaining}>
          Remaining <br /> time
        </h3>
      </div>
      <div className={styles.list}>
        {events.map((event) => {
          const progress = Math.max(
            0,
            Math.min(100, 100 - (event.timeLeft / maxTime) * 100)
          );
          return (
            <>
              <div className={styles.wrapper} key={event.id}>
                <div className={styles.eventName}>
                  <div
                    className={styles.progress}
                    style={{ width: `${progress}%` }}
                  />
                  <span>{event.name}</span>
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
            </>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events,
});

const mapDispatchToProps = (dispatch) => ({
  removeEvent: (id) => dispatch(removeEvent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
