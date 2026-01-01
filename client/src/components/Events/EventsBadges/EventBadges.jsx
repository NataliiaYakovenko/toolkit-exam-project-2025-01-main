import React from 'react';
import { connect } from 'react-redux';
import { selectEventBadges } from '../../../store/slices/eventSlice';
import styles from './EventBadges.module.sass';

const EventBadges = ({ expired, lessDefault, acting }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Current status of events</h3>
      <div className={styles.wrapper}>
        <div className={styles.acting}>
          <span>Acting</span>
          <div className={styles.amountActing}>{acting}</div>
        </div>
        <div className={styles.notified}>
          <span>Notified</span>
          <div className={styles.amountNotified}>{lessDefault}</div>
        </div>
        <div className={styles.expired}>
          <span>Expired</span>
          <div className={styles.amountExpired}>{expired}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => selectEventBadges(state);

export default connect(mapStateToProps)(EventBadges);
