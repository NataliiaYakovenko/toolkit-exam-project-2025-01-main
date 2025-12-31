import React from 'react';
import { connect } from 'react-redux';
import { selectEventBadges } from '../../../store/slices/eventSlice';
import styles from './EventBadges.module.sass';

const EventBadges = ({ expired, lessDefault, acting }) => {
  return (
    <div className={styles.container}>
      <div className={styles.acting}>
        <span>Acting</span>
        {acting}
      </div>
      <div className={styles.lessDefault}>
        <span>Less default</span>
        {lessDefault}
      </div>
      <div className={styles.expired}>
        <span>Expired</span>
        {expired}
      </div>
    </div>
  );
};

const mapStateToProps =(state)=>selectEventBadges(state)

export default connect(mapStateToProps)(EventBadges);
